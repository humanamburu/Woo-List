var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./config.json'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    controllers = require('./controllers/main.js'),
    fs = require('fs'),
    morgan = require('morgan'),
    FileStreamRotator = require('file-stream-rotator'),
    uuid = require('node-uuid'),
    logger = require('./logger');


logger('');
logger('Running server...');
var server = app.listen(8080);
mongoose.connect(config.mongo, function(error) {
    if (error) throw error;
});

logger('Server run at localhost:8080');

//MORGAN SETUP
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(morgan(':method :url :response-time', {
    stream: accessLogStream
}));


//MODULES FOR EXPRESS
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

logger('Parsers initial complete');
app.use(session({
    resave: false,
    secret: 'wunderlist',
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600
    })
}));

logger('Passport initialize');
app.use(controllers.passport.initialize());
app.use(controllers.passport.session());

logger('');
logger('Wait for requests...');
logger('');


//ENTRY POINTS
app.use('/', express.static('./project/Client/'));

app.post('/register', controllers.registration);
app.post('/authorization', controllers.authorization);
app.get('/lists', controllers.auth);
app.get('/logout', controllers.logout);

app.put('/user', controllers.updateUser);

app.post('/lists', controllers.addList);
app.get('/mylists', controllers.getList);
app.delete('/mylists', controllers.delList);

app.post('/task', controllers.addTask);
app.get('/tasks', controllers.getTasks);
app.get('/task', controllers.getTask);
app.delete('/task', controllers.delTask);
app.put('/task', controllers.updateTask);
app.put('/task/date', controllers.updateDate);
app.put('/task/image', controllers.updateImage);

app.put('/task/subtask', controllers.toggleSubtask);
app.post('/task/subtask', controllers.addSubtask);
app.delete('/task/subtask', controllers.deleteSubtask);

module.exports = app;
