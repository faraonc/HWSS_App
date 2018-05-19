// Defining the Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//TODO: need to change this to azure db
mongoose.connect('mongodb://localhost:27017/HWSS_LOCAL');
console.log("connected to db")

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,  // this prevents duplicate email, from what little i tested
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    allowedPrivateID: [Number]
});


// hashing password using bcrypt
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


// Creating a model by converting our schema into a Model we can work with
var User = mongoose.model('User', UserSchema);
module.exports = User;
