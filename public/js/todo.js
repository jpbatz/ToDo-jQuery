$(function() {

  // clear list to start
  // $('#todo-list li').remove();

  // autoload the saved collection
  $.get('/items', function(docs) {
    docs.forEach(function(doc) {
      $('#todo-list').append(buildTodoItem(doc));
    });
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

        // visual stuff
        $('#todo-list').append( buildTodoItem( post_data.new_item ) );

      });
      $(this).val("");  // clear text field, should reset to placeholder
    }
  });



  // remove completed items from the list
  $('#clear_button').click(function() {
    console.log('clear button pressed');
    $('.item-strike-out').remove();
  });

  // function buildTodoItem():
  // adds new todo item or recreates from flat file
  // completed or not completed items are considered
  function buildTodoItem(todo_doc) {

    var list_item = $('<li>', {
      class: "list-items",
      "data-object-id": todo_doc._id
    });

    var list_checkbox = $('<input>', {
      class: "item-checkbox",
      type: "checkbox",
      change: change_completed_status // what is change?  new property?
    });

    var list_label = $('<span>', {
      text: todo_doc.title
    });

    var list_delete = $('<button>', {
      text: "[DELETE]",
      click: click_delete_item_handler // make function
    });

    if(todo_doc.completed === "true") {
      // list_checkbox.attr("checked", "checked");  // "completed"?
      list_checkbox.prop("checked", true);  // "completed"?
    }


    list_item
      .append(list_checkbox)
      .append(list_label)
      .append(list_delete);

    console.log(list_item);
    return list_item;


    // list_item.data("object-id", object_id);

    // var list_delete_button = $('<button>', {
    //     text : "[delete]",
    //     click : function (e) {
    //       var button = $(e.currentTarget);  // ??? why not $(this) ???
    //       var object_id = button.closest("li").data("object-id");
    //       console.log("_id =  " + object_id);  // doesn't work here
    //       $.ajax( '/items/' + object_id ,
    //         {
    //           type : "DELETE",
    //           success : function (data) {
    //             button.closest("li").remove();
    //             console.log('data',data);
    //             console.log("_id =  " + object_id);  // works here
    //           }
    //         }
    //       );
    //     }
    //   });

    // new_list_item.append( list_delete_button );

  }


/* EVENT HANDLERS */

function change_completed_status(event) {
  var checkbox = $(event.currentTarget);
  var object_id = checkbox.closest("li").data("object-id");
  $.ajax('/items/' + object_id + '/' + checkbox.prop("checked"), 
  {
    type: "PUT",
    success: function(data) {
      console.log('data', data);
    }
  });
}

function click_delete_item_handler (event) {
  var button = $(event.currentTarget);  // ??? why not $(this) ???
  var object_id = button.closest("li").data("object-id");
  console.log("_id =  " + object_id);  // doesn't work here
  $.ajax( '/items/' + object_id ,
    {
      type : "DELETE",
      success : function (data) {
        button.closest("li").remove();
        console.log('data',data);
        console.log("Removed _id =  " + object_id);  // works here
      }
    });
}


  // cross out list item when box is checked,
  // or uncross item if unchecked
  // update database collection document
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
