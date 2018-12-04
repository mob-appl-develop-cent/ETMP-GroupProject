const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    date: {type: Date, required: true},
    nurse_name: {type: String, required: true, max: 100},
    type: {type: String, required: true, max: 30},
    category: {type: String, required: true, max: 30},
    details: {type: String, required: true, max: 500},
    patient: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }]
});

// Export the model
module.exports = mongoose.model('Record', RecordSchema);