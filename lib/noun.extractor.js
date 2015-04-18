/**
 * Fork of node-pos for hacking purposes
 * original author: Incrediblesound
 * original repo: https://github.com/incrediblesound/NodePOS
 */

var fs = require('fs');

module.exports = function(string, fn){
    getLibrary (function (library) {
        var results = [];
        sentences = makeArray(string, '.');
        forEach(sentences, function(sentence) {
            var current = [];
            string = makeArray(sentence, ' ');
            everyPossible(string, function(subset) {
                var testString = "";
                forEach(subset, function(word, i) {
                    if(i !== subset.length-1) {
                        testString = testString + word + ' ';
                    } else {
                        testString = testString + word;
                    }
                });
                if(library['N'].indexOf(testString) !== -1 && testString.length > 2) {
                    current.push(testString);
                }
            });
            if(current.length > 0) {results.push(current);}
        });
        return fn(results[0]);
    })
};

function getLibrary(fn) {
    fs.readFile('./lib/dictionary.js', 'Utf8', function (err, data) {
        data = data.toString();
        data = JSON.parse(data);
        return fn(data);
    })
}

function convertNotation(part) {
    var PoS = {
        "Noun": 'N',
        "Plural": 'p',
        "Noun Phrase": 'h',
        "Verb": 'V',
        "Verb Transitive": 't',
        "Verb Intransitive": 'i',
        "Adjective": 'A',
        "Adverb": 'v',
        "Conjunction": 'C',
        "Preposition": 'P',
        "Interjection": '!',
        "Pronoun": 'r',
        "Definite Article": 'D',
    };
    for(var x in PoS) {
        if(part === PoS[x]) {
            return x;
        }
    }
}

function rejectEmpty(array) {
    var results = [];
    forEach(array, function(element){
        if(element !== '' && element !== ' ') {
            element = noPunc(element);
            results.push(element);
        }
    });
    return results;
}

function noPunc(word) {
    var initial = word[0].match(/\!|\.|\?|\"|\'|\,/),
        Final = word[word.length-1].match(/\!|\.|\?|\"|\'|\,/);
    if(initial !== null) {
        word = word.substring(1, word.length);
    };
    if(Final !== null) {
        word = word.substring(0, word.length-1);
    };
    if(word[0].match(/\!|\.|\?|\"|\'|\,/) !== null || word[word.length-1].match(/\!|\.|\?|\"|\'|\,/) !== null) {
        return noPunc(word);
    } else {
        return word;
    }
}

function forEach(array, fn) {
    for(var i = 0; i<array.length;i++) {
        fn(array[i], i);
    }
}

function forEvery(array, fn) {
    for(var i = 0; i<array.length; i++) {
        list = [array[i]];
        for(var l = i+1; l < array.length; l++) {
            list.push(array[l]);
        }
        fn(list);
    }
}

function everyPossible(array, fn) {
    forEvery(array, function(subArray) {
        for(var i = subArray.length; i>0;--i) {
            fn(subArray.slice(0,i));
        }
    })
}

function makeArray(input, join) {
    input = input.split(join);
    input = rejectEmpty(input);
    return input;
}