
const nodemailer = require('nodemailer');
const axios = require('axios');
const info = require('./info');
const pug = require('pug');
const du = require('date-fns');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: info.USER_GMAIL,
        pass: info.PWD_GMAIL
    }
});

function getSubsforUser(grade, subs) {
    var result = [];
    for (var i in subs) {
        var sub = subs[i];
        if (sub.grade == grade) {
            result.push(sub);
        }
    }
    return result;
}

module.exports = {
    sendSubsMail: async function () {

        const date = du.addDays(Date.now(), 1);

        const subs = (await axios.get('https://api-dot-substitutions-ksl.appspot.com/api/subs', {
            params: {
                date: du.format(date, "yyyy-MM-dd"),
            }
        })).data;
        console.log(subs);

        const users = (await axios.get('https://api-dot-substitutions-ksl.appspot.com/api/users', {
            params: {}
        })).data;
        console.log(users);


        for (var userNum in users) {
            var user = users[userNum];
            var userSubs = getSubsforUser(user.grade, subs);

            if (userSubs.length > 0) {
                var mailOptions = {
                    from: 'Vertretungsplan <' + info.MAIL + '>',
                    to: user.mail, //TODO send this to all users with the same grade and delete them from user array
                    subject: 'Deine Vertretungen für den ' + du.format(date, "dd.MM.yyyy"),
                    html: pug.renderFile('./resources/emails/substitutions.pug', {
                        user: user,
                        subs: userSubs,
                        date: du.format(date, "dd.MM.yyyy"),
                        subUrl: info.URL_SUBS,
                        userLink: "https://substitutions-ksl.appspot.com/user/" + user._id,
                    })
                };
                console.log("sending " + mailOptions);

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }

        }
    },
    sendTestMail() {
        var mailOptions = {
            from: 'CronTest <' + info.MAIL + '>',
            to: 'ekertdenis@gmail.com',
            subject: 'Ein einfacher CRON test',
            text: 'Haha es klappt'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};

