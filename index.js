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
app.listen(port, function () {
    console.log("Server is listening at http://127.0.0.1:" + port + "/");
    console.log("Endpoins:");
    console.log("http://127.0.0.1:" + port + "/patients method: GET");
    console.log("http://127.0.0.1:" + port + "/patients method: POST");
    console.log("http://127.0.0.1:" + port + "/patients method: DELETE");
});