new WOW().init();
$(function(){
	$(".to-question-square").click(function(e){
		if($(this).hasClass("actived"))
			return false;

		$(".to-question-square").removeClass("actived");
		$(".question-square").removeClass("actived");

		var target = $(this).data('target');

		$(this).addClass('actived');
		$(target).addClass('actived');
	});
});

//tudo certo
$(function(){
	$('.question-answer').slideUp(250);

	$(".question-field").click(function(event) {

		if($(this).hasClass("active")){
			$(this).find('.question-answer').slideUp(250);
			$(this).removeClass("active");
			$(this).find('.query-icon i').removeClass('fa-info').addClass('fa-question');

			return true;
		}

		$(".query-icon i.fa-info").removeClass('fa-info').addClass('fa-question');
		$(".question-field").removeClass('active');
		$('.question-answer').slideUp(250);

		$(this).addClass('active').find( ".question-answer" ).slideDown(250);
		$(this).find('.query-icon i').removeClass('fa-question').addClass('fa-info');
	});
});

(function(){
	function hideMenuMobile(){
		$('#header').removeClass('header-actived');
		$('.rollback').removeClass('show');
	};
	$('.switch-on').click(function(event) {
		$('#header').addClass('header-actived');
		$('.rollback').addClass('show');
	});

	$('.switch-off').click(hideMenuMobile);
	$(".rollback").click(hideMenuMobile);

	/**
	 * scroll on a.page-scroll clicked
	*/
	$("a.page-scroll").click(function(){
		var elementHeader = ($(window).width() <= 992) ? '.switch-bar' : 'header#header';

		var $anchor = $($(this).attr('href'));
		var target_top = $anchor.offset().top;
		var header_top = $(elementHeader).outerHeight();

		if($("header#header").hasClass("nice-header") == false && elementHeader !== ".switch-bar")
			header_top = header_top - 48;

		$('html, body').stop().animate({
			scrollTop: target_top - header_top,
		}, 1250, 'easeInOutExpo');

		hideMenuMobile();
	});
})();

(function(){
	/*
	 * Texts to effect writing
	 * in #home
	*/
	var texts_apresentations = [
		'O que acha? ^1000 Vamos <small>simplificar?</small>',
		'Fazer o <strong>^300BUROCRÁTICO</strong>,^1000 se tornar ^300 <strong>PRÁTICO.</strong>',
		'As parcelas são menores, <small>^300 compare.</small>',
		'Faça sua simulação <strong>AGORA!</strong>'
	];

	/*
 	 * element to write @var texts_apresentations
 	 * using jQuery typed
	*/
	$("section#home .wrapper-blocks .block-info .block-apresentation span.text").typed({
		strings: texts_apresentations,
		typeSpeed: 50,
		backDelay: 500,
		loop: false,
	});
})();



$(function(){
	 var headerHeight = $('.header').height();
	$('.home').css('padding-top', headerHeight+'px');
});
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


(function(){
	/**
	 * Footer size $(window).height() - size nav
	*/
	var footer_size_changed = false;

	var changeSizeFooter = function(){
		if($(window).width() <= 992){
			$("footer#footer").css('height', 'auto');
			return true;
		}

		var window_height = $(window).height();
		var header_height = $("header#header").height();


		$("footer#footer").css('height', (window_height-header_height)+"px");

		footer_size_changed = true;

		return true;
	};

	/**
	 * Make nice menu on scroll
	*/
	var makeMenu = function(){
		if($(window).width() <= 992)
			return false;


		var logos = {
			white: 'assets/img/logo_white.png',
			colored: 'assets/img/logo_blue.png'
		};

		var scroll_top = $(window).scrollTop();
		var header = $("header#header");

		if(scroll_top > 70){
			header.addClass("nice-header").find('.block-menu .logo > img').attr('src', logos.colored);

			/**
			 * if footer_size_change is false
			 * change footer height
			*/
			if(footer_size_changed !== false)
				return true;

			return setInterval(changeSizeFooter, 500);
		}

		header.removeClass("nice-header").find('.block-menu .logo > img').attr('src', logos.white);
	};

	makeMenu();
	$(window).scroll(makeMenu);
})();

(function(){
	var contact_social = $("section#contact .contact-social");
	var contact_form = $("section#contact .contact-form");

	if(contact_form.outerHeight() <= contact_social.outerHeight())
		return false;

	var contact_diff = parseFloat(contact_form.outerHeight()) - parseFloat(contact_social.outerHeight());

	contact_social.css('padding-bottom', (contact_diff+60)+'px');
})();


$(function(){
	var square = $('#politics-square');
	var button = $('#politics');

	button.click(function(event) {
		square.addClass('active');
	});
	$('.modal').click(function(event) {
		square.removeClass('active');
	});
	$('.close').click(function(event) {
		square.removeClass('active');
	});
});

$(function(){
	var square = $('#terms-square');
	var button = $('#terms');

	button.click(function(event) {
		square.addClass('active');
	});
	$('.modal').click(function(event) {
		square.removeClass('active');
	});
	$('.close').click(function(event) {
		square.removeClass('active');
	});
});
