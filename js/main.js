$(document).ready(function () {
  !function () {
    var map    = [],
        names  = [],
        win    = $(window),
        header = $('header'),
        currClass;

    $('.content').each(function (n) {
      map[n]   = this.offsetTop;
      names[n] = $(this).attr('id');
    });

    win.on('scroll', function () {
      var i = 0;

      while(map[i++] <= win.scrollTop());

      if (currClass !== names[i-2]) {
        currClass = names[i-2];
      }

      header.removeAttr("class").addClass(names[i-2]);
    });
  }();

  $().UItoTop({
    easingType: 'easeOutQuart'
  });
});

function goToByScroll(id) {
  $('html, body').animate({
    scrollTop: $("#"+id).offset().top
  },'slow');
}
