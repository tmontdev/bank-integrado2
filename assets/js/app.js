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
	/**
	 * scroll on a.page-scroll clicked
	*/
	$("a.page-scroll").click(function(){
		var $anchor = $($(this).attr('href'));
		var target_top = $anchor.offset().top;
		var header_top = $("header#header .block-menu").outerHeight()-5;

		if($("header#header").hasClass("nice-header") == false)
			header_top = header_top-15;


		$('html, body').stop().animate({
			scrollTop: target_top - header_top,
		}, 1250, 'easeInOutExpo')
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


(function(){
	var select_element = $("section#home .wrapper-blocks .block-simulator form .form-group .form-control.control-select");
	var select_options = select_element.find('ul.options');
	var data_parcels = {
		'veicle': {
			1: '60x',
			2: '48x',
			3: '46x',
			4: '24x',
			5: '12x'
		},
		'immobile': {
			1: '60x',
			2: '120x',
			3: '180x',
			4: '240x'
		}
	};

	select_element.click(function(){
		$(this).toggleClass("active");
	});

	$("#simulate-price").maskMoney({thousands:'.', decimal:','});

	var replaceSelectOptions = function(select_hidden, select_title, options_content){
		options_content.html('');

		select_hidden.find('option').each(function(o){
			var option_value = $(this).attr('value');
			var option_name = $(this).text();

			if(o == 0){
				select_hidden.val(option_value).change();
				select_title.text(option_name);
			}

			options_content.append('<li data-value="'+option_value+'">'+option_name+'</li>');
		});
	};

	select_element.each(function(x){
		var id_select = $(this).data('select');
		var select_hidden = $(id_select);
		var options_content = $(this).find('ul.options');
		var select_title = $(this).find('.title');

		replaceSelectOptions(select_hidden, select_title, options_content);
	});

	select_options.find('li').click(function(){
		var option_value = $(this).data('value');
		var option_name = $(this).text();

		var select_control = $(this).parents(".form-control.control-select");

		var id_select_hidden = select_control.attr('id').toString().replace('-control', '');
		var select_hidden = $("#"+id_select_hidden);


		select_control.find('.title').text(option_name);
		select_hidden.val(option_value).change();
	});

	/*
	 * On change #simulate-type,
	 * replaces #simulate-parcels with
	 * parcels of @var data_parcels
	*/
	$("#simulate-type").on('change', function(){
		var option_selected = $(this).find(':selected').attr('value');
		var option_parcels = data_parcels[option_selected];

		var select_control = $("#simulate-parcels-control");
		var select_hidden = $("#simulate-parcels");
		var select_title = select_control.find('.title');
		var options_content = select_control.find('ul.options');

		select_hidden.empty();
		$.each(option_parcels, function(key, value){
			select_hidden.append('<option value="'+key+'">'+value+'</option>');
		});

		replaceSelectOptions(select_hidden, select_title, options_content);
	});

	/*
	 * on change #simulate-parcels,
	 * add and remove class 'featured'
	 * on btn_simulate,
	 * to highlight effect
	*/
	$(document).on('click', '#simulate-parcels-control ul.options li', function(){
		var btn_simulate = $("section#home .wrapper-blocks .block-info .block-button button.btn-simulate");

		btn_simulate.addClass('featured');
		setTimeout(function(){
			btn_simulate.removeClass('featured');
		}, 100);
	});

})();
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
	/**
	 * Footer size $(window).height() - size nav
	*/
	var footer_size_changed = false;

	var changeSizeFooter = function(){
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
		var logos = {
			white: 'http://www.airbus.com/presscentre/corporate-information/logo-downloads/?eID=maglisting_push&tx_maglisting_pi1%5BdocID%5D=104852',
			colored: 'http://www.airbus.com/presscentre/corporate-information/logo-downloads/?eID=maglisting_push&tx_maglisting_pi1%5BdocID%5D=104854'
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

var wow = new WOW();
wow.init();
