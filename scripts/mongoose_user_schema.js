// Defining the Schema
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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

// Creating a model by converting our schema into a Model we can work with
var User = mongoose.model('User', UserSchema);
module.exports = User;
