const Student = require('../model/student');
const Organizer = require('../model/organizer');
const jwt = require('jsonwebtoken');
const jwtSecret = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// check whether the request has a valid JWT access token
module.exports = {
    verifyStudent: (req, res, next) => {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            let err = new Error("Bearer token is not set");
            err.status = 401;
            return next(err);
        }
        let token = authHeader.split(' ')[1];
        let data;
        try {
            data = jwt.verify(token, jwtSecret);
        } catch (err) {
            throw new Error('Token verification failed');
        }
        Student.findById(data.Student_ID)
            .then((user) => {
                req.user = user;
                next();
            })
    }
    ,
    verifyOrganizer: (req, res, next) => {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            let err = new Error("Bearer token is not set");
            err.status = 401;
            return next(err);
        }
        let token = authHeader.split(' ')[1];
        let data;
        try {
            data = jwt.verify(token, jwtSecret);
        } catch (err) {
            throw new Error('Token verification failed');
        }
        Organizer.findById(data.Organizer_ID)
            .then((user) => {
                req.user = user;
                next();
            })
    }
};
