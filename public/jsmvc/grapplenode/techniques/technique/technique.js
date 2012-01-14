steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Techniques.Technique
 */
$.Controller('Grapplenode.Techniques.Technique',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/techniques/technique/views/init.ejs",{
			message: "Hello World"
		});

    //this.element.find('.video').suna_videoplayer();
	}
})

});