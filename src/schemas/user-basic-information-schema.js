const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserBasicInformation = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    nationality: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String
    }
});

UserBasicInformation = mongoose.model('UserBasicInformation', UserBasicInformation);
module.exports = UserBasicInformation;