/**
 * index.js
 * EmailYak node module
 *
 * @author Amir Malik
 */

var https = require('https');

var EmailBuilder = require('./lib/email').EmailBuilder;

function EmailYakAPI(api_key) {
  this.api_key = api_key;
}

EmailYakAPI.prototype._get = function(path, cb) {
  var options = {
    host: 'api.emailyak.com',
    port: 443,
    path: '/v1/' + this.api_key + '/json/' + path,
  };

  https.get(options, function(res) {
    console.log('EY.GET status', res.statusCode);

    res.setEncoding('utf8');
    var res_data = '';

    res.on('data', function(chunk) {
      res_data += chunk.toString();
    });
    res.on('end', function() {
      cb(null, res, res_data);
    });
  }).on('error', function(e) {
    console.error('EY.GET error', e.message);
    cb(e);
  });
};

EmailYakAPI.prototype._post = function(path, data, cb) {
  var options = {
    method: 'POST',
    host: 'api.emailyak.com',
    port: 443,
    path: '/v1/' + this.api_key + '/json/' + path,
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    var res_data = '';

    res.on('data', function(chunk) {
      res_data += chunk.toString();
    });
    res.on('end', function() {
      cb(null, res, res_data);
    });
  });

  req.on('error', function(e) {
    console.error('POST error', e.message);
    cb(e);
  });

  if('string' != typeof data)
    data = JSON.stringify(data);

  req.setHeader('Content-Type', 'application/json');
  req.setHeader('Content-Length', data.length);
  req.write(data);
  req.end();
};

EmailYakAPI.prototype.register = function(address, cb) {
  this._post('register/address/', {Address: address}, function(err, res, data) {
    if(err) return cb(err);

    // TODO: check status in data
    cb(null);
  });
};

EmailYakAPI.prototype.send = function(email, cb) {
  this._post('send/email/',
             {
               FromAddress: email.from,
               ToAddress: email.to,
               Subject: email.subject,
               TextBody: email.text
             },
             function(err, res, data) {
               if(err) return cb(err);

               cb(null);
             });
};

EmailYakAPI.prototype.get = function(email_id, cb) {
  this._get('get/email/?EmailID=' + id, function(err, res, data) {
    if(err) return cb(err);

    // TODO: should we have an object mapping back to simple stuff?
    cb(null, JSON.parse(data));
  });
};

EmailYakAPI.prototype.email = function(params) {
  var e = new Email(this);

  for(var key in params) {
    if(params.hasOwnProperty(key))
      e[key] = params[key];
  }

  return e;
};

EmailYakAPI.prototype.emailBuilder = function() {
  return new EmailBuilder(this);
};

exports.EmailYakAPI = EmailYakAPI;
