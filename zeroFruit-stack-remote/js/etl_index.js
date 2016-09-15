$(document).ready(function() {
   var courseId;

   $('.list-group-item').on('click', function() {
      if (courseId !== $(this).attr('id')) {
         $(this).addClass('disabled');
         $('#'+courseId).removeClass('disabled');
         courseId = $(this).attr('id');
      }
   });

   var _path    = '/etl';
   var _method  = 'post';
   var valid   = $('#isValid');
   var $file   = $('input[type=file]')[0];
   var $submit = $('#etl_submit');
   var $form   = $('#etl_form');



   $submit.on('click', function() {
      if (!courseId) {
         valid.html('there are no selected course');
         valid.css('visibility', 'visible');
      }
      else {
         etlPost(_path, _method, $form);
      }
   });
});

var etlPost = function(path, method, form) {
   method = method || 'post';
   var fd = new FormData(form);

   fd.append("contents", "something");
   console.log(fd);

   var request = $.ajax({
      url      : path,
      method   : method,
      data     : fd,
      contentType: false,
      processData: false
   });
   request.done(function( msg ) {
      alert(msg);
   });
   request.fail(function( jqXHR, textStatus ) {
      alert('failed');
   });
};
