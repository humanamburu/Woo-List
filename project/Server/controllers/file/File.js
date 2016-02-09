var mongoose = require('mongoose'),
    Grid = require('gridfs-stream'),
    fs = require('fs'),
    config = require('../../../config.json'),
    gfs;

var conn = mongoose.createConnection(config.mongo);

conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
});

exports.create = function (req, res) {
    console.log(req.body);

    //var part = req.files.file;
    //if (part.type.split('/')[0] != 'image') {
    //    res.send(400);
    //    return;
    //}
    //var writeStream = gfs.createWriteStream({
    //    filename: part.name,
    //    mode: 'w',
    //    content_type: part.type,
    //    metadata: {
    //        task: req.body.task
    //    }
    //});
    //writeStream.on('finish', function () {
    //    readFiles(req.body.task);
    //    res.status(200).send({
    //        message: 'Success'
    //    });
    //});
    //fs.createReadStream(part.path).pipe(writeStream);
};
