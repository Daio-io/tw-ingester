'use strict';

var tweetStream = require('./twitter.stream');
var nounExtract = require('../lib/noun.extractor');
var TwModel = require('../model/tw.model');



tweetStream.track(['David Cameron', 'Ed Miliband', 'Nigel Farage', 'Nick Clegg']);

tweetStream.on('tweet', function (tweet) {

    saveTweet(tweet);

});



String.prototype.replaceAt = function (index, char) {
    return this.substr(0, index) + char + this.substr(index + char.length);
};


function saveTweet(tweet) {

    var wordToRemove = getNounFromTweet(tweet);

    if (wordToRemove) {

        var tweetToSave = removeWordFromTweet(tweet, wordToRemove);

        var Tw = new TwModel({

            tweet: tweetToSave,
            removedWord: wordToRemove,
            wordLength: wordToRemove.length,
            createdAt: new Date()

        }).save();
    }

}

function getNounFromTweet(tweetText) {

    nounExtract(tweetText, function (data) {

        if (data) {

            var index = Math.floor(Math.random() * (data.length));
            return data[index];

        }

        return '';

    });

}

function removeWordFromTweet(tweet, wordToRemove) {

    var index = tweet.indexOf(wordToRemove);

    for (var i = 0; i < wordToRemove.length; i++) {

        tweet = tweet.replaceAt(index + i, '_');

    }

    return tweet;

}

