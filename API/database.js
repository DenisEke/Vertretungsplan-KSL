const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const info = require("./info");

const url = "mongodb+srv://NodeWorker:" + info.PWD_MANGO + "@substitutionsksl-knvdi.gcp.mongodb.net/test?retryWrites=true&w=majority";
let client = null;
let userCollection = null;
let subDB = null;

async function validateConnection() {
    if (!client) {
        console.log("No database connection.");
        console.log("Trying to connect to mongoDB...");
        client = await MongoClient.connect(url, {useNewUrlParser: true})
            .catch(err => {
                console.log(err);
            });
        if (client) {
            userCollection = client.db("users").collection('users');
            subDB = client.db("subs");
            console.log("Connected to mongoDB");
        }
    } else {
        console.log("Existing database connection");
    }
}

module.exports = {
    async getUser(id) {

        console.log("Trying to find user with id " + id);
        await validateConnection();
        try {
            let user = await userCollection.findOne(ObjectId(id));
            return user;
        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async createUser(user) {

        console.log("Trying to create user " + user);
        await validateConnection();

        try {

            let res = await userCollection.insertOne(user);
            console.log("Created User");
            return res;

        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async updateUser(id, toUser) {
        console.log("Trying to update user " + id);
        await validateConnection();

        try {
            let res = await userCollection.updateOne({_id: ObjectId(id)}, {$set: toUser});
            console.log(res);
            return res;

        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async getUsers() {
        console.log("Fetching all users");
        await validateConnection();
        try {
            let users = await userCollection.find().toArray();
            return users;
        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async removeUser(id) {

        console.log("Trying to delete user " + id);
        await validateConnection();

        try {
            let res = await userCollection.deleteOne({_id: ObjectId(id)});
            //console.log(res);
            return res;

        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async getSubs(date) {
        console.log("Fetching all subs for " + date);
        await validateConnection();
        try {
            let subs = await subDB.collection(date).find().toArray();
            return subs;
        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async addSubs(subs, date) {
        console.log("Inserting " + subs);
        await validateConnection();
        try {
            let response = await subDB.collection(date).insertMany(subs);
            return response;
        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },
    async removeSubs(date) {

        console.log("Trying to delete subs " + date);
        await validateConnection();
        if (!client) {
            console.log("No database connection. Call connect before creating users.");
            return;
        }

        try {
            let res = await subDB.dropCollection(date);
            return res;

        } catch (err) {
            console.log(err);
            return "An error occured.";
        }
    },

};