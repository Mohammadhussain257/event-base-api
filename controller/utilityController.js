const express = require('express'),
    utilityController = express.Router();
url = require('url');
const Student =  require('../model/student');
let LikeShare = require('../model/likeshare');

/*utilityController.route('/like/:id').patch((req,res)=>{
    const studentId = req.params.id;
    let likes = 0;
    let like = new LikeShare({like: likes+1});
    like.updateOne().then((newLike) => {
        res.status(200).json(newLike)
    }).catch(err => {
        res.status(400).send(err);
    });
});*/


/*utilityController.route('/like/:id').patch((req, res) => {
        let studentId = req.params.id;
        Student.findOne({
            Student_ID: studentId
        }).then((like) => {
            if (like) {
                return true;
            }
            return false;
        }).then((canUpdate) => {
            if (canUpdate) {
                LikeShare.findOneAndUpdate({$inc:{like: 1}}).then(() => {
                    res.send({ message: 'updated'})
                    console.log(likes);
                })
            } else {
                res.sendStatus(404);
            }
        })
    });*/
module.exports = utilityController;
