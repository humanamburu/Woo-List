const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const controllers = require('./controllers/main.js');
const fs = require('fs');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const logger = require('./logger');
const logDirectory = `${__dirname}/log`;


logger('');
logger('Running server...');
const server = app.listen(8080);
mongoose.connect(config.mongo, (error) => {
  if (error) throw error;
});

logger('Server run at localhost:8080');

//  MORGAN SETUP
const directory = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDirectory}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});
app.use(morgan(':method :url :response-time', {
  stream: accessLogStream
}));


//  MODULES FOR EXPRESS
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


//  ENTRY POINTS
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
