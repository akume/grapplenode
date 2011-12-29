steal('funcunit').then(function(){

module("Suna.Videoplayer", { 
	setup: function(){
		S.open("//suna/videoplayer/videoplayer.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Suna.Videoplayer Demo","demo text");
});


});