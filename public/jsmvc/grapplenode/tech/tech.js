steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Tech
 */
$.Controller('Grapplenode.Tech',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/tech/views/init.ejs",{
			message: "Hello World"
		});
	}
})

});