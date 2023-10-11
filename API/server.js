var express = require('express');
var bodyParser = require("body-parser");
var database = require("./database");

/*
const testUser = {name: "Test", mail: "ekertdenis@gmail.com", grade: "12"};
const updatedUser = {name: "Test2", mail: "ekertdenis@gmail.com", grade: "7a"};

//database.connect();

testDatabase();
async function testDatabase() {

    const getDate = inDays => {
        var d = new Date(Date.now());
        var date = "";
        var month = d.getMonth() + 1;
        var day = d.getDate() + inDays;

        var monthAsString = "" + month;
        var dayAsString = "" + day;
        if (month < 10) {
            monthAsString = '0' + month;
        }
        if (day < 10) {
            dayAsString = '0' + day;
        }
        date += d.getFullYear() + "-" + monthAsString + "-" + dayAsString;

        return date;
    };

    await database.connect();
    //console.log(await database.getUsers());
    //const date = getDate(1);
    //console.log(await database.getSubs(date));
    /*
    const res = await database.createUser(testUser);
    await database.getUser(res.insertedId);
    await database.updateUser(res.insertedId, updatedUser);
    console.log(await database.getUser(res.insertedId));
    await database.removeUser("5e2d9bcaa4d2810007fe050f");
}*/

var app = express();
var router = express.Router();

const PORT = process.env.PORT || 3000;

router.post('/register', async function (req, res) {
    // res.header("Access-Control-Allow-Origin", "https://substitutions-ksl.appspot.com"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const result = await database.createUser(req.body);

    res.send(result);
});

router.post('/update', async function (req, res) {
    // res.header("Access-Control-Allow-Origin", "https://substitutions-ksl.appspot.com"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body.id, req.body.user);
    const result = await database.updateUser(req.body.id, req.body.user);
    res.send(result);
});

router.delete('/delete', async function (req, res) {
    console.log("body.id:", req.body.id);
    const result = await database.removeUser(req.body.id);
    res.send(result);
});

router.get('/user', async function (req, res) {
    const user = await database.getUser(req.query.id);
    res.send(user);
});

router.get('/users', async function (req, res) {
    const user = await database.getUsers();
    res.send(user);
});

router.get('/subs', async function (req, res) {
    const subs = await database.getSubs(req.query.date);
    res.send(subs);
});

router.post('/subs', async function (req, res) {
    console.log(req.body.subs, req.body.date);
    const subs = await database.addSubs(req.body.subs, req.body.date);
    res.send(subs);
});

router.delete('/subs', async function (req, res) {
    const result = await database.removeSubs(req.body.date);
    res.send(result);
});

router.get('/', function (req, res) {
    res.send('API seems to be healthy');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://substitutions-ksl.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, function () {
    console.log("Healthcheck app listening on port " + PORT);
});
