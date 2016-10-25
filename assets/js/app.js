$(function(){
	$('.to-car').click(function(event) {
		$(this).addClass('actived');
		$('.to-house').removeClass('actived');
		$('.house').removeClass('actived');
		$('.car').addClass('actived');
	});
	$('.to-house').click(function(event) {
		$(this).addClass('actived');
		$('.to-car').removeClass('actived');
		$('.car').removeClass('actived');
		$('.house').addClass('actived');
	});
});

$(function(){
	var questionHeight = $('.question-square').height();
	var selectorHeight = $('.selector').height()+45;
	$('#question').css('padding-bottom', questionHeight+'px');
	$('.question-square').css('top', selectorHeight+'px');

})
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

(function(){
	var contact_social = $("section#contact .contact-social");
	var contact_form = $("section#contact .contact-form");

	if(contact_form.outerHeight() <= contact_social.outerHeight())
		return false;

	var contact_diff = parseFloat(contact_form.outerHeight()) - parseFloat(contact_social.outerHeight());

	contact_social.css('padding-bottom', (contact_diff+60)+'px');
})();
