var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require('nodemailer');


//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}


http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = __dirname + '/filesUploaded/' + files.filetoupload.originalFilename;
      console.log('file saved in ' + newpath)
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);