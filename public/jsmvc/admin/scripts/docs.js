//js admin/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('admin/admin.html', {
		markdown : ['admin']
	});
});