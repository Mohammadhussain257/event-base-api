/* Events API routes */

const express = require('express'),
    eventController = express.Router(),
    url = require('url');

let Event = require('../model/event');

// add new event
eventController.route('/event/add').post((req, res)=>{
    let newEvent = new Event(req.body);
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

//get single event by id
eventController.route('/event/:id').get((req, res)=> {
    let eventId = req.params.id;
    let eventQuery = Event.findOne({ Event_ID: eventId })
        .populate('Events')
    eventQuery.exec((err, event)=> {
        if (err) {
            res.json(`An error occured ${err}`);
        }
        else {
            res.json(event);
        }
    });
});

//delete signle event by id
eventController.route('/event/delete/:id').get((req, res)=>{
    let eventId = req.params.id;
    console.log(eventId);
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
