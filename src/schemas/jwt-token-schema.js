const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JWTTokens = new Schema({
    token: {
        type: String,
    },
    timeOfRegistartion: {
        type: Date,
        default: Date.now
    }
});

const JWTTokensSchema = mongoose.model('JWTTokens', JWTTokens);
module.exports = JWTTokensSchema;