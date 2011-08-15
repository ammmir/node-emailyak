/**
 * index.js
 * EmailYak API client
 *
 * @author Amir Malik
 */

var querystring = require('querystring'),
          https = require('https');

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

function parseResponse(cb) {
  return function(err, res, data) {
    if(err)
      return cb(err);

    try {
      data = JSON.parse(data);
      return cb(null, res, data);
    } catch(e) {
      return cb(e);
    }
  };
}

EmailYakAPI.prototype.registerDomain = function(domain, callback_url, push_email, cb) {
  var opts = {
    Domain: domain,
    CallbackURL: callback_url,
    PushEmail: push_email,
  };

  this._post('register/domain/', opts, parseResponse(cb));
};

EmailYakAPI.prototype.registerAddress = function(address, callback_url, push_email, cb) {
  var opts = {
    Address: address,
    CallbackURL: callback_url,
    PushEmail: push_email,
  };

  this._post('register/address/', opts, parseResponse(cb));
};

EmailYakAPI.prototype.sendEmail = function(params, cb) {
  this._post('send/email/', params, parseResponse(cb));
};

EmailYakAPI.prototype.getEmail = function(email_id, get_headers, cb) {
  var params = {
    EmailID: email_id,
    GetHeaders: get_headers,
  };

  if(!cb) {
    cb = get_headers;
    params['GetHeaders'] = false;
  }

  this._get('get/email/?' + querystring.stringify(params), parseResponse(cb));
};

EmailYakAPI.prototype.getEmailList = function(email_ids, get_headers, cb) {
  this.getEmail(email_ids.join(','), get_headers, cb);
};

EmailYakAPI.prototype.getAllEmail = function(domain, get_headers, start, end, cb) {
  var params = {
    Domain: domain,
    GetHeaders: get_headers,
    Start: start,
    End: end,
  };

  this._get('get/all/email/?' + querystring.stringify(params), parseResponse(cb));
};

EmailYakAPI.prototype.getNewEmail = function(domain, get_headers, start, end, cb) {
  var params = {
    Domain: domain,
    GetHeaders: get_headers,
    Start: start,
    End: end,
  };

  this._get('get/new/email/?' + querystring.stringify(params), parseResponse(cb));
};

EmailYakAPI.prototype.deleteEmail = function(email_id, cb) {
  this._post('delete/email/', {EmailID: email_id}, parseResponse(cb));
};

exports.EmailYakAPI = EmailYakAPI;
