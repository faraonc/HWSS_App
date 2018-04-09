var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "@@@ CONNECTION ERROR"));
db.once('open', function() {
    console.log("@@@@@@ MONGOOSE QUACK CONNECTED")
});