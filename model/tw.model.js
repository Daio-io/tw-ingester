'use strict';

var mongoose = require('mongoose');

var TwModel = mongoose.model('Tw', {

    tweet: String,
    removedWord: String,
    wordLength: Number,
    createdAt: Date

});

module.exports = TwModel;