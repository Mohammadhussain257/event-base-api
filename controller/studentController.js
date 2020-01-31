/* Student API routes */

const express = require('express'),
    studentController = express.Router(),
    url = require('url');

let Student = require('../model/student');

// student signup
studentController.route('/student/signup').post((req, res)=>{
    let newStudent = new Student(req.body);
    newStudent.save().then((newStudent) => {
        res.status(200).json(newStudent)
    }).catch((err) => {
        res.status(400).send({ 'Could not signup': err });
    });
});

//get all student list
studentController.route('/student/get').get((req,res)=>{
    Student.find({}).then((students)=>{
        res.status(200).json(students);
    }).catch((err)=>{
        res.status(400).send(`Could not get student list ${err}`);
    });
});

//get single student by id
studentController.route('/student/:id').get((req, res)=> {
    let studentId = req.params.id;
    let studentQuery = Student.findOne({ Student_ID: studentId })
        .populate('Student');
    studentQuery.exec((err, student)=> {
        if (err) {
            res.json(`An error occured ${err}`)
        }
        else {
            res.json(student);
        }
    });
});

module.exports = studentController;
