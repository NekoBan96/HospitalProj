const { ObjectId } = require("mongodb");

const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
const dbName = 'hospitalProject'

exports.add = async function(email, pass) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("users");
        const data = {email: email, password: pass};
        await collection.insertOne(data);
        return Promise.resolve('success');
    }catch(err) {
        console.log(err);
    }
}

exports.getByEmail = async function(email) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("users");
        const result = await collection.findOne({email: email})
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.getByUserName = async function(username) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("users");
        const result = await collection.findOne({userName: username})
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.useCheck = async function (email, username) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("users");
        // const resultLogin = await collection.findOne({userName: username})
        const resultEmail = await collection.findOne({email: email})
        console.log(resultEmail, resultLogin)
        if (resultEmail != null) {
            console.log("use123")
            return Promise.resolve("in use")
        }
    }catch(err) {
        console.log(err);
    }
}

exports.edit = async function(body) {
    try {

    }catch(err) {
        throw(err)
    }
  }