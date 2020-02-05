const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let LikeShare = new Schema({
    LikeShare_ID:{
        type: Number
    },
    like:{
        type: Number,
        default: 0,
    },
    share:{
        type: Number,
        default: 0
    }
});

LikeShare.plugin(autoIncrement, { inc_field: 'LikeShare_ID' }); //auto increment value
module.exports = mongoose.model('LikeShare', LikeShare);
