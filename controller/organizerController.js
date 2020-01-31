/* Organizer API routes */

const express = require('express'),
    organizerController = express.Router(),
    url = require('url');

let Organizer = require('../model/organizer');

// organizer signup
organizerController.route('/organizer/signup').post((req, res)=>{
    let newOrganizer = new Organizer(req.body);
    newOrganizer.save().then((newOrganizer) => {
        res.status(200).json(newOrganizer)
    }).catch((err) => {
        res.status(400).send({ 'Could not signup': err });
    });
});

//get all student list
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
