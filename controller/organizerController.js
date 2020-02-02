/* Organizer API routes */

const express = require('express'),
    organizerController = express.Router(),
    url = require('url');

let Organizer = require('../model/organizer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

//more length of salt means more time require to decrypt make stronger hashing
const saltRounds=10;
//anything could be my secrete
const jwtSecret = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// student signup
organizerController.route('/organizer/signup').post((req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash)=> {
        if (err) {
            res.status(500).send(`Could not hash! ${err}`);
        }
        Organizer.create({
            fullName: req.body.fullName,
            email: req.body.email,
            venueName: req.body.venueName,
            Role: req.body.Role,
            password:hash,
            profilePicture:req.body.profilePicture
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

//user login
organizerController.route('/organizer/login').post((req, res, next) => {
    Organizer.findOne({ email: req.body.email })
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

//get all organizer list
organizerController.route('/organizer/get').get((req,res)=>{
    Organizer.find({}).then((organizers)=>{
        res.status(200).json(organizers);
    }).catch((err)=>{
        res.status(400).send(`Could not get organizer list ${err}`);
    });
});

//get single student by id
organizerController.route('/organizer/:id').get((req, res)=> {
    let organizerId = req.params.id;
    let organizerQuery = Organizer.findOne({ Organizer_ID: organizerId })
        .populate('Organizer');
    organizerQuery.exec((err, organizer)=> {
        if (err) {
            res.json(`No organizer found with id ${organizerId}`)
        }
        else {
            res.json(organizer);
        }
    });
});

module.exports = organizerController;
