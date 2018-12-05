const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PatientSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    room_number: {type: String, required: true},
    emergency_number: {type: String, required: true},
    department: {type: String, required: true},
    doctor: {type: String, required: true},
    records: { type: mongoose.Schema.Types.Array, ref: 'Record' }
});

// Export the model
module.exports = mongoose.model('Patient', PatientSchema);