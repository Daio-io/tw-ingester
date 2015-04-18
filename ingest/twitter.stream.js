'use strict';

var Twitter = require('node-tweet-stream');

var TwitterStream = new Twitter({

    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_S

});

module.exports = TwitterStream;

