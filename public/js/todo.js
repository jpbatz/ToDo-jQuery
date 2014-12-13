$(function() {
// $(document).ready(function() {  // when script.js is in .html head

  // autoload the save file
  $.get('./todo_save.txt', function(todo_data) {
    var list_items = jQuery.parseJSON(todo_data);
    for(var i=0; i<list_items.length; i++) {
      // populate your list
      if(list_items[i].completed == false) {
        console.log(list_items[i].title + " is incomplete");
        $('#list').append('<li class="list-item"><input type="checkbox" class="item-checkbox" value="">' + list_items[i].title + '</li>');
      } else {
        console.log(list_items[i].title + " is complete");
        $('#list').append('<li class="list-item item-strike-out"><input type="checkbox" class="item-checkbox" value="" checked>' + list_items[i].title + '</li>');
      }
    }
  });

    // clear list
    $('#list li').remove();

    // create list items
    $('#new-todo').keydown(function(e) {
      if(e.keyCode == 13) {
        $('#list').append('<li class="list-item"><input type="checkbox" class="item-checkbox" value="">' + $(this).val() + '</li>');
        $(this).val("");  // clear text field
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

  $('#clear_button').click(function() {
    console.log('clear button pressed');
    $('.item-strike-out').remove();
  });

  $('#save_button').click(function() {
    console.log('save button pressed');
    console.log($('.list-item').length);

    var list = [];
    $('.list-item').each(function(i, obj) {
      console.log(i + " " + $(obj));
      list.push(
          {
            index: i,
            title: $(obj).text(),
            completed: $(obj).find("input:checked").length > 0
          });
    });
    console.log(list);

    // POST array list to localhost:2020/save
    var json = JSON.stringify(list);
    console.log('json', json);

    $.post('/save', {
      todo_json_data: json
    })
  });  

});
