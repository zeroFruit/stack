$('#currentLi').addClass("active")
$('#currentHref').append("<span class='sr-only'>(current)</span>");

function htmlDecode(input) {
   var e = $('#contentView');
   e.html(input);
}

htmlDecode(c);
