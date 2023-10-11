const axios = require('axios');
const fs = require("fs");
const request = require("request-promise-native");
/*NOTE: this is quite shady. The pdf-table-extractor original does no allow to extract from buffers. So I copied his package
and mad this possible.*/
const extractor = require('./pdf-table-extractor/pdf-table-extractor');
const pdf = require('pdf-parse');
const info = require("./info");

let pdfBuffer;

module.exports = {
    async fetchSubs() {
        console.log("fetching substitutions ...");
        pdfBuffer = await request.get({uri: info.URL_SUBS, encoding: null});

        console.log("extracting substitutions ...");
        extractor(pdfBuffer, success, error);

    }
};

//is called when the pdf gets extracted successfully
async function success(result) {
    console.log("extraction was successful!");

    //extracting date
    let date;
    await pdf(pdfBuffer).then(function (data) {
        date = getDateFromText(data.text);
    });
    console.log("the date for the substitutions is " + date);

    //Validating and transforming extracted substitutions
    var subs = [];
    var lastRow;
    var obj = JSON.parse(JSON.stringify(result));

    for (page = 0; page < obj.pageTables.length; page++) {
        for (i = 1; i < obj.pageTables[page].tables.length; i++) {
            if (page == 0 && i < 2) {
                continue;
            }
            row = obj.pageTables[page].tables[i];
            if (validateRow(row, lastRow)) {
                lastRow = row;
                subs.push(row);
            }
        }
    }


    var subObj = [];
    for (var subRaw in subs) {
        var sub = subs[subRaw];
        var split = sub[0].split(",");
        for (var s in split) {
            subObj.push({
                grade: split[s],
                class: sub[1],
                teacher: sub[2],
                subject: sub[3],
                room: sub[4],
                subTeacher: sub[5],
                subRoom: sub[6],
                info: sub[7]
            });
        }
    }

    console.log({subObj});

    await axios.delete('https://api-dot-substitutions-ksl.appspot.com/api/subs', {data: {date: date},});

    await axios.post('https://api-dot-substitutions-ksl.appspot.com/api/subs', {date: date, subs: subObj});

    pdfBuffer = null;
}

//is called when the pdf extractor throws an error
function error(err) {
    console.error('Extraction threw an error: ' + err);
}

//replaces all stars and sets the grades right
function validateRow(row, lastRow) {
    for (col = 0; col < row.length; col++) {
        var val = row[col];
        if (val != '') {
            return true;
        }
        if (col == 0) {
            if (val == '' || val == 'Klasse') {
                row[col] = lastRow[0];
            }
        }
        if (col == 1) {
            if (val == '' || val == 'Pos') {
                row[col] = lastRow[1];
            }
        }
    }
    return false;
}

function stringToDate(text) {
    var split = text.split(".");
    var reformated = split[2] + "-" + split[1] + "-" + split[0];
    return reformated; //parse(reformated);
}

function getDateFromText(text) {
    var split = text.split("\n");

    for (let s in split) {

        if (split[s] !== '') {
            var date = stringToDate(split[s].split(" ")[1]);
            return date;
        }
    }
    return "no date found";

}
