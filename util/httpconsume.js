var https = require('https')
  , qs = require('querystring');


exports.HTTPConsume = HTTPConsume = function(options) {
  this.base = options.base;
  this.path = options.path;
}

HTTPConsume.prototype.request = function(params, headers, callback) {
  var self = this
    , body
    , headers
    , params
    , req;

  headers['host'] = self.base;
  headers['accept'] = 'application/json';
  
  var options = {
    host: self.base,
    port: 443,
    path: self.path + '?'+qs.stringify(params),
    headers: headers
  };

  var req = https.get(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function(data) {
      try {
        data = JSON.parse(data);
      } catch(err) {
        console.log(err); 
      }

      if(callback) callback(res.statusCode, data);
      
    });
    
  });

}


