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

  $('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});

  //Slider
  $('.slider_wrapper')._TMS({
    show: 0,
    pauseOnHover: false,
    playBu: false,
    duration: 800,
    preset: 'fade',
    pagination: true,
    pagNums: false,
    slideshow: 8000,
    numStatus: false,
    banners: 'fade',
    waitBannerAnimation: false,
    progressBar: false
  });

  //Go to top
  $().UItoTop({
    easingType: 'easeOutQuart'
  });
});

//Go to By scroll
function goToByScroll(id) {
  $('html, body').animate({
    scrollTop: $("#"+id).offset().top
  },'slow');
}
