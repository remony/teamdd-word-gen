var express = require('express');
var router = express.Router();
var fs = require('fs');

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');

var wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
// console.log(wordArray)
var words = [];
for (var word in wordArray) {
  // console.log(wordArray[word].charAt(0))
  if (wordArray[word].charAt(0) === 'd') {
    // console.log(wordArray[word])
    words.push(wordArray[word]);
  }

}


/* GET home page. */
router.get('/', function(req, res, next) {
  var word1 = words[Math.floor((Math.random() * words.length) + 1)];
  var word2 = words[Math.floor((Math.random() * words.length) + 1)];
  res.render('index', { title: word1 + ' ' + word2});
});

module.exports = router;
