var subsFetcher = require('./fetch_subs.js');
var mailService = require('./mail_service.js');

//this is just a health check if the app is running
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3001;

app.get('/worker/', function (req, res) {
    res.send('Worker seems to be healthy!');
});

//CRON JOB: every sun,mon,tue,wed,thu 18:00
app.get('/worker/mail/cron', function (req, res) {
    if (req.header('X-Appengine-Cron')) {
        mailService.sendSubsMail();
        res.send('Hello Google!');
    } else {
        res.send('What are you looking for?');
    }
});

//CRON JOB: every sun,mon,tue,wed,thu 17:00
app.get('/worker/subs/cron', function (req, res) {
    if (req.header('X-Appengine-Cron')) {
        subsFetcher.fetchSubs();
        res.send('Hello Google!');
    } else {
        res.send('What are you looking for?');
    }
});

app.listen(PORT, function () {
    console.log("Healthcheck app listening on port " + PORT);
});