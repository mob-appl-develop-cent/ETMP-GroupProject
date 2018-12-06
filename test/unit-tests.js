var mongoose = require("mongoose");
var Patient = require('../models/patient.model');
var Record = require('../models/record.model');

//Provide Test Dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

//Test for Get all the patients
describe('/GET Patients', function() {
    it('it should GET all the Patients', function(done)  {
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
   it('it should NOT GET Patient Object without valid PatientID', function (done) {
       chai.request(server)
           .get('/patients/' + patientId)
           .end(function (err,res) {
               res.should.have.status(500);
               res.body.should.be.a('object');
               res.body.should.have.property('code').eql('InternalError');
               done();
           });
   });
});
//Test for Successful Get Patient by Id
//TODO: put a valid user id here
describe('/Get Patients', function () {
    var patientId = '584bc9ba420a6b189c510af6';
    it('it should GET Patient Object with valid PatientID', function (done) {
        chai.request(server)
            .get('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

//Create a new patient
describe('/POST Patient', function() {
    var patient = {
        first_name: "Mike",
    };
    it('it should NOT POST Patient without all the parameters', function(done)  {
        chai.request(server)
            .post('/patients')
            .send(patient)
            .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql('InternalError');
                done();
            });
    });
});

describe('/POST Patient', function () {
    var patient = {
        first_name: "Mike",
        last_name: "Robert",
        age: "32",
        address: "177 Rockwood",
        room_number: "109",
        emergency_number: "652376437",
        department: "Medical",
        doctor: "Johnson"
    };
    it('it should POST Patient when all fields are supplied', function (done) {
       chai.request(server)
           .post('/patients')
           .send(patient)
           .end(function (err, res) {
               res.should.have.status(201);
               res.body.should.be.a('object');
               res.body.should.have.property('first_name').eql(patient.first_name);
               res.body.should.have.property('last_name').eql(patient.last_name);
               res.body.should.have.property('age').eql(patient.age);
               res.body.should.have.property('address').eql(patient.address);
               res.body.should.have.property('room_number').eql(patient.room_number);
               res.body.should.have.property('emergency_number').eql(patient.emergency_number);
               res.body.should.have.property('department').eql(patient.department);
               res.body.should.have.property('doctor').eql(patient.doctor);
               done();
           })
    });
});



//Update patient by ID
describe('/PUT Patient Status', function () {
    var patientId = 'abc';
    it('it should NOT Update Patient status without valid Patient ID', function (done) {
        chai.request(server)
            .put('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql('InternalError');
                done();
            });
    });
});

describe('/PUT Patient', function () {
    var patientId = '584bc9ba420a6b189c510af6';
    it('it should Update Patient status with valid Patient ID', function (done) {
        chai.request(server)
            .put('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('doctor').eql('ToBeTerminated');
                done();
            });
    });
});

// Delete patient by id
describe('/Delete Patient', function () {
    var patientId = 'abc';
    it('it should NOT Delete Patient without valid Patient ID', function (done) {
        chai.request(server)
            .del('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(204);
                done();
            });
    });
});

describe('/Delete Patient', function () {
    var patientId = '584bc9ba420a6b189c510af6';
    it('it should Delete Patient if all info is correct', function (done) {
        chai.request(server)
            .del('/patients/' + patientId)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(patientId);
                done();
            });
    });
});

//Create a new record by patient id
describe('/POST Record', function() {
    var patientId = 'abc';
    var record = new Record({date:"2018/12/10", nurse_name: "Ratchet", type: "type", category: "category", details: "details"});
    it('it should NOT POST Record without valid Patient ID', function(done)  {
        chai.request(server)
            .post('/patients/' + patientId + '/records')
            .send(record)
            .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql('InternalError');
                done();
            });
    });
});

describe('/POST Record', function() {
    var patientId = '584bc9ba420a6b189c510af6';
    it('it should NOT POST Record without one of the required parameters', function(done)  {
        chai.request(server)
            .post('/patients/' + patientId + '/records')
            .send({date: '2018/12/10'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('code').eql('InternalError');
                done();
            });
    });
});

describe('/POST Record', function() {
    var patientId = '584bc9ba420a6b189c510af6';
    it('it should POST Record with all required fields and valid Patient ID', function(done)  {
        chai.request(server)
            .post('/patients/' + patientId + '/records')
            .send({date:"2018/12/10", nurse_name: "Ratchet", type: "type", category: "category", details: "details"})
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
});

