var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var app = express();
var CONNECTION_STRING = 'mongodb://localhost:27017/todosdb';

// MongoDB connection test goes here

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB connect
function connect_to_db(cb) {  // cb = callback function
  // Note the db name todosdb in the connection string
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    if (err) {
      throw err;
    }
    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');
    collection.db = db;
    cb(collection);

  });
}

// ***** routes *****
app.post('/items', function(req, res) {

  console.log('user sent post request');
  console.log( req.body );                // prints body of http request

  connect_to_db(function(collection) {
    var new_todo_item_to_be_inserted = req.body.new_item;

    // Insert a document into the collection
    collection.insert(new_todo_item_to_be_inserted, function(err, obj) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      console.log('err', err);
      console.log('obj', obj[0]._id);
      res.send(obj[0]._id);

      // Close the db connection - required!
      collection.db.close();
    });
  }); // End of function(err, docs) callback
});  // end app.post()



app.get('/items', function(req, res) {

  connect_to_db(function(collection) {

    collection.find({}).toArray(function(err, docs) {

      console.log("Found the following records");
      console.dir(docs);
      res.send(docs);
      // Close the db connection
      collection.db.close();
    });
  }); // End of function(err, docs) callback
});  // end app.get()



app.delete('/items/:item_id', function (req, res) {

  console.log('DELETING', req.params.item_id);

  connect_to_db( function ( collection ) {

    var _id = req.params.item_id;

    collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
      if( err ) throw err;
      
      res.json({ success : "success" });

      collection.db.close();
      // db.close();

    });
  });  // end of connect_to_db()
});  // end app.delete()






var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

function saveToDoList(content) {

  fs.writeFile('./public/todo_save.txt', content, function (err) {
    if (err) return console.log(err);
      console.log('Successfully saved todo_save.txt');
  });

}
