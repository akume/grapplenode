steal('funcunit').then(function(){

module("Grapplenode.Techniques.Technique", { 
	setup: function(){
		S.open("//grapplenode/techniques/technique/technique.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Techniques.Technique Demo","demo text");
});


});