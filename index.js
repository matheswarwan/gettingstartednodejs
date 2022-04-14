var http = require('http');
var fs = require('fs');
var events = require('events');
var url = require('url');

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}


http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log('file requested - ' + filename)
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found. Try with /execute or /save");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(process.env.PORT || 8080);

console.log('listening on 8080 OR ' + process.env.PORT )