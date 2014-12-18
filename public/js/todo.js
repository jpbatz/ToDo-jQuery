$(function() {

  // clear list to start
  // $('#todo-list li').remove();

  // autoload the saved collection
  $.get('/items', function(docs) {
    for(var i=0; i<docs.length; i++) {
      // populate todo list
      if(docs[i].completed == "false") {
        console.log(docs[i]._id + " " + docs[i].title + " is incomplete");
        addTodoItem(docs[i]._id, docs[i].title, false);
      } else if(docs[i].completed == true) { // need to fix collection true => "true"
        console.log(docs[i]._id + " " + docs[i].title + " is complete");
        addTodoItem(docs[i]._id, docs[i].title, true)
      }
    }
  });


  // create new list item when enter key is pressed
  $('#new-todo').keydown(function(event) {
    if(event.keyCode == 13) {

      var user_input = $(this).val();
      
      var post_data = {
        new_item: {
          title: user_input,
          completed: false
        }
      };
      // console.log("***** post_data is: " + post_data);
      $.post('/items', post_data, function(new_todo_id) {
        console.log(new_todo_id);
        // if data is not error
        addTodoItem(new_todo_id, user_input, false);

        // visual stuff
        // $('ul#todo-list').append( buildTodoItem( post_data.new_item ) );

      });
      $(this).val("");  // clear text field, should reset to placeholder
    }
  });



  // remove completed items from the list
  $('#clear_button').click(function() {
    console.log('clear button pressed');
    $('.item-strike-out').remove();
  });

  // function addTodoItem():
  // adds new todo item or recreates from flat file
  // completed or not completed items are considered
  function addTodoItem(object_id, title, completed) {

    var new_list_item = null;

    if(completed == false ) {
      // break out to smaller pieces
      new_list_item = $('<li class="list-item"><input type="checkbox" class="item-checkbox" value="">' + title + '</li>');
    } else {
      new_list_item = $('<li class="list-item item-strike-out"><input type="checkbox" class="item-checkbox" value="" checked>' + title + '</li>');
    }

    new_list_item.data("object-id", object_id);

    var list_delete_button = $('<button>', {
        text : "[delete]",
        click : function (e) {
          var button = $(e.currentTarget);
          var object_id = button.closest("li").data("object-id");
          console.log(object_id);
          $.ajax( '/items/' + object_id ,
            {
              type : "DELETE",
              success : function (data) {
                button.closest("li").remove();
                console.log('data',data);
              }
            }
          );
        }
      });

    new_list_item.append( list_delete_button );

    // should return item
    $('#todo-list').append(new_list_item);

  }


  // cross out list item when box is checked, 
  // or uncross item if unchecked
  $('#todo-list').on('change', '.item-checkbox', function() {
    // console.log(this);
    // console.log($(this));
    if(this.checked) {
      console.log('item was selected');
      $(this).parent().addClass('item-strike-out');
    } else {
      console.log('item was un-selected');
      $(this).parent().removeClass('item-strike-out');
    }
  });

});
