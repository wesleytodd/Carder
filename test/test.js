describe('Carder', function(){
	describe('#testCard', function(){
		it('should match Visas', function(){
			var type = Carder.testCard('4', {
				'visa' : {
					full    : '^4[0-9]{12}(?:[0-9]{3})?$',
					partial : '^4[0-9]{0,15}$'
				}
			});
			expect(type).to.be('visa');

			var type = Carder.testCard('4111111111111111', {
				'visa' : {
					full    : '^4[0-9]{12}(?:[0-9]{3})?$',
					partial : '^4[0-9]{0,15}$'
				}
			}, false);
			expect(type).to.be('visa');
		});
		it('should match Mastercards', function(){
			var type = Carder.testCard('55', {
				'mastercard'       : {
					full    : '^5[1-5][0-9]{14}$',
					partial : '^5[1-5][0-9]{0,14}$'
				}
			});
			expect(type).to.be('mastercard');

			var type = Carder.testCard('5555555555554444', {
				'mastercard'       : {
					full    : '^5[1-5][0-9]{14}$',
					partial : '^5[1-5][0-9]{0,14}$'
				}
			}, false);
			expect(type).to.be('mastercard');
		});
		it('should match Discover Cards', function(){
			var type = Carder.testCard('6011', {
				'discover'       : {
					full    : '^6(?:011|5[0-9]{2})[0-9]{12}$',
					partial : '^6(?:011|5[0-9]{2})[0-9]{0,12}$'
				}
			});
			expect(type).to.be('discover');

			var type = Carder.testCard('6011111111111117', {
				'discover'       : {
					full    : '^6(?:011|5[0-9]{2})[0-9]{12}$',
					partial : '^6(?:011|5[0-9]{2})[0-9]{0,12}$'
				}
			}, false);
			expect(type).to.be('discover');
		});
		it('should match American Express Cards', function(){
			var type = Carder.testCard('37', {
				'amex'       : {
					full    : '^3[47][0-9]{13}$',
					partial : '^3[47][0-9]{0,13}$'
				}
			});
			expect(type).to.be('amex');

			var type = Carder.testCard('378282246310005', {
				'amex'       : {
					full    : '^3[47][0-9]{13}$',
					partial : '^3[47][0-9]{0,13}$'
				}
			}, false);
			expect(type).to.be('amex');
		});
		it('should match against multiple RegEx\'s correctly', function(){
			var type = Carder.testCard('4', Carder.defaultOptions.supportedCC);
			expect(type).to.be('visa');
			var type = Carder.testCard('4111111111111111', Carder.defaultOptions.supportedCC, false);
			expect(type).to.be('visa');

			var type = Carder.testCard('55', Carder.defaultOptions.supportedCC);
			expect(type).to.be('mastercard');
			var type = Carder.testCard('5555555555554444', Carder.defaultOptions.supportedCC, false);
			expect(type).to.be('mastercard');

			var type = Carder.testCard('6011', Carder.defaultOptions.supportedCC);
			expect(type).to.be('discover');
			var type = Carder.testCard('6011111111111117', Carder.defaultOptions.supportedCC, false);
			expect(type).to.be('discover');

			var type = Carder.testCard('37', Carder.defaultOptions.supportedCC);
			expect(type).to.be('amex');
			var type = Carder.testCard('378282246310005', Carder.defaultOptions.supportedCC, false);
			expect(type).to.be('amex');
		});
		it('should not match invalid input', function(){
			var type = Carder.testCard('abc', Carder.defaultOptions.supportedCC);
			expect(type).to.be(false);

			var type = Carder.testCard('123abc', Carder.defaultOptions.supportedCC);
			expect(type).to.be(false);

			var type = Carder.testCard('4111_*3', Carder.defaultOptions.supportedCC);
			expect(type).to.be(false);

			var type = Carder.testCard('411111111111111<', Carder.defaultOptions.supportedCC);
			expect(type).to.be(false);

			var type = Carder.testCard('', Carder.defaultOptions.supportedCC);
			expect(type).to.be(false);

		});
		it('should match different whitespace/dash formats', function(){
			var type = Carder.testCard('4111-1111-1111-1111', Carder.defaultOptions.supportedCC);
			expect(type).to.be('visa');

			var type = Carder.testCard('4111 1111 1111 1111', Carder.defaultOptions.supportedCC);
			expect(type).to.be('visa');

			var type = Carder.testCard('411 1111 1111 11111', Carder.defaultOptions.supportedCC);
			expect(type).to.be('visa');

			var type = Carder.testCard('4111	111 1111 1111', Carder.defaultOptions.supportedCC);
			expect(type).to.be('visa');
		});

	});
	describe('#generateLogoMarkup', function(){
		it('should output markup', function(){
			var out = Carder.generateLogoMarkup({
					'visa'       : 'test.png',
					'amex'       : 'test.png',
					'mastercard' : 'test.png',
					'discover'   : 'test.png'
				},
				'<div class="carder-logos">{{cc-logos}}</div>',
				'<img class="{{classes}}" alt="{{cardname}}" src="{{cardimage}}" />',
				'logo highlight');

			expect(out).to.be('<div class="carder-logos"><img class="logo highlight visa" alt="visa" src="test.png" /><img class="logo highlight amex" alt="amex" src="test.png" /><img class="logo highlight mastercard" alt="mastercard" src="test.png" /><img class="logo highlight discover" alt="discover" src="test.png" /></div>');
		});
		it('should output markup based on the options passed in', function(){
			var out = Carder.generateLogoMarkup({
					'visa'       : 'test.png',
					'amex'       : 'test.png',
					'mastercard' : 'test.png',
					'discover'   : 'test.png'
				},
				'<div class="test">{{cc-logos}}</div>',
				'<div class="{{classes}}"><img alt="{{cardname}}" src="{{cardimage}}" /></div>',
				'logo-wrap highlight');

			expect(out).to.be('<div class="test"><div class="logo-wrap highlight visa"><img alt="visa" src="test.png" /></div><div class="logo-wrap highlight amex"><img alt="amex" src="test.png" /></div><div class="logo-wrap highlight mastercard"><img alt="mastercard" src="test.png" /></div><div class="logo-wrap highlight discover"><img alt="discover" src="test.png" /></div></div>');
		});
	});
	describe('#Carder', function(){
		beforeEach(function(done){
			$('body').append('<div id="holder"><input id="cc" itype="text" /></div>');
			done();
		});
		afterEach(function(done){
			$('#holder').remove();
			done();
		});
		it('should work with no options provided', function(){
			$('#cc').carder();
			expect($('#holder .carder-logos')).to.be.a(jQuery);
			expect($('#holder .carder-logos').length).to.be(1);
			expect($('#cc').data('carder')).to.be.a(Carder);
			expect($('#holder .carder-logos:first-child').length).to.be(0);
		});
		it('should work with options', function(){
			$('#cc').carder({
				logoPosition : 'before',
				keyUpTimeout : 2,
				errorClass   : 'other-error'
			});

			expect($('#holder .carder-logos')).to.be.a(jQuery);
			expect($('#holder .carder-logos').length).to.be(1);
			expect($('#cc').data('carder')).to.be.a(Carder);
			expect($('#cc').data('carder').options.keyUpTimeout).to.be(2);
			expect($('#cc').data('carder').options.errorClass).to.be('other-error');
			expect($('#holder .carder-logos:first-child').length).to.be(1);
		});
		it('should attach and respond to keyup events', function(done){
			$('#cc').carder();
			$('#cc').val('4').trigger('keyup');

			setTimeout(function(){
				expect($('.carder-logos .highlight').length).to.be(1);
				expect($('.carder-logos .highlight.visa').length).to.be(1);
				done();
			}, Carder.defaultOptions.keyUpTimeout +  50);
		});
		it('should attach and respond to blur events', function(){
			$('#cc').carder();
			$('#cc').val('378282246310005').trigger('blur');

			expect($('.carder-logos .highlight').length).to.be(1);
			expect($('.carder-logos .highlight.amex').length).to.be(1);
		});
		it('should handle errors in input', function(){
			$('#cc').carder();
			$('#cc').val('37828224').trigger('blur');

			expect($('.carder-logos .highlight').length).to.be(4);
			expect($('#cc').hasClass('error')).to.be.ok();
			expect($('#holder .carder-label').length).to.be(1);
			expect($('#cc').data('carder').error).to.be(true);

		});
	});
});
