/*
 * index.js file that will start the server.
 *
 * Developed by Jose Aleixo Araujo Porpino Filho
 * Student ID:
 * Date: 2018-09-29
 * Version 1.0.0
 */
const app = require('./config/express-handler')();
const port = process.env.PORT || 3000; // Configuration to work in Heroku
const host = process.env.HOST || "http://127.0.0.1"; // Configuration to work in Heroku
const patientsService = host + (port === 3000 ? ':' + port : '') + "/patients";
const recordsService = host + (port === 3000 ? ':' + port : '') + "/patients/:id/records/";

//Just an example how to connect in mongodb cloud
// Set up mongoose connection
const mongoose = require('mongoose');
module.exports = mongoose;
let dev_db_url = 'mongodb://admin:group3noobJS@ds037997.mlab.com:37997/etmp-group-project-noobjs';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("DB Connection established");
});


app.listen(port, function () {
    console.log("Server is listening at " + patientsService + "/");
    console.log("Endpoints:");
    console.log(patientsService + " methods: GET, POST, DELETE");
    console.log(patientsService + "/:id methods GET, PUT, DELETE");
    console.log(recordsService + " method: GET, POST");
});


app.get("/", function (req, res) {
    res.status(200).send("<h2>Endpoints</h2><h3>Patients:</h3>" +
        "<a target='_blank' href='" + patientsService + "'>" + patientsService + "</a> method: GET <br/>" +
        patientsService + " method: POST <br/>" +
        patientsService + " method: DELETE <br/>" +
        "<h3>Patients View Records:</h3>");
});
/*
var SERVER_NAME = 'patients-api';
var restify = require('restify');
//make restify server
server = restify.createServer({ name: SERVER_NAME });

server.listen(port, function () {
    console.log("Server stared at %s", server.url);
});
//server configs
server.use(restify.fullResponse());
server.use(restify.bodyParser());

var Patients = require('../models/patient.model');

//******************* GET **********************

// GET Patients list
//results format: first_name last_name
server.get('/patients', function (req, res, next) {
    Patients.
    find({}).
    select('first_name last_name').
    exec (function (err, patients) {
        res.send(patients);
    });
    next();
});

//GET patient by id
server.get('/patients/:id', function (req,res, next) {
    Patients.
    findOne({ _id: req.params.id }).
    select('first_name last_name').
    exec (function (err, patient) {
        res.send(patient);
    });
    next();
});
*/

