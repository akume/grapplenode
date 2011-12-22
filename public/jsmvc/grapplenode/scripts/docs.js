//js grapplenode/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('grapplenode/grapplenode.html', {
		markdown : ['grapplenode']
	});
});