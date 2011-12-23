steal('funcunit').then(function(){

module("Grapplenode.Navigation", { 
	setup: function(){
		S.open("//grapplenode/navigation/navigation.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Navigation Demo","demo text");
});


});