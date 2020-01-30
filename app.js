
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    DBconfig = require('./config/dbConfig');
const app = express();
let port = process.env.PORT || 4300;

app.use(cors());
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.ConnectionString,{useNewUrlParser:true, useUnifiedTopology:true}).then(
    () => {console.log('Connected to Database') },
    err => { console.log('Can not connect to the database'+ err)}
);

mongoose.set('debug', true);


app.listen(port, function(){
    console.log('Listening on port ' + port);
});
