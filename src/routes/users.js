var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../schemas/user-registartion-schema');
const UserBasicInformation = require('../schemas/user-basic-information-schema');
const UserContactInfromation = require('../schemas/user-contact-information-schema');
const Countries = require('../schemas/Countries');

const secretKey = 'data_panda';
const statusCode = {
  userAlreadyExist: {
    message: "User already exist",
    code: 409
  },
  userNotFound: {
    message: "User not registred ",
    code: 409
  },
  emailPasswordMissMatched: {
    message: "Email or Password is wrong",
    code: 409
  },
  created: { code: 204 }
}




var mongoose = require('mongoose');

router.post('/signUp', function (req, res, next) {
  User.countDocuments({ 'email': req.body.email }, function (err, count) {
    if (count < 1) {
      const newUser = new User(req.body);
      newUser.save();
      jwt.sign({ user: req.body.email }, secretKey,
        function (err, token) {
          const data = { body: statusCode.created, authorization: token }
          res.send(data);
        });
    }
    else {
      res.send(statusCode.userAlreadyExist)
    }

  });
});

router.post('/login', function (req, res, next) {
  User.find({ 'email': req.body.email }, function (err, user) {
    let data = {}
    if (user.length > 0) {
      const isUserDetailsMatched = (user[0].email === req.body.email) && (user[0].password === req.body.password);
      if (isUserDetailsMatched) {
        jwt.sign({ user: req.body.email }, secretKey,
          function (err, token) {
            data = { body: statusCode.created, authorization: token }
            res.send(data);
          });
      }
      else {
        data = { body: statusCode.emailPasswordMissMatched, authorization: null }
        res.send(data);
      }
    }
    else {
      data = { body: statusCode.userNotFound, authorization: null }
      res.send(data);
    }
  });
});


router.get('/userBasicInformation/get', function (req, res, next) {
  const tokenDecode = jwt.verify(req.headers.authorization, secretKey);
  UserBasicInformation.find({ email: tokenDecode.user }, function (error, documents) {
    res.send(documents);
  });

});

router.post('/userBasicInformation/update', function (req, res, next) {
  const tokenDecode = jwt.verify(req.headers.authorization, secretKey);
  const body = req.body
  const test = new UserBasicInformation({ ...body, userId: tokenDecode.user });
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


