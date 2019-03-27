const express = require('express');
const router = express.Router();
const fs = require('fs');
const WordPOS = require('wordpos'),
  wordpos = new WordPOS();
var adjectives, nouns;

// returns the path to the word list which is separated by `\n`
const wordListPath = require('word-list');
//  read in those words
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
// its an empty words array
const words = [];

/** @returns words starting with D */
const processWords = new Promise(resolve => {
  // for each word thats in the dictionary (OW memory)
  for (var word in wordArray) {
    // if it start with d, is HAS to start with d or we don't want it...
    if (wordArray[word].charAt(0) === 'd') {
      // add it to that empty words array eariler
      words.push(wordArray[word]);
    }

  }
  resolve('Success')
});

// For each word
processWords.then(value => {
  wordpos.getAdjectives(words, result1 => {
    adjectives = result1;
  });
  wordpos.getNouns(words, result2 => {
    nouns = result2;
  });
  console.log('Words processed');
});


/* GET home page. */
router.get('/', (req, res) => {
  const word1 = adjectives[Math.floor((Math.random() * adjectives.length) + 1)] 
  const word2 = nouns[Math.floor((Math.random() * nouns.length) + 1)]

  // assign those variables badly
  res.render('index', { 
    title: `${word1} ${word2}`
  });
});

module.exports = router;
