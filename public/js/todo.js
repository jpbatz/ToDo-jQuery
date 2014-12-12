$(function() {
// $(document).ready(function() {  // when script.js is in .html head

  // alert("Hello!");

    // clear list - uncomment after testing
    $('#list li').remove();

    $('#new-todo').keydown(function(e) {
      // alert( "Handler for .keydown() called." );
      if(e.keyCode == 13) {
        // console.log("key pressed: " + e.keyCode);
        // console.log($(this).val());
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
      // $(this).parent().css('text-decoration','line-through');
    } else {
      console.log('item was not selected');
      $(this).parent().removeClass('item-strike-out');
      // $(this).parent().css('text-decoration','none');
    }

  });

  $('#save_button').click(function() {
    console.log('save button pressed');
    console.log($('.list-item').length);
  })  

});
