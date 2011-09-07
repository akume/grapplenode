//steal/js admin/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('admin/scripts/build.html',{to: 'admin'});
});
