/* Events API routes */

const express = require('express'),
    eventController = express.Router(),
    url = require('url');

const multer = require('multer');
const path = require("path");

let Event = require('../model/event');

const storage = multer.diskStorage({
    destination: "./upload/event/",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}${Date.now()}${ext}`);
    }
});

const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("You can upload only image files!"), false);
    }
    callback(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

// add new event
eventController.route('/event/add').post(upload.single('eventImage'),(req, res)=>{
    let newEvent = new Event({
        eventImage: req.file.filename,
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        date: req.body.date,
        Organizer_ID: req.body.Organizer_ID
    });
    newEvent.save().then((newEvent) => {
            res.status(200).json(newEvent)
        }).catch(err => {
            res.status(400).send({ 'Could not create event': err });
        });
});

//get all event list
eventController.route('/event/get').get((req,res)=>{
    Event.find({}).then((events)=>{
        res.status(200).json(events);
    }).catch((err)=>{
        res.status(400).send(`Could not get event list ${err}`);
    });
});

//get single event by id and update
eventController.route('/event/:eventId/organizer/:organizerId')
    .patch(upload.single('eventImage'),(req, res) => {
        let eventId = req.params.eventId
        let organizerId = req.params.organizerId
        // We want to upload a image to event in a specified organizer id
        Event.findOne({
            Event_ID: eventId,
            Organizer_ID:organizerId
        }).then((event) => {
            if (event) {
                // event object with the specified conditions was found
                return true;
            }
            // else - the event object is undefined
            return false;
        }).then((canUpdate) => {
            if (canUpdate) {
                Event.findOneAndUpdate({
                    eventImage: req.file.filename,
                    eventName: req.body.eventName,
                    eventDescription: req.body.eventDescription,
                    date: req.body.date
                }).then(() => {
                    res.send({ message: 'updated'})
                })
            } else {
                res.sendStatus(404);
            }
        })
    });

//get all events by organizer id
eventController.route('/organizer/events/:id').get((req,res)=>{
    let organizerId = req.params.id;
    Event.find({Organizer_ID: organizerId}).then((events)=>{
        res.status(200).json(events);
    })
        .catch((err)=>{
            res.status(400).json('Cannot find event by organizer id');
        })
});
// get single event by event id
eventController.route('/get/event/:id').get((req, res)=>{
    let eventId = req.params.id;
    Event.find({ Event_ID: eventId }).then((events)=>{
        res.status(200).json(events);
    })
        .catch((err)=>{
            res.status(400).json('Cannot find event by organizer id');
        })
});

//delete signle event by id
eventController.route('/event/delete/:id').delete((req, res)=>{
    let eventId = req.params.id;
    Event.find({ Event_ID: eventId }).remove((err, event)=> {
        if (err) {
            res.json('Event not found');
        }
        else{
            res.json('Event deleted Successfully');
        }
    });
});

module.exports = eventController;
