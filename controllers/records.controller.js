/*
 * records.controller.js manage all the records requests and response http methods.
 *
 * Developed by Thayllan Anacleto
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

    //Create a new record by patient id
    app.post("/mongo/patients/:id/records/", function (req, res) {

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
        Patient.findOne({_id: req.params.id}, function (error, obj) {
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
            let record = fillRecordObjectFromReqBody(req);

            if (patient.records == null || patient.records == undefined) {
                patient.records = [record];
                record.id = "1";
            } else {
                console.log(patient.records.length);
                var index = parseInt(patient.records[patient.records.length - 1].id) + 1;
                record.id = index + "";
            }

            //patient.records.push(record);
            console.log(patient.records);

            Patient.update(patient, function (error, patient) {
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

    //Create a new record by patient id
    app.post("/mongo/patients/:id/records2/", function (req, res) {

        console.log("Send request >>>");

        // Increment get counter and show the counter
        postCounter++;
        showRequestCount();

        var reqValidErrors = isRecordsRequestValid(req);
        if (reqValidErrors) {
            res.status(400).send(reqValidErrors);
            return;
        }

        let record = fillRecordObjectFromReqBody(req);

        Patient.findByIdAndUpdate(
            {_id: req.params.id}, {
            $push: {records: record}
        })
        .then(function () {
            var message = "";
            var status = 201;
            if (record != undefined && record != null && record != "") {
                message = record
            } else {
                message = `An error ocurred`;
                status = 500;
            }

            res.status(status).send(message);
            console.log(`Send response <<< ${message}`);
        })
        .then(null, function(err) {
            // Whoops! Something broke. You may want to abort this update.
            console.log("error")
        });

    });

}

function showRequestCount() {
    console.log("Processed Request Count--> GET:" + getCounter
        + ", POST:" + postCounter
        + ", DELETE:" + deleteCounter
        + ", PUT:" + putCounter);
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