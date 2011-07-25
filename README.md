# node-emaiyak

A node.js module for sending and receiving email using
<a href="http://www.emailyak.com/">EmailYak</a>.

## Installation

    cd ~/.node_libraries
    git clone git://github.com/ammmir/node-emailyak.git emailyak

## Usage

Create the API object with your API key for the domain you want to send
or receive mail as:

    var EmailYakAPI = require('emailyak').EmailYakAPI;

    var api = new EmailYakAPI('my api key');

The EmailYakAPI object provides a convenient builder object that can be
chained to create an email message.

    var email = api.emailBuilder()
        .from('amir@example.com')
        .to('robert@example.com')
        .subject('emailyak + node.js = ?')
        .text('the node.js emailyak api is sick.')
        .send(function(err, res) {
          if(err)
            console.error('failed to send email', err);
          else
            console.log('message sent!');
        });

But if you don't like that pattern, then the following is equivalent:

    var email = api.email({
      from: 'amir@example.com',
      to: 'robert@example.com',
      subject: 'emailyak + node.js = ?'
    });
    email.text = 'the node.js emailyak api is sick.';
    email.send(function(err, res) {
      // ...
    });

Fields can be specified as part of the Object passed to the constructor
or directly set on the returned object.
