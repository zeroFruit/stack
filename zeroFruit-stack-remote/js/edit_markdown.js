/* js/edit_markdown.js */
$(document).ready(function() {
   var title = $('#markdown_title');   /* get title value */
   var categorySelector = $('category-selector');
   var category;                       /* get category data when button clicked */
   var category_checker = false;       /* check whether category is selected */

   /* select category */
   $(':button[name=memo]').on('click', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
      category = $(this).attr('name');
      category_checker = true;
   });
   $(':button[name=phrase]').on('click', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
      category = $(this).attr('name');
      category_checker = true;
   });
   $(':button[name=Data_Structure]').on('click', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
      category = $(this).attr('name');
      category_checker = true;
   });
   $(':button[name=arduino]').on('click', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
      category = $(this).attr('name');
      category_checker = true;
   });

   /* showdown markdown previewer */
   var converter = new showdown.Converter();
   var $pad = $('#pad');
   var $markdownArea = $('#markdown');
   var html;   /* html content converted from markdown */
   var markdownText;

   var convertTextAreaToMarkdown = function() {
      markdownText = $pad.val();
      html = converter.makeHtml(markdownText);
      $markdownArea.html(html);
   };

   $pad.bind('input', convertTextAreaToMarkdown);

   convertTextAreaToMarkdown();

   /* ajax */
   // send title, content data to node server
   var $submit = $('#markdown_submit');

   $submit.on('click', function() {

      /* before send data check whether category is selected */
      if (category_checker) {
         var request = $.ajax({
            url      : '/edit',
            method   : 'POST',
            data     : {title: title.val(), content: html, category: category},
         });
         request.done(function( msg ) {
            alert(msg);
         });
         request.fail(function( jqXHR, textStatus ) {
            alert('failed');
         });
      }
      else {
         alert('category is not selected!');

         // how can we restore content?
      }
   });
});
