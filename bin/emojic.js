#!/usr/bin/env node

var request = require('superagent'),
    exec = require('child_process').exec,
    cheerio = require('cheerio');

var emoji = process.argv[2];

request.get('http://emojicons.com/e/' + emoji).end(function(res) {
  if (res.err) return console.warn(res.err);
  if (res.status == 404) {
    request.get('http://emojicons.com/tag/' + emoji).end(function(res) {
      var $ = cheerio.load(res.text);
      var text = $('.emoticon-item:first-child textarea').text().trim();
      text ? cp(text) : console.log("No emojis found. (◞‸◟；)");
    });
  } else {
    var $ = cheerio.load(res.text);
    cp($('.emoticon-item textarea').text());
  }
});

var cp = function (text) {
  exec("echo \"" + text + "\" | pbcopy", function() {
    console.log("Copied! " + text);
  });
}