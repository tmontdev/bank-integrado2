$(function(){
    $(".element").typed({
      strings: ["O que acha? ^1000 Vamos Simplificar?", "Podemos fazer o seu sonho acontecer.", "Fazer o BUROCRÁTICO,^1000 se tornar PRÁTICO.", "As parcelas são menores, ^1000 compare.", "FAÇA SUA SIMULAÇÃO AGORA!"],
      typeSpeed: 100,
      backDelay: 1000,
      loop: false,
    });
});
$(function(){
	 var headerHeight = $('.header').height();
	$('.home').css('padding-top', headerHeight+'px');
});
$(function(){
	$('.who-button').click(function(event) {
		$('.mission-button').removeClass('actived');
		$(this).addClass('actived');
		$('.mission').removeClass('actived');
		$('.who').addClass('actived').addClass('animated').addClass('fadeIn');
	});
	$('.mission-button').click(function(event) {
		$('.who-button').removeClass('actived');
		$(this).addClass('actived');
		$('.who').removeClass('actived').removeClass('animated').removeClass('fadeIn');
		$('.mission').addClass('actived').addClass('animated').addClass('fadeIn');
	});

});

(function(){
	/*
	 * Make nice menu on scroll
	*/
	var makeMenu = function(){
		var logos = {
			white: 'http://www.airbus.com/presscentre/corporate-information/logo-downloads/?eID=maglisting_push&tx_maglisting_pi1%5BdocID%5D=104852',
			colored: 'http://www.airbus.com/presscentre/corporate-information/logo-downloads/?eID=maglisting_push&tx_maglisting_pi1%5BdocID%5D=104854'
		};

		var scroll_top = $(window).scrollTop();
		var header = $("header#header");

		if(scroll_top > 70){
			return header.addClass("nice-header").find('.block-menu .logo > img').attr('src', logos.colored);
		}

		header.removeClass("nice-header").find('.block-menu .logo > img').attr('src', logos.white);
	};

	makeMenu();
	$(window).scroll(makeMenu);
})();
