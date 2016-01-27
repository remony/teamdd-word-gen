var fs = require('fs');
var express = require('express');
var app = express();

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


app.get('/', function (req, res) {
  res.send('Team ' + words[Math.floor((Math.random() * words.length) + 1)] + ' ' + words[Math.floor((Math.random() * words.length) + 1)] );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
