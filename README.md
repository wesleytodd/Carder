#Credit Card Type Indication (carder)

Formerly at https://github.com/wesleytodd/Form-FX/tree/master/carder

**Version 1.2**

This plugin adds credit card logos and ccid/ccv images which dynamically update based on the input in the credit card field.  The plugin will try and match the shortest possible number for each type by default.  When the field loses focus the field is validated and if is not valid an error will be added and the field will only validate a full card number.

All the required images are bundled as data URI's, but image locations can be substituted.  When a match is found a class is added to the corresponding card logo and the ccid/ccv image is updated.  By default the plugin hides the ccid/ccv image on page load, but this can be changed by defining a custom function in the options (`ccidIcon`).

Test card numbers:  
American Express: 378282246310005  
Discover: 6011111111111117  
Mastercard: 5555555555554444  
Visa: 4111111111111111  

## Example

	$('input.creditcard').carder({
		logoPosition    : 'after',                                         //Placement of the logos (before|after)
		logoHiliteClass : 'hilite',                                        //Applied to the active logos for hiliting
		logoMarkup      : '<div class="carder-logos">{{cc-logos}}</div>',  //Markup of the logos
		matchPartial    : true,                                            //True mathces on the shortest possiable numbers
		supportedCC     : {                                                //Regex's for the full and partial matches
			'visa'       : {                                               //Remove any that you do not want to match
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
		ccidRelationship : {                                               //CCID image relationships, value matches ccidImages key
			'visa'       : 'standard',
			'amex'       : 'amex',
			'mastercard' : 'standard',
			'discover'   : 'standard'
		},
		ccidImages      : {                                                //Data URI's for the images, key matches the ccidRelationships value
			'standard'   : 'data:image/gif;base64,R0lGOD......9w4IADs=',
			'amex'       : 'data:image/gif;base64,R0lGOD......wICADs='
		},
		ccLogos         : {                                                //Data URI's for the logos
			'visa'       : 'data:image/gif;base64,R0lGOD......LQAA7',
			'amex'       : 'data:image/gif;base64,R0lGOD......wIAOw==',
			'mastercard' : 'data:image/gif;base64,R0lGOD......AOw==',
			'discover'   : 'data:image/gif;base64,R0lGOD......ZAADs='
		},
		ccidIcon         : false,                                          //Function or jQuery object for the ccid icon,
		keyUpTimeout     : 500,                                            //How long to wait after typing to test the value
		errorClass       : 'error',                                        //Applied if the field doesn't match on blur event
		errorMessage     : 'Please enter a valid credit card number.',     //Message to add if errored on blur
		errorPosition    : 'after'                                         //Where to put the error message (before|after)
	});

Some optional css is defined in carder.css, but this is just an example of the effect you can create.