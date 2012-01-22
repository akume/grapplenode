steal('funcunit').then(function(){

module("Grapplenode.Locker", { 
	setup: function(){
		S.open("//grapplenode/locker/locker.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Grapplenode.Locker Demo","demo text");
});


});