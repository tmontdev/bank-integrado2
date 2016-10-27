(function(){
	var appSimulator = function(){
		this.buttons = {
			simulate: $("#btn-simulate"),
			simulateAgain: $("#btn-simulate-again"),
			contact: $("#btn-simulate-contact"),
			controlSelect: $("section#home .control-select")
		};
		this.inputs = {
			price: $("#simulate-price"),
			type: $("#simulate-type"),
			parcels: $("#simulate-parcels")
		};
		this.areas = {
			error: $("#form-error-show"),
			resultPrice: $("#result-simulator"),
		};
		this.blocks = {
			infoWelcome: $("#block-info-welcome"),
			infoResult: $("#block-info-result")
		};
		this.dataLast = {
			type: 0,
			result: 0,
			price: 0,
			parcels: 0
		};
		this.controlSelect = {
			controls : {
				type: $("#simulate-type-control"),
				parcels: $("#simulate-parcels-control")
			},
			selects: {
				type: $("#simulate-type"),
				parcels: $("#simulate-parcels")
			}
		};
		this.dataParcels = {
			'veicle': {
				'60x': 0.033994,
				'48x': 0.037558,
				'36x': 0.043910,
				'24x': 0.057281,
				'12x': 0.098790
			},
			'immobile': {
				'60x': 0.0340919,
				'120x': 0.0249527,
				'180x': 0.0219355,
				'240x': 0.0204323
			}
		};

		this.init();
	};

	appSimulator.prototype = {
		init: function(){
			this.addListener();

			$("#simulate-price").maskMoney({thousands:'.', decimal:','});
		},

		addListener: function(){
			var _this = this;

			this.buttons.simulate.click(function(){
				return _this.btnSimulateClick(this);
			});

			this.buttons.simulateAgain.click(function(){
				return _this.btnSimulateAgainClick(this);
			});

			this.buttons.contact.click(function(){
				return _this.btnContactClick(this);
			});

			this.buttons.controlSelect.click(function(){
				return _this.btnControlSelectClick(this);
			});

			this.buttons.controlSelect.find('li').click(function(){
				return _this.btnControlSelectLiClick(this);
			});

			this.controlSelect.controls.type.find('li').click(function(){
				return _this.controlSelectTypeLiClick(this);
			});

			this.controlSelect.controls.parcels.find('li').click(function(){
				return _this.controlSelectParcelsLiClick(this);
			});
		},

		/**
		 * Funções para converter
		 * os preços
		*/
		priceToInt: function(price){
			price = price.replace("R$").replace(" ");
			for(var i = 0; i <= 11; i++){
				price = price.replace(".", "");
			}

			price = price.replace(",", ".");

			return parseFloat(price);
		},

		priceToReal: function(price){
			if(typeof price !== "string")
				price = price.toString();

			price = price.replace(".", ",");

			price = "R$ "+price;

			return price;
		},

		/**
		 * Função quando clicar
		 * no primeiro botão de simulação
		*/
		btnSimulateClick: function(button){
			var parcel_result = this.getParcelResult();
			if(parcel_result === false)
				return false;

			var parcel_real = this.priceToReal(parcel_result);
			this.areas.resultPrice.text(parcel_real);

			var _this = this;
			this.blocks.infoWelcome.fadeOut(500, function(){
				_this.blocks.infoResult.fadeIn(500);
			})

			return true;
		},

		/**
		 * Função quando clicar
		 * no botão "Simular novamente"
		*/
		btnSimulateAgainClick: function(button){
			var parcel_result = this.getParcelResult();
			if(parcel_result === false)
				return false;

			var parcel_real = this.priceToReal(parcel_result);
			this.areas.resultPrice.fadeOut(500, function(){
				$(this).text(parcel_real).fadeIn(500);
			});
		},

		/**
		 * Função quando clicar
		 * no botão "Entrar em contato"
		*/
		btnContactClick: function(button){
			var contact_top = $("section#contact").offset().top;
			var header_top = $("header#header .block-menu").outerHeight()-20;
			var default_message = "\
Digite sua mensagem aqui e não apage os valores abaixo... \n\n\
Valor da parcela: {replace_result}\n\
Valor desejado: {replace_price}\n\
Tipo: {replace_type}\n\
Parcelas: {replace_parcel}\n\
";

			default_message = default_message.replace("{replace_result}", this.dataLast.result);
			default_message = default_message.replace("{replace_price}", this.dataLast.price);
			default_message = default_message.replace("{replace_type}", this.dataLast.type);
			default_message = default_message.replace("{replace_parcel}", this.dataLast.parcels);

			$("#contact-message").val(default_message);

			$('html, body').animate({
				scrollTop: contact_top - header_top
			}, 1250, 'easeInOutExpo');

			$("#contact-name").focus();
		},

		/*
		 * Funções para manipular
		 * os errors do formulário
		*/
		showError: function(err){
			this.areas.error.removeClass("active").text(err).addClass("active");

			return false;
		},

		hideError: function(){
			this.areas.error.removeClass("active").text('');

			return true;
		},

		/**
		 * Funções para checkar
		 * o simulador
		*/
		checkPrice: function(prices){
			var message_error = "Seu crédito tem que ser maior que R$80.000,00";
			var price_val = prices.val;
			var price_int = prices.int;

			if(!price_val || !price_int)
				return this.showError(message_error);

			if(price_val.length === 0 || price_int.length === 0)
				return this.showError(message_error);

			if(price_val == "0,00" || price_int == "0")
				return this.showError(message_error);

			if(price_int < 80000)
				return this.showError(message_error);

			return this.hideError();	
		},
		checkDatas: function(datas){
			var simulate_type = datas.type;
			var simulate_parcel = datas.parcel;
			var message_error = "Selecione opções válidas";

			if(!(simulate_type in this.dataParcels))
				return this.showError(message_error);

			if(!(simulate_parcel in this.dataParcels[simulate_type]))
				return this.showError(message_error);

			return this.hideError();
		},

		/*
		 * Funções para pegar
		 * informações do simulador
		*/
		getPrices: function(){
			var price_val = this.inputs.price.val();
			var price_int = this.priceToInt(price_val);

			return {'val': price_val, 'int': price_int};
		},

		getDatas: function(){
			var simulate_type = this.inputs.type.val();
			var simulate_parcel = this.inputs.parcels.find(":selected").text();
			var simulate_parcel_val = this.inputs.parcels.val();

			return {'type': simulate_type, 'parcel': simulate_parcel, 'parcel_val': simulate_parcel_val};
		},

		getParcelResult: function(){
			var prices = this.getPrices();
			if(this.checkPrice(prices) !== true)
				return false;			
						
			var datas = this.getDatas();
			if(this.checkDatas(datas) !== true)
				return false;

			var coefficient = this.dataParcels[datas.type][datas.parcel];
			var parcel_result = prices.int * coefficient;

			var type_name = (datas.type == "veicle") ? 'Veículo' : 'Imóvel';

			this.dataLast = {
				type: type_name,
				result: this.priceToReal(parcel_result),
				price: prices.val,
				parcels: datas.parcel
			};

			return parcel_result.toFixed(2);
		},


		/**
		 * Função para quando clicar
		 * no .control-select
		 * do simulador
		*/

		btnControlSelectClick: function(select){
			if($(select).hasClass("active")){
				$(select).removeClass("active");
			}else{
				this.buttons.controlSelect.removeClass("active");
				$(select).addClass("active");
			}
		},
		
		/**
		 * Função para quando clicar
		 * no .control-select li
		 * mudar o title do .control-select
		 * do simulador
		*/

		btnControlSelectLiClick: function(li){
			var option_value = $(li).data('value');
			var option_name = $(li).text();

			var select_control = $(li).parents(".form-control.control-select");

			this.changeTitleControl(select_control, option_name);
		},

		/**
		 * Função para quando clicar 
		 * no li do controlSelect -> control -> type
		*/
		controlSelectTypeLiClick: function(li){
			var option_value = $(li).data('value');
			this.changeOptionSelect(this.controlSelect.selects.type, option_value);

			var controlSelect = this.controlSelect.controls.parcels;
			var parcelsOptions = controlSelect.find("ul.options").hide().filter(".options-"+option_value);
			parcelsOptions.show();

			var firstLi = parcelsOptions.find("li").eq(0);
			var optionSelect = option_value+"-"+firstLi.data('value');

			this.changeTitleControl(controlSelect, firstLi.text());
			this.changeOptionSelect(this.controlSelect.selects.parcels, optionSelect);
		},

		/**
		 * Funçã para quando clicar
		 * no li do controlSelect -> control -> parcels
		*/
		controlSelectParcelsLiClick: function(li){
			var typeValue = this.controlSelect.selects.type.val();
			var optionValue = $(li).data('value');
			var optionSelect = typeValue+"-"+optionValue;

			this.changeOptionSelect(this.controlSelect.selects.parcels, optionSelect);
		},

		/**
		 * Funções para
		 * manipular os controls
		 * do simulador
		*/
		changeTitleControl: function(control, text){
			control.find('.title').text(text);
		},
		changeOptionSelect: function(select, val){
			select.val(val).change();
		}
	};


	return new appSimulator();
})();