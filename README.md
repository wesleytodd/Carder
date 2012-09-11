#Credit Card Type Indication (carder)

Formerly at https://github.com/wesleytodd/Form-FX/tree/master/carder

[Example Page](http://carder.wtdev.me:8000/)

**Version 2.0**

This plugin adds credit card logos and ccid/ccv images which dynamically update based on the input in the credit card field.  The plugin will try and match the shortest possible number for each type by default.  When the field loses focus the field is validated and if is not valid an error will be added and the field will only validate a full card number.

All the required images are bundled as data URI's, but image locations can be substituted.  When a match is found a class is added to the corresponding card logo and the ccid/ccv image is updated.  By default the plugin hides the ccid/ccv image on page load, but this can be changed by defining a custom function in the options (`ccidIcon`).

Test card numbers:  
American Express: 378282246310005  
Discover: 6011111111111117  
Mastercard: 5555555555554444  
Visa: 4111111111111111  

## Basic Example

	jQuery(document).ready(function($){
		$('#cardnum').carder();
	});

## Intermediate Example

This example defines a CCID icon that is added dynamically.

	jQuery(document).ready(function($){
		$('#cardnum').carder({
			'ccidIcon'  : function(){
				var ccidimg = $('<img src="" class="carder-ccid"/>').hide();
				$('#cardid').after(ccidimg);
				return ccidimg;
			},
			'errorMessage' : 'That credit card number dosent smell right....'
		});
	});

## Full Example

	$('input.creditcard').carder({
		matchPartial   : true,         // Match partial numbers?
		keyUpTimeout   : 500,          // Throttle amount on keyup trigger
		logoClass      : 'logo',       // Class to apply to credit card logos
		highlightClass : 'highlight',  // Active class on logos
		logoPosition   : 'after',      // Logo position (before|after|custom function)
		logoMarkup     : '<div class="carder-logos">{{cc-logos}}</div>',  // Template for logos
		logoTemplate   : '<img class="{{classes}}" alt="{{cardname}}" src="{{cardimage}}" />', // Individual logo image template
		ccidIcon       : false,        // CCID Icon (jQuery|custom function)
		ccidTemplate   : '<img src="{{ccid-icon}}" />', // template for CCID image
		ccLogos	       : {            // A hash of card types and matching image src values
			'visa'       : 'data:image/gif;base64,R0lGOD...',
			'amex'       : 'data:image/gif;base64,R0lGO...',
			'mastercard' : 'data:image/gif;base64,R0lG...',
			'discover'   : 'data:image/gif;base64,R0l...'
		},
		supportedCC     : {           // The credit card regular expressions
			'visa'       : {
				full    : '^4[0-9]{12}(?:[0-9]{3})?$',
				partial : '^4[0-9]{0,15}$'
			},
			'amex'       : {
				full    : '^3[47][0-9]{13}$',
				partial : '^3[47][0-9]{0,13}$'
			},
			'mastercard'       : {
				full    : '^5[1-5][0-9]{14}$',
				partial : '^5[1-5][0-9]{0,14}$'
			},
			'discover'       : {
				full    : '^6(?:011|5[0-9]{2})[0-9]{12}$',
				partial : '^6(?:011|5[0-9]{2})[0-9]{0,12}$'
			}
		},
		ccidRelationship : {          // Relationships between card types and CCID images
			'visa'       : 'standard',
			'amex'       : 'amex',
			'mastercard' : 'standard',
			'discover'   : 'standard'
		},
		ccidImages      : {           // CCID images
			'standard'   : 'data:image/gif;base64,R0lGODl...',
			'amex'       : 'data:image/gif;base64,R0lGODl...'
		},
		errorTemplate    : '<label class="carder-label {{errorClass}}" for="{{elId}}">{{errorMessage}}</label>',  // An error message template
		errorClass       : 'error', // The error class applied to the field and the error message
		errorMessage     : 'Please enter a valid credit card number.',  // The error message
		errorPosition    : 'after'  // Position of the error message
});

Some optional css is defined in carder.css, but this is just an example of the effect you can create.
