const MongoClient = require("mongodb").MongoClient;

const { ObjectId } = require("mongodb");
   
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
const dbName = 'hospitalProject';

exports.add = async function(req) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const data = {
            deviceName: req.body.deviceName,
            hospitalId: req.body.hospitalId,
            deviceDescription: req.body.deviceDescription,
            file: undefined
        };
        await collection.insertOne(data);
        result = await collection.findOne({deviceName: req.body.deviceName}, {})
        result = result._id.toString()
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.delete = async function(req, id) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const result = await collection.findOneAndDelete({_id: new ObjectId(id)})
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.recent = async function(req) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const result = await collection.find({}).sort({_id:-1}).toArray()
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.getByHospitalId = async function(req, hospitalId, skip, limit) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const result = await collection.find({hospitalId: hospitalId}).skip(skip).limit(limit).toArray()
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.getById = async function(id) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const result = await collection.findOne({_id: new ObjectId(id)});
        return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}

exports.isFileUpload = async function(id) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection("devices");
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {file: true}});
            return Promise.resolve(result);
    }catch(err) {
        console.log(err);
    }
}