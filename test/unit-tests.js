var mongoose = require("mongoose");
var Patient = require('../models/patient.model');

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