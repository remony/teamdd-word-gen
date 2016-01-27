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
  wordpos.getAdjectives(words, function(result1){
    var word1 = result1[Math.floor((Math.random() * result1.length) + 1)];
      // console.log(result);
      wordpos.getNouns(words, function(result2) {
        var word2 = result2[Math.floor((Math.random() * result2.length) + 1)];
        res.render('index', { title: word1 + ' ' + word2});
    })
  });



});

module.exports = router;
