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
const host = process.env.HOST || "http://127.0.0.1:"; // Configuration to work in Heroku
const patientsService = host + port + "/patients";
app.listen(port, function () {
    console.log("Server is listening at " + host + port + " / ");
    console.log("Endpoins:");
    console.log(patientsService + " method: GET");
    console.log(patientsService + " method: POST");
    console.log(patientsService + " method: DELETE");
});


app.get("/", function (req, res) {
    res.status(200).send("<h3>Patients:</h3>" +
        "<a href='" + patientsService + "'> " + patientsService + "</a> method: GET <br/> " +
        "<a href='" + patientsService + "'> " + patientsService + "</a> method: POST <br/> " +
        "<a href='" + patientsService + "'> " + patientsService + "</a> method: DELETE <br/> " +
        "<h3>Patients View Records:</h3>");
});
