
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
//Organizer Schema
let Organizer = new Schema({
    Organizer_ID:{
        type:Number
    },
    fullName: {
        type: String,
        require:true,
        minlength:3,
        trim:true
    },
    email:{
        type:String,
        require: true,
        trim: true
    },
    venueName:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    role:{
        type:String,
        require:true
    }
});

Organizer.plugin(autoIncrement,{inc_field: 'Organizer_ID' });//auto increment value
module.exports = mongoose.model('Organizer',Organizer);
