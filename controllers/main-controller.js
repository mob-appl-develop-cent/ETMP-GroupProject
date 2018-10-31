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
            var message = ""
            var status = 200
            if (patients != undefined && patients != null && patients != "") {
                message = patients
            } else  {
                message = `No records found`
                status = 404
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

        });
    });

    // Get patient by Id
    app.get("/patients/:id", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get first object using query based on the ID
        patientsSave.findOne( {_id : req.params.id} , function (error, patient) {
            var message = ""
            var status = 200
            if (patient != undefined && patient != null && patient != "") {
                message = patient
            } else  {
                status = 404
                message = `No records found`
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

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
            var message = ""
            var status = 201
            if (patient != undefined && patient != null && patient != "") {
                message = patient
            } else {
                message = `An error ocurred`
                status = 500
            }
            
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });

    //Update patient by ID
    app.put("/patients/:id", function (req, res) {
        console.log("Send request >>> " + req);
        // Increment post counter and show the counter
        putCounter++;
        showRequestCount();

        // Get the object in the request body and update the saved object based on ID
        var newPatient = req.body;
        newPatient._id = req.params.id
        patientsSave.update(newPatient, function (error, patient) {
            var message = ""
            var status = 200

            if (patient != undefined && patient != null && patient != "") {
                message = patient
            } else {
                message = `User not found`
                status = 404
            }
            
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
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
            var message = ""
            var status = 200
            if (error == undefined || error == null) {
                message = `All patients were deleted successfully`
            } else  {
                message = `Unexpected error`
                status = 500
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });

    // Delete patient by id
    app.delete('/patients/:id', function (req, res) {
        console.log("Send request >>>");
        // Increment delete counter and show the counter
        deleteCounter++;
        showRequestCount();

        // patientsSave.delete doesnt not return any error even if there is no patients with 
        // the specified ID, so we had to use the findOne() to check if the patient exists
        // before deleting it
        patientsSave.findOne( {_id : req.params.id} , function (error, patient) {
            if (patient != undefined && patient != null && patient != "") { 
                patientsSave.delete(req.params.id, function (error) {
                    res.status(200).send(`Patient ID: ${req.params.id} deleted successfully`);
                    console.log(`Send response <<< Patient ID: ${req.params.id} deleted successfully`);
                });
            } else  {
                res.status(404).send(`No patient found with ID: ${req.params.id}`);
                console.log(`Send response <<< No patient found with ID: ${req.params.id}`);
            }
            

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