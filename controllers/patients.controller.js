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

module.exports = function (app) {
    app.post('/mongo/patients', function (req, res) {
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


};

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