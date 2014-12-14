var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
// var ObjectID = mongodb.MongoObjectID;
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

    cb(db, collection);

  });
}

// ***** routes *****
app.post('/item', function(req, res) {

  console.log('user sent post request');
  console.log( req.body );                // prints body of http request

  connect_to_db(function(db, collection) {
    var new_todo_item_to_be_inserted = req.body.new_item;

    // Insert a document into the collection
    collection.insert(new_todo_item_to_be_inserted, function(err, obj) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      console.log('err', err);
      console.log('obj', obj);
      res.send(obj);

      // Close the db connection - required!
      db.close();
    });
  }); // End of function(err, docs) callback
});  // end app.post()



// app.get('/item', function(req, res) {

//   console.log('user sent post request');
//   console.log( req.body );                 // prints body of bttp request

//   connect_to_db(function(db, collection) {
//     var new_todo_item_to_be_inserted = req.body.new_item;

//     // Insert a document into the collection
//     collection.insert(new_todo_item_to_be_inserted, function(err, obj) {
//       // Show the item that was just inserted; contains the _id field
//       // Note that it is an array containing a single object
//       console.log('err', err);
//       console.log('obj', obj);
//       res.send(obj);

//       // Close the db connection
//       db.close();
//     });
//   }); // End of function(err, docs) callback
// });  // end app.get()


// app.delete('/item', function(req, res) {

//   console.log('user sent post request');
//   console.log( req.body );                 // prints body of bttp request

//   connect_to_db(function(db, collection) {
//     var new_todo_item_to_be_inserted = req.body.new_item;

//     // Insert a document into the collection
//     collection.insert(new_todo_item_to_be_inserted, function(err, obj) {
//       // Show the item that was just inserted; contains the _id field
//       // Note that it is an array containing a single object
//       console.log('err', err);
//       console.log('obj', obj);
//       res.send(obj);

//       // Close the db connection
//       db.close();
//     });
//   }); // End of function(err, docs) callback
// });  // end app.delete()








var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

function saveToDoList(content) {

  fs.writeFile('./public/todo_save.txt', content, function (err) {
    if (err) return console.log(err);
      console.log('Successfully saved todo_save.txt');
  });

}
