// Defining the Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//TODO: need to change this to azure db
mongoose.connect("mongodb://hwssappmongodb:9lhI6wipX8KfCXpOJPrcHLggIJGZQmsx4OnRuc7FadvaLlWRgKNVT4f1mE8R3JVgvKYl3Bx3wVTdo4Ao15waqg%3D%3D@hwssappmongodb.documents.azure.com:10255/HWSS?ssl=true&replicaSet=globaldb");

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
var User = mongoose.model('User', UserSchema, 'USERS');

//authenticate input against database, from website
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('Email not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

// module.exports = User;
module.exports = {
    user: User,
    validate: UserSchema.statics.authenticate
};
