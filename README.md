# node-emailyak

A node.js module for sending and receiving email using
<a href="http://www.emailyak.com/">EmailYak</a>. MIT licensed.

## Installation

    cd ~/.node_libraries
    git clone git://github.com/ammmir/node-emailyak.git emailyak

## Usage

Create the API object with your API key for the domain you want to send
or receive mail as:

    var EmailYakAPI = require('emailyak').EmailYakAPI;

    var api = new EmailYakAPI('my api key');

Using the EmailYakAPI object is very easy. Take a look at the [EmailYak
documentation](http://docs.emailyak.com/) to see what API calls are
available, and the syntax of any JSON returned.

Available API methods:

    registerDomain(domain, callback_url, push_email, cb);
    registerAddress(address, callback_url, push_email, cb);
    sendEmail(params, cb);
    getEmail(email_id, get_headers, cb);
    getEmailList(email_ids, get_headers, cb);
    getAllEmail(domain, get_headers, start, end, cb);
    getNewEmail(domain, get_headers, start, end, cb);
    deleteEmail(email_id, cb);

Note that the first error argument to the callback will only be defined
for node-level errors, not non-successful HTTP statuses.
