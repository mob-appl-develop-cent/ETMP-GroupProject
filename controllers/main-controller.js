/*
 * main-controller.js manage all the requests and response http methods.
 *
 * Developed by Jose Aleixo Araujo Porpino Filho
 * Date: 2018-09-29
 * Version 1.0.0
 */
const patientsSave = require('save')('patients');
var getCounter = 0;
var postCounter = 0;
var deleteCounter = 0;
module.exports = function (app) {
    // Get all the patients
    app.get("/patients", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.find({}, function (error, patients) {
            console.log(patients == "");
            console.log("Send response <<<");
            if (patients != null && patients != "") {
                res.status(200).send(patients);
            } else {
                res.status(200).send("No records found");
            }

        });
    });

    //Create a new patient
    app.post("/patients", function (req, res) {
        console.log("Send request >>> " + req);
        // Increment post counter and show the counter
        postCounter++;
        showRequestCount();

        // Get the object in the request body, save and send the response
        var newProduct = req.body;
        patientsSave.create(newProduct, function (error, patient) {
            console.log("Send response <<< " + patient);
            res.status(201).send(patient);
        });
    });

    // Delete all the patients
    app.delete('/patients', function (req, res) {
        console.log("Send request >>>");
        // Increment delete counter and show the counter
        deleteCounter++;
        showRequestCount();

        // delete all the records and send the response.
        patientsSave.deleteMany({}, function (error) {
            console.log("Send response <<< All patients were deleted");
            res.status(200).send("All patients were deleted.");
        });
    });
};

// just print in the log the counters of the requests
function showRequestCount() {
    console.log("Processed Request Count--> sendGet:" + getCounter
        + ", sendPost:" + postCounter
        + ", sendDelete:" + deleteCounter);
}