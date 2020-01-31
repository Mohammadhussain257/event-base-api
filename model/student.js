const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
//Student Schema
let Student = new Schema({
        Student_ID: {
            type: Number
        },
        fullName: {
            type: String,
            require:true,
            trim:true,
            minlength:3,
        },
        email: {
            type: String,
            require:true,
            trim:true
        },
        collegeName: {
            type: String,
            require:true,
            minlength:5,
            trim:true,
        },
        branch: {
            type: String,
            require:true
        },
        year: {
            type: String,
            require:true
        },
        password: {
            type: String,
            require:true,
            minlength:3,
            trim:true
        },
        gender: {
            type: String,
            require: true
        },
        Role: {
            type: String,
            require:true,
}
    });

Student.plugin(autoIncrement, { inc_field: 'Student_ID' }); //auto increment value
module.exports = mongoose.model('Student', Student);
