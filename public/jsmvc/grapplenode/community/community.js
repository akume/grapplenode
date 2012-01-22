steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Community
 */
$.Controller('Grapplenode.Community',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/community/views/init.ejs",{
			message: "Hello World"
		});
	}
})

});