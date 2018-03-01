var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // use for POST
var clientHandler = require('./scripts/client_handler');
var db = require('./scripts/db.js');

var app = express();

// get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:port/query)
router.get('/', function (req, res) {
    // console.log("========== " + req.url + " ==========");
    res.json({message: 'hooray! welcome to our query api!'});
});

// test route to make sure everything is working (accessed at GET http://localhost:port/query/metadata)
router.route('/metadata').get(function (req, res) {
    console.log("welcome to metadata");
    console.log(req.query);
    clientHandler.serviceQuery(req.query, function (err, result) {
        db.queryMetaData(db.HWSS_DB, db.METADATA, result, function(err, result){
            if(err){

            }
            console.log(result);
            var returnValue = {
                error: null,
                result: result
            }
            res.json(returnValue);
        })
    })
});

// register route for http://localhost:port/query/
app.use('/query', router);

// sample query
// localhost:3009/query/metadata?pi=Seger,Faraon&firstName=Kerri,Conard

var port = process.env.PORT || 3009;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'templates')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/', function (req, res) {
    res.sendFile(path.join('index.html'));
});

app.listen(port, function () {
    console.log(__dirname);
    console.log('example app listening on port 3009!');

});