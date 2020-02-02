const express = require('express'),
    uploadController = express.Router();
    url = require('url');

const multer = require('multer');
const path = require("path");

let Student  = require('../model/student');
let Organizer = require('../model/organizer');

const storage = multer.diskStorage({
    destination: "./upload/profile/",
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


//get single organizer by id
uploadController.route('/profile/organizer/:id')
    .patch(upload.single('profilePicture'),(req, res) => {
        let organizerId = req.params.id;
    // We want to upload a image to profile in a specified organizer id
    Organizer.findOne({
        Organizer_ID: organizerId
    }).then((organizer) => {
        if (organizer) {
            // organizer object with the specified conditions was found
            return true;
        }
        // else - the organizer object is undefined
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Organizer.findOneAndUpdate({
                Organizer_ID: organizerId,
                profilePicture: req.file.filename
            }).then(() => {
                res.send({ message: 'updated'})
            })
        } else {
            res.sendStatus(404);
        }
    })
});

//get single organizer by id
uploadController.route('/profile/student/:id')
    .patch(upload.single('profilePicture'),(req, res) => {
        let studentId = req.params.id;
        // We want to upload a image to profile in a specified organizer id
        Student.findOne({
            Student_ID: studentId
        }).then((organizer) => {
            if (organizer) {
                // organizer object with the specified conditions was found
                return true;
            }
            // else - the organizer object is undefined
            return false;
        }).then((canUploadImage) => {
            if (canUploadImage) {
                Student.findOneAndUpdate({
                    Student_ID: studentId,
                    profilePicture: req.file.filename
                }).then(() => {
                    res.send({ message: 'updated'})
                })
            } else {
                res.sendStatus(404);
            }
        })
    });


module.exports = uploadController;
