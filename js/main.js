$(document).ready(function () {
  //Gallery
  $('#thumbs a').touchTouch();

  //Menu click
  $('.sf-menu a, .logo').click(function () {
    var page = $(this).attr('href').replace('#', '');
    goToByScroll(page);

    return false;
  });

  //Youtube fancybox
  $('.fancybox-media').fancybox({
		openEffect : 'none',
		closeEffect: 'none',
		helpers: {
			media: {}
		}
	});

  //Slider
  var banner = $('.banner').unslider({
      speed   : 500,
      delay   : 5000,
      complete: function() {},
      keys    : true,
      dots    : true,
      fluid   : true
    });

  //Go to top
  $().UItoTop({
    easingType: 'easeOutQuart'
  });

  setTimeout(function() {
    var position = [];

    $.each(['#page1', '#page2', '#page3', '#page4', '#page5'], function(i, v) {
      position.push(Math.abs($(v).position().top));
    });

    $(window).scroll(function() {
      var value = $(this).scrollTop();

      $.each(position, function(i) {
        if(this > value) {
          $('.current').removeClass('current');
          $('.sf-menu li').eq(i-1).addClass('current');

          return false;
        }
      });
    });
  }, 500);
});


//Go to By scroll
function goToByScroll(id) {
  $('html, body').animate({
    scrollTop: $("#"+id).offset().top
  },'slow');
}
