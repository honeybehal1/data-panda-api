var express = require('express');
var router = express.Router();
const User = require('../schemas/user-registartion-schema');
const UserBasicInformation = require('../schemas/user-basic-information-schema');
const UserContactInfromation = require('../schemas/user-contact-information-schema');
const Countries = require('../schemas/Countries');



var mongoose = require('mongoose');

router.post('/signUp', function (req, res, next) {
  const test = new User(req.body);
  test.save();
  res.send(req.body);
});

router.post('/userBasicInformation', function (req, res, next) {
  const test = new UserBasicInformation(req.body);
  test.save();
  res.send(req.body);
});

router.post('/userContactInformation', function (req, res, next) {
  const test = new UserContactInfromation(req.body);
  test.save();
  res.send(req.body);
});

router.get('/countries', function (req, res, next) {
  var db = [];
  Countries.find({}, (err, countrieData) => {
    res.send(countrieData);
  });

});

module.exports = router;


