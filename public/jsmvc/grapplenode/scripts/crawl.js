// load('grapplenode/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("grapplenode/grapplenode.html","grapplenode/out")
});
