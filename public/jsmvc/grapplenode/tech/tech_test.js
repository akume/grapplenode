steal('funcunit').then(function(){

module("Grapplenode.Tech", { 
	setup: function(){
		S.open("//grapplenode/tech/tech.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Tech Demo","demo text");
});


});