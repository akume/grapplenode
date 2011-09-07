//TODO: make the admin files protected by login
//seee https://github.com/visionmedia/express/blob/master/examples/downloads/app.js

steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	
	.css('admin')	// loads styles

	.resources()					// 3rd party script's (like jQueryUI), in resources folder

	.models('technique', 'user')		// loads files in models folder 

	.controllers('technique', 'user')	// loads files in controllers folder

	.views();						// adds views to be added to build