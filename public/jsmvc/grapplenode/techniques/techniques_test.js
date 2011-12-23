steal('funcunit').then(function(){

module("Grapplenode.Techniques", { 
	setup: function(){
		S.open("//grapplenode/techniques/techniques.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Techniques Demo","demo text");
});


});