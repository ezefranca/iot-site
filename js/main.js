$(document).ready(function () {
  //Gallery
  $('.thumbs a').touchTouch();

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


  //Send mail
  $('.send-button').on('click', function (e) {
    e.preventDefault();

    var name    = $('#nome').val(),
        last    = $('#sobrenome').val(),
        email   = $('#email').val(),
        message = $('#message').val(),
        type    = $('input[name=atuacao]').filter(':checked').val(),
        sensors = [];

    $(':checkbox:checked').each(function (i) {
      sensors[i] = $(this).val();
    });

    var message = "Meu nome é " + name + " "+ last +"<"+ email +"> sou "+ type + ", minha mensagem é: " + message + "\n\n";
    message += "Eu gostaria de ter os sensores: " + sensors.join(' + ');

    if (name && last && email) {
      $.ajax({
        url : 'http://iotmail.telefonicabeta.com/send.php',
        type: 'POST',
        data: {
          "from": email,
          "form_name": name + " " + last,
          "body": message
        },
        success : function(m) {
          if (m.status) {
            alert("Mensagem enviada com sucesso");

          } else {
            alert("Erro ao enviar o email, tente novamente");
          }
        },
        error: function(m) {
          alert("Erro ao enviar o email, tente novamente");
        }
      });
    } else {
      alert('Faltam campos obrigatórios');
    }
  });
});


//Go to By scroll
function goToByScroll(id) {
  $('html, body').animate({
    scrollTop: $("#"+id).offset().top
  },'slow');
}
