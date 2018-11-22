const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PatientSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('Patient', PatientSchema);