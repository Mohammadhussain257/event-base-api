const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Event Schema
let Events = new Schema({
    Event_ID: {
        type: Number
    },
    eventImage: {
        type: String,
        require:true,
    },
    eventName: {
        type: String,
        require:true,
        minlength:3,
        trim:true,
    },
    eventDescription: {
        type: String,
        require:true,
        minlength:5,
        trim:true,
    },
    date: {
        type: Date,
        default: null,
    }
});

Events.plugin(autoIncrement, { inc_field: 'Event_ID' }); //auto increment value
module.exports = mongoose.model('Events', Events);
