 var express = require("express");
 var fs = require("fs");
 var Xray = require('x-ray');

 var app = express();

 var x = Xray();
 /* serves main page */

 app.get("/", function(req, res) {
    res.sendFile(__dirname +'/client/index.html')

 });

  app.get("/reddit", function(req, res) {
	  res.sendFile(__dirname +'/client/reddit.html')

  });

  app.get("/dribbble", function(req, res) {
	 res.sendFile(__dirname +'/client/dribbble.html')

  });

  app.get("/aujobs", function(req, res) {
	 res.sendFile(__dirname +'/client/aujobs.html')

  });

  //update dribble list
  app.get("/update-dribbble", function(req, res) {
    //start dribbble jobs scrape
    x('https://dribbble.com/jobs?location=Anywhere', 'a.group', [{
        company: '.item-title',
        position: '.item-desc',
        location: '.item-meta',
        url: '@href'
    }])
      .write('results-dribble-jobs.json')
      require('log-timestamp');
      console.log('dribble jobs scraped');

  });
  //update aujobs list
  app.get("/update-aujobs", function(req, res) {
    //Start reddit ausjobs scrape
    x('https://www.reddit.com/r/ausjobs/search?q=%5BHiring%5D&restrict_sr=on&sort=relevance&t=all', 'div.search-result', [{
      title: '.search-title',
      name: '.author ',
      content: '.search-result-body',
      url: '.search-title@href'
    }])
      .write('results-ausjobs.json')
      require('log-timestamp');
      console.log('reddit ausjobs scraped');


  });
  //update reddit jobs list
  app.get("/update-reddit", function(req, res) {
    //Start reddit jobs scrape
    x('https://www.reddit.com/r/forhire/search?q=title%3A%27%5Bhiring%5D%27+OR+flair%3AHiring+reddit%3Aforhire+OR+reddit%3Ajobbit+OR+reddit%3A:jobopenings&sort=new&t=all', 'div.search-result', [{
      title: '.search-title',
      name: '.author ',
      content: '.search-result-body',
      url: '.search-title@href'
    }])
      .write('results-reddit.json')
      require('log-timestamp');
      console.log('reddit jobs updated');

  });


 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){
     console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]);
 });

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
