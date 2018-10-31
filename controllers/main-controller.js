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
var putCounter = 0;
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

    // Get patient by Id
    app.get("/patients/:id", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.findOne( {_id : req.params.id} , function (error, patient) {
            console.log(patient == "");
            console.log("Send response <<<");
            if (patient != null && patient != "") {
                res.status(200).send(patient);
            } else {
                res.status(404).send("No records found");
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
        var newPatient = req.body;
        patientsSave.create(newPatient, function (error, patient) {
            console.log("Send response <<< " + patient);
            res.status(201).send(patient);
        });
    });

    //Update patient by ID
    app.put("/patients/:id", function (req, res) {
        console.log("Send request >>> " + req);
        // Increment post counter and show the counter
        putCounter++;
        showRequestCount();

        // Get the object in the request body, save and send the response
        var newPatient = req.body;
        newPatient._id = req.params.id
        patientsSave.update(newPatient, function (error, patient) {
            console.log("Send response <<< " + patient);
            res.status(200).send(patient);
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

    // Delete patient by id
    app.delete('/patients/:id', function (req, res) {
        console.log("Send request >>>");
        // Increment delete counter and show the counter
        deleteCounter++;
        showRequestCount();

        // delete all the records and send the response.
        patientsSave.delete(req.params.id, function (error) {
            var message = ""
            var status = 200
            if (error != null) {
                message = `No patient found with ID: ${req.params.id}`
                status = 404
            } else  {
                message = `Patient under ID: ${req.params.id} deleted successfully`
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });
};

// just print in the log the counters of the requests
function showRequestCount() {
    console.log("Processed Request Count--> GET:" + getCounter
        + ", POST:" + postCounter
        + ", DELETE:" + deleteCounter
        + ", PUT:" + putCounter);
}