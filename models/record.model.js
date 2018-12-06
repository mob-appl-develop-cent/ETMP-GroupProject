const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
    date: {type: String, required: true},
    nurse_name: {type: String, required: true, max: 100},
    type: {type: String, required: true, max: 30},
    category: {type: String, required: true, max: 30},
    details: {type: String, required: true, max: 500}
});

// Export the model
module.exports = mongoose.model('Record', RecordSchema);