$(function() {
// $(document).ready(function() {  // when script.js is in .html head

  // alert("Hello!");

    $('#new-todo').keydown(function(e) {
      // alert( "Handler for .keydown() called." );

      if(e.keyCode == 13) {
        // console.log("key pressed: " + e.keyCode);
        // console.log($(this).val());
        $('#list').append("<li>" + $(this).val() + "</li>")
      };


  });

});
