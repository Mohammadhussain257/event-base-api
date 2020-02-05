/* Student API routes */

const express = require('express'),
    studentController = express.Router(),
    url = require('url');

let Student = require('../model/student');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

//more length of salt means more time require to decrypt make stronger hashing
const saltRounds=10;
//anything could be my secrete
const jwtSecret = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// student signup
studentController.route('/student/signup').post((req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash)=> {
        if (err) {
            res.status(500).send(`Could not hash! ${err}`);
        }
        Student.create({
            fullName: req.body.fullName,
            email: req.body.email,
            collegeName: req.body.collegeName,
            branch: req.body.branch,
            year: req.body.year,
            password:hash,
            gender: req.body.gender,
            profilePicture: req.body.profilePicture,
            Role: req.body.Role,
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

//user login
studentController.route('/student/login').post((req, res, next) => {
    Student.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                res.status(401).send(`User not found ${user}`);
            } else {
                //inbuilt method of bcrypt to compare plain password with hash password
                bcrypt.compare(req.body.password, user.password)
                    .then((isCorrectPassowrd) => {
                        if (!isCorrectPassowrd) {
                            res.status(401).send('Wrong password');
                        }
                        let token = jwt.sign({ _id: user._id }, jwtSecret);
                        res.json({ status: 'Login Successfully', token: token });
                    }).catch(next);
            }
        }).catch(next);
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
