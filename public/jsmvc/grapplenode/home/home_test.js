steal('funcunit').then(function(){

module("Grapplenode.Home", { 
	setup: function(){
		S.open("//grapplenode/home/home.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Home Demo","demo text");
});


});