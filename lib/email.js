/**
 * email.js
 * Email message
 *
 * @author Amir Malik
 */

//!\\ WARNING: DO NOT CONSTRUCT THESE OBJECTS YOURSELF!

function Email(api) {
  this.api = api;
  this.from = null;
  this.to = null;
  this.sender = null;
  this.subject = null;
  this.text = null;
  this.html = null;
}

Email.prototype.send = function(cb) {
  this.api.send(this, cb);
};

function EmailBuilder(api) {
  this.api = api;
  this.email = new Email(this.api);
}

EmailBuilder.prototype.from = function(s) {
  this.email.from = s;
  return this;
};

EmailBuilder.prototype.to = function(s) {
  this.email.to = s;
  return this;
};

EmailBuilder.prototype.sender = function(s) {
  this.email.sender = s;
  return this;
};

EmailBuilder.prototype.subject = function(s) {
  this.email.subject = s;
  return this;
};

EmailBuilder.prototype.text = function(s) {
  this.email.text = s;
  return this;
};

EmailBuilder.prototype.html = function(s) {
  this.email.html = s;
  return this;
};

EmailBuilder.prototype.send = function(cb) {
  this.email.send(cb);
};

exports.Email = Email;
exports.EmailBuilder = EmailBuilder;
