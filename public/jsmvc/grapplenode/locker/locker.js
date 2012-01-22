steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Grapplenode.Locker
 */
$.Controller('Grapplenode.Locker',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//grapplenode/locker/views/init.ejs",{
			message: "Hello World"
		});
	}
})

});