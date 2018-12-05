/*
 * patients.controller.js manage all the patients requests and response http methods.
 *
 * Developed by Jose Aleixo Araujo Porpino Filho
 * Date: 2018-11-21
 * Version 1.0.0
 */
var getCounter = 0;
var postCounter = 0;
var deleteCounter = 0;
var putCounter = 0;

const Patient = require('../models/patient.model');
const Record = require('../models/record.model');

module.exports = function (app) {

    // #region Patient Methods

    // Get all the patients
    app.get("/patients", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        Patient.find({})
        // .populate('records')
        .exec(function (error, patients) {
            var message = "";
            var status = 200;
            if (patients != undefined && patients != null && patients != "") {
                message = patients
            } else {
                message = `No patients found`;
                status = 404;
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });

    //Get patient by ID
    app.get("/patients/:id", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get first object using query based on the ID
        Patient.findOne({_id: req.params.id})
        .populate('records')
        .exec(function (error, patient) {
            var message = "";
            var status = 200;
            if (patient != undefined && patient != null && patient != "") {
                message = patient
            } else {
                status = 404;
                message = `No records found`
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

        });

    });

    //Create a new patient
    app.post('/patients', function (req, res) {
        console.log("Send request >>> " + req);
        // Increment post counter and show the counter
        postCounter++;
        showRequestCount();

        let reqValidErrors = isPatientRequestValid(req);
        if (reqValidErrors) {
            res.status(400).send(reqValidErrors);
            return;
        }
        let patient = fillPatientObjectFromReqBody(req);

        patient.save(function (err, obj) {
            let message = "";
            let status = 201;
            console.log(err, obj);
            //TODO: Get the err variable and try t catch the error correctly, 'cause ot shows all the error validation, so, our validation is not necessary.
            if (obj != undefined && obj != null && obj != "") {
                message = obj
            } else {
                message = `An error ocurred`;
                status = 500;
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
        newPatient._id = req.params.id;
        Patient.update(newPatient, function (error, patient) {
            var message = "";
            var status = 200;

            if (patient != undefined && patient != null && patient != "") {
                message = patient
            } else {
                message = `User not found`;
                status = 404;
            }

            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });

    // Delete all the patients
    app.delete("/patients", function (req, res) {
        console.log("Send request >>>");
        // Increment delete counter and show the counter
        deleteCounter++;
        showRequestCount();

        // delete all the records and send the response.
        Patient.deleteMany({}, function (error) {
            var message = "";
            var status = 200;
            if (error == undefined || error == null) {
                message = `All patients were deleted successfully`
            } else {
                message = `Unexpected error`
                status = 500
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        });
    });

    // Delete patient by id
    app.delete("/patients/:id", function (req, res) {
        console.log("Send request >>>");
        // Increment delete counter and show the counter
        deleteCounter++;
        showRequestCount();

        // Patient.delete doesnt not return any error even if there is no patients with 
        // the specified ID, so we had to use the findOne() to check if the patient exists
        // before deleting it
        Patient.findOne({_id: req.params.id}, function (error, patient) {
            if (patient != undefined && patient != null && patient != "") {
                Patient.findByIdAndDelete(req.params.id, function (error) {
                    res.status(200).send(`Patient ID: ${req.params.id} deleted successfully`);
                    console.log(`Send response <<< Patient ID: ${req.params.id} deleted successfully`);
                });
            } else {
                res.status(404).send(`No patient found with ID: ${req.params.id}`);
                console.log(`Send response <<< No patient found with ID: ${req.params.id}`);
            }


        });
    });

    // #endregion

    // #region Records Methods

    // Get all the records by patient id
    app.get("/patients/:id/records/", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        Patient.findOne({_id: req.params.id}, function (error, patient) {
            var message = "";
            var status = 200;

            if (patient != undefined && patient != null && patient != "") {
                if (patient.records != undefined && patient.records != null) {
                    message = patient.records;
                } else {
                    message = `No records found`;
                    status = 404
                }
            } else {
                message = `There are no patients with the ID provided`;
                status = 404
            }

            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

        });
    });

    // Get specific record by patient and record id
    app.get("/patients/:id/records/:rid", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        Patient.findOne({_id: req.params.id}, function (error, patient) {
            var message = "";
            var status = 200;
            if (patient != undefined && patient != null && patient != "") {
                if (patient.records != undefined && patient.records != null) {
                    var recordFound = false;
                    patient.records.forEach(function (element, index) {
                        if (element[0]._id == req.params.rid) {
                            message = patient.records[index];
                            recordFound = true;
                        }
                    });
                    if (!recordFound) {
                        message = `No record with this id was found.`;
                        status = 404;
                    }
                } else {
                    message = `No records found`;
                    status = 404
                }
            } else {
                message = `No records found`;
                status = 404
            }
            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

        });
    });

    //Create a new record by patient id
    app.post("/patients/:id/records/", function (req, res) {

        console.log("Send request >>>");

        // Increment get counter and show the counter
        postCounter++;
        showRequestCount();

        var reqValidErrors = isRecordsRequestValid(req);
        if (reqValidErrors) {
            res.status(400).send(reqValidErrors);
            return;
        }

        var record = fillRecordObjectFromReqBody(req);
        
        Patient.findOne({_id: req.params.id})
        .exec(function (error, patient) {
            var message = "";
            var status = 200;
            if (patient != undefined && patient != null && patient != "") {
                patient.records.push(record)
                patient.save()
                message = record
            } else {
                status = 404;
                message = `Patient not found`
            }

            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);

        });

        // #endregion

    });

};

// #region Other Methods

function showRequestCount() {
    console.log("Processed Request Count--> GET:" + getCounter
        + ", POST:" + postCounter
        + ", DELETE:" + deleteCounter
        + ", PUT:" + putCounter);
}

function isPatientRequestValid(req) {
    req.assert("first_name", "Field 'first name' is required!").notEmpty();
    req.assert("last_name", "Field 'last_name' is required!").notEmpty();
    req.assert("age", "Field 'age' is required!").notEmpty();
    req.assert("age", "Field 'age' must be an integer").isInt();
    req.assert("address", "Field 'address' is required!").notEmpty();
    req.assert("room_number", "Field 'room_number' is required!").notEmpty();
    req.assert("emergency_number", "Field 'emergency_number' is required!").notEmpty();
    req.assert("department", "Field 'department' is required!").notEmpty();
    req.assert("doctor", "Field 'doctor' is required!").notEmpty();

    return req.validationErrors();
}

function fillPatientObjectFromReqBody(req) {
    return new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        address: req.body.address,
        room_number: req.body.room_number,
        emergency_number: req.body.emergency_number,
        department: req.body.department,
        doctor: req.body.doctor
    });
}

function isRecordsRequestValid(req) {
    req.assert("date", "Field 'date' is required!").notEmpty();
    req.assert("nurse_name", "Field 'nurse_name' is required!").notEmpty();
    req.assert("type", "Field 'type' is required!").notEmpty();
    req.assert("category", "Field 'category' is required!").notEmpty();
    req.assert("details", "Field 'details' is required!").notEmpty();

    return req.validationErrors();
}

function fillRecordObjectFromReqBody(req) {
    return new Record({
        date: req.body.date,
        nurse_name: req.body.nurse_name,
        type: req.body.type,
        category: req.body.category,
        details: req.body.details
    });
}

// #endregion