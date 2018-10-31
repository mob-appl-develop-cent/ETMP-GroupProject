/*
 * express-handler.js Manage all the depencies that the project will use.
 *
 * Developed by Jose Aleixo Araujo Porpino Filho
 * Date: 2018-09-29
 * Version 1.0.0
 */
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = function () {

    // setting the express and set the body parser to use json encode.
    var app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //Consign will look, include and route the folders of the project
    consign()
        .include('controllers')
        .then('persistence')
        .into(app);

    return app;
};