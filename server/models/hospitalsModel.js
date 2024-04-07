const MongoClient = require("mongodb").MongoClient;

const { ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
const dbName = 'hospitalProject'

exports.add = async function (req) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("hospitals");
        const data = {
            hospitalName: req.body.hospitalName,
            telNum: req.body.telNum,
            email: req.body.email,
            geoPos: req.body.geoPos,
            leaderName: req.body.leaderName,
            leaderJobTitle: req.body.leaderJobTitle
        };
        await collection.insertOne(data);
        return Promise.resolve('success');
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async function(req, id) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("hospitals");
        const result = await collection.findOneAndDelete({_id: new ObjectId(id)})
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.recent = async function (req, skip, limit) {
    try {

        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("hospitals");
        const result = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(limit).toArray()
        return Promise.resolve(result);
    } catch (err) {
        console.log(err);
    }
}
//const result1 = await collection.find({titleName: new RegExp(`.*${searchObj}.*`, "gmui")}).limit(limit).toArray()


exports.searchByName = async function (req, skip, limit, searchObj) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("hospitals");
        const result = await collection.find({hospitalName: new RegExp(`.*${searchObj}.*`, "gmui")}).skip(skip).limit(limit).toArray()
        return Promise.resolve(result);
    } catch (err) {
        console.log(err);
    }
}