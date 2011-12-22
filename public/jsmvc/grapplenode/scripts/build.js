//steal/js grapplenode/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('grapplenode/scripts/build.html',{to: 'grapplenode'});
});
