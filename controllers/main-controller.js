/*
 * main-controller.js manage all the requests and response http methods.
 *
 * Developed by Jose Aleixo Araujo Porpino Filho
 * Date: 2018-09-29
 * Version 1.0.0
 */
//const patientsSave = require(`save`)(`patients`);
var getCounter = 0;
var postCounter = 0;
var deleteCounter = 0;
var putCounter = 0;

module.exports = function (app) {
/*
    //PATIENTS

    // Get all the patients
    app.get("/patients", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.find({}, function (error, patients) {
            var message = "";
            var status = 200;
            if (patients != undefined && patients != null && patients != "") {
                message = patients
            } else {
                message = `No records found`;
                status = 404;
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
        patientsSave.findOne({_id: req.params.id}, function (error, patient) {
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
    app.post("/patients", function (req, res) {
        console.log("Send request >>> " + req);
        // Increment post counter and show the counter
        postCounter++;
        showRequestCount();

        // Get the object in the request body, save and send the response
        var newPatient = req.body;

        var reqValidErrors = isPatientRequestValid(req);
        if (reqValidErrors) {
            res.status(400).send(reqValidErrors);
            return;
        }

        patientsSave.create(newPatient, function (error, patient) {
            var message = "";
            var status = 201;
            if (patient != undefined && patient != null && patient != "") {
                message = patient
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
        patientsSave.update(newPatient, function (error, patient) {
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
        patientsSave.deleteMany({}, function (error) {
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

        // patientsSave.delete doesnt not return any error even if there is no patients with 
        // the specified ID, so we had to use the findOne() to check if the patient exists
        // before deleting it
        patientsSave.findOne({_id: req.params.id}, function (error, patient) {
            if (patient != undefined && patient != null && patient != "") {
                patientsSave.delete(req.params.id, function (error) {
                    res.status(200).send(`Patient ID: ${req.params.id} deleted successfully`);
                    console.log(`Send response <<< Patient ID: ${req.params.id} deleted successfully`);
                });
            } else {
                res.status(404).send(`No patient found with ID: ${req.params.id}`);
                console.log(`Send response <<< No patient found with ID: ${req.params.id}`);
            }


        });
    });

    // RECORDS

    // Get all the records by patient id
    app.get("/patients/:id/records/", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        getCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.findOne({_id: req.params.id}, function (error, patient) {
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
        patientsSave.findOne({_id: req.params.id}, function (error, patient) {
            var message = "";
            var status = 200;
            if (patient != undefined && patient != null && patient != "") {
                if (patient.records != undefined && patient.records != null) {
                    var recordFound = false;
                    patient.records.forEach(function (element, index) {
                        if (element.id == req.params.rid) {
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
        //Get all the objects saved before.
        patientsSave.findOne({_id: req.params.id}, function (error, obj) {
            var message = "";
            var status = 200;
            if (obj == undefined || obj == null && obj || "") {
                message = `No records found`;
                status = 404;
                res.status(status).send(message);
                console.log(`Send response <<< ${message}`);
                return;
            }

            var patient = obj;
            var record = req.body;
            if (patient.records == null || patient.records == undefined) {
                patient.records = [];
                record.id = "1";
            } else {
                console.log(patient.records.length);
                var index = parseInt(patient.records[patient.records.length - 1].id) + 1;
                record.id = index + "";
            }

            patient.records.push(record);

            patientsSave.update(patient, function (error, patient) {
                var message = "";
                var status = 201;
                if (patient != undefined && patient != null && patient != "") {
                    message = patient
                } else {
                    message = `An error ocurred`;
                    status = 500;
                }

                res.status(status).send(message);
                console.log(`Send response <<< ${message}`);
            });
        });

    });

    //Update a record by patient and record id
    app.put("/patients/:id/records/:rid", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        putCounter++;
        showRequestCount();

        var reqValidErrors = isRecordsRequestValid(req);
        if (reqValidErrors) {
            res.status(400).send(reqValidErrors);
            return;
        }
        //Get all the objects saved before.
        patientsSave.findOne({_id: req.params.id}, function (error, obj) {
            var message = "";
            var status = 200;
            if (obj != undefined && obj != null && obj != "") {
                message = obj;
            } else {
                message = `No patient found`;
                status = 404;
                res.status(status).send(message);
                return;
            }

            var patient = obj;
            var record = req.body;
            if (patient.records == null || patient.records == undefined) {
                message = `No records was found`;
                status = 404;
                res.status(status).send(message);
                return;
            } else {
                var recordFound = false;
                patient.records.forEach(function (element, index) {
                    console.log(element);
                    if (element.id == req.params.rid) {
                        record.id = req.params.rid;
                        patient.records[req.params.rid - 1] = record;
                        recordFound = true;
                    }
                });
                if (!recordFound) {
                    message = `No record with this id was found.`;
                    status = 404;
                    res.status(status).send(message);
                    return;
                }

            }

            patientsSave.update(patient, function (error, patient) {
                var message = "";
                var status = 201;
                if (patient != undefined && patient != null && patient != "") {
                    message = patient
                } else {
                    message = `An error ocurred`;
                    status = 500;
                }

                res.status(status).send(message);
                console.log(`Send response <<< ${message}`);
            });
        });
    });

    //Delete a record by patient and record id
    app.delete("/patients/:id/records/:rid", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        deleteCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.findOne({_id: req.params.id}, function (error, obj) {
            var message = "";
            var status = 200;
            if (obj != undefined && obj != null && obj != "") {
                message = obj;
            } else {
                message = `No patient found`;
                status = 404;
                res.status(status).send(message);
                return;
            }

            var patient = obj;
            if (patient.records == null || patient.records == undefined) {
                message = `No records was found`;
                status = 404;
                res.status(status).send(message);
                return;
            } else {
                var recordFound = false;
                patient.records.forEach(function (element, index) {
                    if (element.id == req.params.rid) {
                        patient.records.splice(index, 1);
                        recordFound = true;
                    }
                });
                if (!recordFound) {
                    message = `No record with this id was found.`;
                    status = 404;
                    res.status(status).send(message);
                    return;
                }
            }

            patientsSave.update(patient, function (error, patient) {
                var message = "";
                var status = 201;
                if (patient != undefined && patient != null && patient != "") {
                    message = patient
                } else {
                    message = `An error ocurred`;
                    status = 500;
                }

                res.status(status).send(message);
                console.log(`Send response <<< ${message}`);
            });
        });
    });

    //Delete all patient's records by patient id
    app.delete("/patients/:id/records", function (req, res) {
        console.log("Send request >>>");
        // Increment get counter and show the counter
        deleteCounter++;
        showRequestCount();

        //Get all the objects saved before.
        patientsSave.findOne({_id: req.params.id}, function (error, obj) {
            var message = "";
            var status = 200;
            if (obj != undefined && obj != null && obj != "") {
                message = obj;
            } else {
                message = `No patient found`;
                status = 404;
                res.status(status).send(message);
                return;
            }

            var patient = obj;
            if (patient.records == null || patient.records == undefined) {
                message = `No records was found`;
                status = 404;
                res.status(status).send(message);
                return;
            } else {
                patient.records = null;
            }

            patientsSave.update(patient, function (error, patient) {
                var message = "";
                var status = 201;
                if (patient != undefined && patient != null && patient != "") {
                    message = patient
                } else {
                    message = `An error ocurred`;
                    status = 500;
                }

                res.status(status).send(message);
                console.log(`Send response <<< ${message}`);
            });
        });
    });

    */
};

// just print in the log the counters of the requests
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

function isRecordsRequestValid(req) {
    req.assert("date", "Field 'date' is required!").notEmpty();
    req.assert("nurse_name", "Field 'nurse_name' is required!").notEmpty();
    req.assert("type", "Field 'type' is required!").notEmpty();
    req.assert("category", "Field 'category' is required!").notEmpty();
    req.assert("details", "Field 'details' is required!").notEmpty();

    return req.validationErrors();
}