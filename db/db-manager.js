//Just an example how to connect in mongodb cloud



var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

const DB = "Patients";
const C_PATIENTS = "patients";

var uri = "mongodb+srv://admin:administrator@groupproject-1cejk.gcp.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, function(err, client) {

    // Insert
    /*const collection2 = client.db("Patients").collection("patients").
    insert({name : "Ana Jerkins",
        age : 46 });*/

    // Remove Example
    /*
    client.db(DB).collection(C_PATIENTS).remove({"_id" : ObjectID("5bd90c620b30304164ee1e25")});
    client.db(DB).collection(C_PATIENTS).remove({name : "Ana Jerkins"});
    */

    //FindAll
    const collection = client.db(DB).collection(C_PATIENTS).find({}, function(err, docs) {
        docs.each(function (err, doc) {
            console.log(doc);
        })
    });
    client.close();
});