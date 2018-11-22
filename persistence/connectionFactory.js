//Just an example how to connect in mongodb cloud
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:group3noobJS@ds037997.mlab.com:37997/etmp-group-project-noobjs';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

function createDBConnection() {
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    return mongoose.connection;
}

module.exports = function () {
    return createDBConnection;
};

//var MongoClient = require('mongodb').MongoClient,
//    ObjectID = require('mongodb').ObjectID;
//const uri = "mongodb+srv://admin:administrator@groupproject-1cejk.gcp.mongodb.net/test?retryWrites=true";

/*const DB = "Patients";
const C_PATIENTS = "patients";


MongoClient.connect(uri, function (err, client) {

    // Insert
    /!*const collection2 = client.db("Patients").collection("patients").
    insert({name : "Ana Jerkins",
        age : 46 });*!/

    // Remove Example
    /!*
    client.db(DB).collection(C_PATIENTS).remove({"_id" : ObjectID("5bd90c620b30304164ee1e25")});
    client.db(DB).collection(C_PATIENTS).remove({name : "Ana Jerkins"});
    *!/

    //FindAll
    const collection = client.db(DB).collection(C_PATIENTS).find({}, function (err, docs) {
        docs.each(function (err, doc) {
            console.log(doc);
        })
    });
    client.close();
});*/

//function createDBConnection() {
//    return MongoClient.connect(uri, {useNewUrlParser: true});
//}

//module.exports = function () {
//    return createDBConnection();
//};