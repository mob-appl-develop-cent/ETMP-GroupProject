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