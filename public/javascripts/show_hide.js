$(document).ready(function () {

  $( "#show_more_services_dbs" ).click(function() {
    var link = $(this);

    $('.hide_show_service_dbs').toggle()
    event.preventDefault();
      if($(this).text() == 'Show more'){
         $(this).text('Show less');
       } else {
         $(this).text('Show more');
       }
  });

  $( "#show_more_services_fl" ).click(function() {
    var link = $(this);

    $('.hide_show_service_fl').toggle()
    event.preventDefault();
    if($(this).text() == 'Show more'){
       $(this).text('Show less');
     } else {
       $(this).text('Show more');
     }
  });

  $( "#hide_show_sign-in-attempts" ).click(function() {
    var link = $(this);

    $('.hide_show_sign-in-attempts').toggle()
    event.preventDefault();
    if($(this).text() == 'Show more'){
       $(this).text('Show less');
     } else {
       $(this).text('Show more');
     }
  });

})
