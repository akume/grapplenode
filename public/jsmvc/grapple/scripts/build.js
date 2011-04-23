//steal/js grapple/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('grapple/scripts/build.html',{to: 'grapple'});
});
