// var mongoose = require("mongoose");
// var Patient = require('../models/patient.model');
// var Record = require('../models/record.model');

//Provide Test Dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
//var should = chai.should();
var testPatientID = ""

chai.use(chaiHttp);

//Create a new patient
describe('/POST Patient', function() {
    var patient = {
        first_name: "Mike"
    };
    it('This method should NOT POST patient without all the required fields', function(done)  {
        chai.request(server)
            .post('/patients')
            .send(patient)
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/POST Patient', function () {
    var patient = {
        first_name: "Mike",
        last_name: "Robert",
        age: 32,
        address: "177 Rockwood",
        room_number: "109",
        emergency_number: "652376437",
        department: "Medical",
        doctor: "Johnson"
    };
    it('This method should POST a patient when all fields are supplied', function (done) {
       chai.request(server)
           .post('/patients')
           .send(patient)
           .end(function (err, res) {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('first_name').eql(patient.first_name);
               res.body.should.have.property('last_name').eql(patient.last_name);
               res.body.should.have.property('age').eql(patient.age);
               res.body.should.have.property('address').eql(patient.address);
               res.body.should.have.property('room_number').eql(patient.room_number);
               res.body.should.have.property('emergency_number').eql(patient.emergency_number);
               res.body.should.have.property('department').eql(patient.department);
               res.body.should.have.property('doctor').eql(patient.doctor);
               testPatientID = res.body._id
               done();
           })
    });
});

//Test for Get all the patients
describe('/GET Patients', function() {
    it('This method should GET all the patients', function(done)  {
    chai.request(server)
        .get('/patients')
        .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

//Test for Unuccessful Get Patient by Id
describe('/Get Patients', function () {
    var patientId = '666';
   it('This method should NOT GET the patient object without a valid PatientID', function (done) {
       chai.request(server)
           .get('/patients/' + patientId)
           .end(function (err,res) {
               res.should.have.status(404);
               res.body.should.be.a('object');
               done();
           });
   });
});

//Test for Successful Get Patient by Id
describe('/Get Patients', function () {
    var patientId = testPatientID;
    it('This method should GET patient object with a valid PatientID', function (done) {
        chai.request(server)
            .get('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

// //Update patient by ID
// describe('/PUT Patient Status', function () {
//     var patientId = 'abc';
//     it('This method should NOT update a patient status without valid Patient ID', function (done) {
//         chai.request(server)
//             .put('/patients/' + patientId)
//             .end(function (err,res) {
//                 res.should.have.status(500);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('code').eql('InternalError');
//                 done();
//             });
//     });
// });

// describe('/PUT Patient', function () {
//     var patientId = testPatientID;
//     it('This method should update a patient status with valid Patient ID', function (done) {
//         chai.request(server)
//             .put('/patients/' + patientId)
//             .end(function (err,res) {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 //res.body.should.have.property('doctor').eql('ToBeTerminated');
//                 done();
//             });
//     });
// });

// //Create a new record by patient id
// describe('/POST Record', function() {
//     var patientId = 'abc';
//     var record = new Record({
//         date:"2018/12/10", 
//         nurse_name: "Ratchet", 
//         type: "type", 
//         category: "category", 
//         details: "details"
//     });
//     it('This method should NOT POST a new record without valid Patient ID', function(done)  {
//         chai.request(server)
//             .post('/patients/' + patientId + '/records')
//             .send(record)
//             .end(function (err, res) {
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 done();
//             });
//     });
// });

// describe('/POST Record', function() {
//     var patientId = testPatientID;
//     var record = new Record ({
//         date: "17/01/1995"
//     });
//     it('This method should NOT POST a new record without one of the required fields', function(done)  {
//         chai.request(server)
//             .post('/patients/' + patientId + '/records')
//             .send(record)
//             .end(function (err, res) {
//                 console.log(testPatientID)
//                 res.should.have.status(400);
//                 res.body.should.be.a('array');
//                 done();
//             });
//     });
// });

// describe('/POST Record', function() {
//     var patientId = testPatientID;
//     var record = new Record ({
//         date: "17/01/1995", 
//         nurse_name: "Ratchet", 
//         type: "unit test", 
//         category: "testing", 
//         details: "Running unit tests"
//     });
//     it('This method should POST a new record with all required fields and valid Patient ID', function(done)  {
//         chai.request(server)
//             .post('/patients/' + patientId + '/records')
//             .send(record)
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 done();
//             });
//     });
// });

// Delete patient by id
describe('/Delete Patient', function () {
    var patientId = 'abc';
    it('This method should NOT delete a patient without a valid Patient ID', function (done) {
        chai.request(server)
            .del('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(404);
                done();
            });
    });
});

describe('/Delete Patient', function () {
    var patientId = testPatientID;
    it('This method should delete a patient with a valid Patient ID', function (done) {
        chai.request(server)
            .del('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

