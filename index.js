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
app.listen(port, function () {
    console.log("Server is listening at " + patientsService + "/");
    console.log("Endpoins:");
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
