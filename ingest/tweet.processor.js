'use strict';

var tweetStream = require('./twitter.stream');
var nounExtract = require('../lib/noun.extractor');
var TwModel = require('../model/tw.model');

module.exports = function () {

    tweetStream.track(['David Cameron', 'Ed Miliband', 'Nigel Farage', 'Nick Clegg']);

    tweetStream.on('tweet', function (tweet) {

        console.log(tweet.text);
        saveTweet(tweet.text);

    });

}


String.prototype.replaceAt = function (index, char) {
    return this.substr(0, index) + char + this.substr(index + char.length);
};


function saveTweet(tweet) {

    getNounFromTweet(tweet, function (wordToRemove) {

        if (wordToRemove.length > 0) {
            var tweetToSave = removeWordFromTweet(tweet, wordToRemove);

            var Tw = new TwModel({

                tweet: tweetToSave,
                removedWord: wordToRemove,
                wordLength: wordToRemove.length,
                createdAt: new Date()

            }).save(function (err) {

                    if (err) {
                        console.log('there was an error', err);
                    }

                });
        }

    });


}

function getNounFromTweet(tweetText, callback) {

    nounExtract(tweetText, function (data) {

        if (data) {

            var index = Math.floor(Math.random() * (data.length));
            console.log('Noun to remove found: ', data[index]);
            callback(data[index]);

        }

        return callback('');

    });

}

function removeWordFromTweet(tweet, wordToRemove) {

    var index = tweet.indexOf(wordToRemove);

    for (var i = 0; i < wordToRemove.length; i++) {

        tweet = tweet.replaceAt(index + i, '_');

    }

    console.log('Noun removed from tweet. returning: ', tweet);
    return tweet;

}

