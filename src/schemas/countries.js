const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Countries = new Schema({

});

Countries = mongoose.model('Countries', Countries);
module.exports = Countries;