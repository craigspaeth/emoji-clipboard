#!/usr/bin/env node

var request = require('superagent'),
    exec = require('child_process').exec,
    cheerio = require('cheerio');

var emoji = process.argv[2];

request.get('http://emojicons.com/e/' + emoji).end(function(res) {
  $ = cheerio.load(res.text);
  if (res.err) return console.log(res.err);
  exec("echo \"" + $('.emoticon-item textarea').text() + "\" | pbcopy", function() {
    console.log("Copied!");
  })
});