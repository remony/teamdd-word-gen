var express = require('express');
var router = express.Router();
var fs = require('fs');

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');
//  read in those words
var wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
// its an empty words array
var words = [];

// for each word thats in the dictionary (OW memory)
for (var word in wordArray) {
  // if it start with d, is HAS to start with d or we don't want it...
  if (wordArray[word].charAt(0) === 'd') {
    // add it to that empty words array eariler
    words.push(wordArray[word]);
  }

}


/* GET home page. */
router.get('/', function(req, res, next) {
  // assign those variables badly
  var word1 = words[Math.floor((Math.random() * words.length) + 1)];
  var word2 = words[Math.floor((Math.random() * words.length) + 1)];
  res.render('index', { title: word1 + ' ' + word2});
});

module.exports = router;
