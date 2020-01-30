/* Events API routes */

const express = require('express'),
    eventController = express.Router(),
    url = require('url');

let Event = require('../model/event');

// add new event
eventController.route('/add').post(function (req, res) {
    let newEvent = new Event(req.body);
    newEvent.save().then(newEvent => {
            res.status(200).json(newEvent)
        }).catch(err => {
            res.status(400).send({ 'Could not create event': err });
        });
});

module.exports = eventController;
