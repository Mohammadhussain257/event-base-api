
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    DBconfig = require('./config/dbConfig'),
    eventController  = require('./controller/eventController');
const app = express();
const port = process.env.PORT || 4300;

app.use(cors());
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.ConnectionString,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    () => {console.log('Connected to Database') },
    err => { console.log('Can not connect to database'+ err)}
);

mongoose.set('debug', true);

app.use('/events', eventController);

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
