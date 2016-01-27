var express = require('express');
var router = express.Router();
var fs = require('fs');
var WordPOS = require('wordpos'),
    wordpos = new WordPOS();

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');
//  read in those words
var wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
// its an empty words array
var words = [];


var processWords = new Promise(function(resolve, reject) {
  // for each word thats in the dictionary (OW memory)
  for (var word in wordArray) {
    // if it start with d, is HAS to start with d or we don't want it...
    if (wordArray[word].charAt(0) === 'd') {
      // add it to that empty words array eariler
      words.push(wordArray[word]);
    }

  }
  resolve("Success")
})

var adjectives, nouns;

processWords.then(function(value) {
  wordpos.getAdjectives(words, function(result1){
    adjectives = result1;
  });
  wordpos.getNouns(words, function(result2) {
    nouns = result2;
  });
  console.log("got the words")
});


/* GET home page. */
router.get('/', function(req, res, next) {
  // assign those variables badly
  res.render('index', { title: adjectives[Math.floor((Math.random() * adjectives.length) + 1)] + ' ' + nouns[Math.floor((Math.random() * nouns.length) + 1)]});



});

module.exports = router;
