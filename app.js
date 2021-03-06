
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    DBconfig = require('./config/dbConfig'),
    eventController  = require('./controller/eventController');
    studentController = require('./controller/studentController');
    organizerController = require('./controller/organizerController');
    uploadController = require('./controller/uploadController');

    const app = express();
    const port = process.env.PORT || 4300;

app.use(cors());
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: false}));


mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.ConnectionString,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    () => {console.log('Connected to Database') },
    err => { console.log('Can not connect to database'+ err)}
);

mongoose.set('debug', true);
app.use('/upload',express.static(__dirname+'/upload/profile'));
app.use('/upload',express.static(__dirname+'/upload/event'));
app.use(eventController);
app.use(studentController);
app.use(organizerController);
app.use(uploadController);
app.get('/home');
console.log('App is running on server');
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});
