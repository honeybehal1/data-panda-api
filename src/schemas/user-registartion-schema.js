const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRegistration = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const User = mongoose.model('UserRegistration', UserRegistration);
module.exports = User;