$(function() {
// $(document).ready(function() {  // when script.js is in .html head

  // autoload the save file
  $.get('/items', function(list_items) {
    for(var i=0; i<list_items.length; i++) {
      // populate todo list
      if(list_items[i].completed == "false") {
        console.log(list_items[i].title + " is incomplete");
        addTodoItem(list_items[i].title, false);
      } else {
        console.log(list_items[i].title + " is complete");
        addTodoItem(list_items[i].title, true)
      }
    }
  });

  // clear list to start
  $('#list li').remove();

  // create list items
  $('#new-todo').keydown(function(e) {
    if(e.keyCode == 13) {
      addTodoItem($(this).val(), false);
      
      var post_data = {
        new_item: {
          title: $(this).val(),
          completed: false
        }
      };
      // console.log("***** post_data is: " + post_data);
      $.post('/item', post_data, function(res_data) {
        console.log(res_data);
        // if data is not error
        // visual stuff
      });
      $(this).val("");  // clear text field, should reset to placeholder
    };
  });


  $('#list').on('change', '.item-checkbox', function() {
    // console.log(this);
    // console.log($(this));
    if(this.checked) {
      console.log('item was selected');
      $(this).parent().addClass('item-strike-out');
    } else {
      console.log('item was not selected');
      $(this).parent().removeClass('item-strike-out');
    }
  });

  // remove completed items from the list
  $('#clear_button').click(function() {
    console.log('clear button pressed');
    $('.item-strike-out').remove();
  });

  // save list to flat file on server
  // $('#save_button').click(function() {
  //   console.log('save button pressed');
  //   console.log($('.list-item').length);
  //   // make list into array object
  //   var list = [];
  //   $('.list-item').each(function(i, obj) {
  //     console.log(i + " " + $(obj));
  //     list.push(
  //         {
  //           index: i,
  //           title: $(obj).text(),  // just text, not html()
  //           completed: $(obj).find("input:checked").length > 0
  //         });
  //   });
  //   console.log(list);

  //   // prepare list as JSON object to send
  //   var json = JSON.stringify(list);
  //   console.log('json', json);
  //   // POST array list to server /save
  //   $.post('/save', {
  //     todo_json_data: json
  //   })
  // });  

  // function addTodoItem():
  // adds new todo item or recreates from flat file
  // completed or not completed items are considered
  function addTodoItem(title, completed) {
    if(completed == false ) {
      $('#list').append('<li class="list-item"><input type="checkbox" class="item-checkbox" value="">' + title + '</li>');
    } else {
      $('#list').append('<li class="list-item item-strike-out"><input type="checkbox" class="item-checkbox" value="" checked>' + title + '</li>');
    }
  }

});
