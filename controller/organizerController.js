/* Organizer API routes */

const express = require('express'),
    organizerController = express.Router(),
    url = require('url');

let Organizer = require('../model/organizer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const authenticate = require('../controller/verify');

//more length of salt means more time require to decrypt make stronger hashing
const saltRounds=10;
//anything could be my secrete
const jwtSecret = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// student signup
organizerController.route('/organizer/signup').post((req, res, next) => {
    console.log(req.body);
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash)=> {
        if (err) {
            res.status(500).send(`Could not hash! ${err}`);
        }
        Organizer.create({
            fullName: req.body.fullName,
            email: req.body.email,
            venueName: req.body.venueName,
            password:hash,
            profilePicture:req.body.profilePicture,
            Role: req.body.Role
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

//organizer login
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
                        res.json({ organizerId : user.Organizer_ID, FullName : user.fullName,
                            Email: user.email,Role: user.Role,VenueName: user.velocityAngular,
                            ProfilePicture:user.profilePicture, token: token });
                    }).catch(next);
            }
        }).catch(next);
});

//get all organizer list
organizerController.route('/organizer/get').get(authenticate.verifyOrganizer,(req,res)=>{
    Organizer.find({}).then((organizers)=>{
        res.status(200).json(organizers);
    }).catch((err)=>{
        res.status(400).send(`Could not get organizer list ${err}`);
    });
});

//get single student by id
organizerController.route('/organizer/:id').get(authenticate.verifyOrganizer,(req, res)=> {
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

// update organizer detail
organizerController.route('/update/profile/organizer/:id').patch((req, res) => {
    console.log(req.body);
    let organizerId = req.params.id;
    // update profile detail in a specified student id
    Organizer.findOne({
        Organizer_ID: organizerId
    }).then((organizer) => {
        if (organizer) {
            // organizer object with the specified conditions was found
            return true;
        }
        // else - the organizer object is undefined
        return false;
    }).then((canUpdate) => {
        if (canUpdate) {
            Organizer.findOneAndUpdate({
                fullName: req.body.fullName,
                email: req.body.email,
                venueName: req.body.venueName,
            }).then(() => {
                res.send({ message: 'updated'})
            })
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports = organizerController;
