/* project API routes */

const express = require('express'),
    eventController = express.Router(),
    url = require('url');

let Events = require('../models/event');

// add new event
eventController.route('/add').post(function (req, res) {
    let event = new Events(req.body);
    event.save()
        .then(project => {
            res.status(200).json({ 'Success': true })
        }).catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Error occured while creating new event' });
        });
});
