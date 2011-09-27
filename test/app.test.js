
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app')
  , assert = require('assert');


module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<li class=\'logo\'>Grapplenode</li>');
        assert.includes(res.body, '<iframe');
      });
  },
  
  '/auth/facebook':function(){
  	assert.response(app,
      { url: '/auth/facebook' },
      { status: 303});
  },
  
  '/auth/facebook/callback':function(){
  	assert.response(app,
      { url: '/auth/facebook' },
      { status: 303});
  }
};