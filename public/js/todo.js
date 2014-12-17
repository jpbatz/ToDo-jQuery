$(function() {
// $(document).ready(function() {  // when script.js is in .html head

  // autoload the save file
  $.get('/items', function(list_items) {
    for(var i=0; i<list_items.length; i++) {
      // populate todo list
      if(list_items[i].completed == "false") {
        console.log(list_items[i].title + " is incomplete");
        addTodoItem(list_items[i]._id, list_items[i].title, false);
      } else {
        console.log(list_items[i].title + " is complete");
        addTodoItem(list_items[i]._id, list_items[i].title, true);
      }
    }
  });

  // clear list to start
  $('#list li').remove();

  // create list items
  $('#new-todo').keydown(function(e) {
    if(e.keyCode == 13) {
      addTodoItem(null, $(this).val(), false);
      
      var post_data = {
        new_item: {
          title: $(this).val(),
          completed: false
        }
      };
      // console.log("***** post_data is: " + post_data);
      $.post('/items', post_data, function(res_data) {
        console.log(res_data);
        // if data is not error
        // visual stuff
      });
      $(this).val("");  // clear text field, should reset to placeholder
    }
  });


  $('#list').on('change', '.item-checkbox', function() {
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

    if(completed === false ) {
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
              console.log('data',data);
              }
            }
          );
        }
      });

    new_list_item.append( list_delete_button );

    $('#list').append(new_list_item);

  }

});
