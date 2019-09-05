const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserContactInformation = new Schema({
    primaryEmailId: {
        type: String,
        required: [true, 'Email is required'], unique: true
    },
    secondaryEmailId: {
        type: String,
    },
    primaryPhoneNumber: {
        type: String,
    },
    secondaryPhoneNumber: {
        type: String,
    }
});

UserContactInformation = mongoose.model('UserContactInformation', UserContactInformation);
module.exports = UserContactInformation;