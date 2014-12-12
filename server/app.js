var express = require('express');
var app = express();

app.use(express.static('public'));

app.post('/save', function(req, res) {

  console.log('user sent post request');  // see in cli resp to browser save
  res.send("ok");

  // fs.writeFile("list.json");
  fs = require('fs');
  fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
    if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
  });

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});