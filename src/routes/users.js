var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../schemas/user-registartion-schema');
const UserBasicInformation = require('../schemas/user-basic-information-schema');
const UserContactInfromation = require('../schemas/user-contact-information-schema');
const Countries = require('../schemas/Countries');
const JWTTokens = require('../schemas/jwt-token-schema')
const checkAuth = require('../middleware/jwt-token');

const payload = {

}

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
  created: { code: 204 },
  completed: { code: 200 }
}




var mongoose = require('mongoose');

router.post('/signUp', function (req, res, next) {
  User.countDocuments({ 'email': req.body.email }, function (err, count) {
    if (count < 1) {
      const newUser = new User(req.body);
      newUser.save();
      jwt.sign({ user: req.body.email }, secretKey, payload,
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
        jwt.sign({ user: req.body.email }, secretKey, payload,
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


router.get('/userBasicInformation/get', checkAuth, isTokenValid, function (req, res, next) {
  res.send("done");
});

router.post('/userBasicInformation/update', checkAuth, isTokenValid, function (req, res, next) {
  const tokenDecode = jwt.verify(req.headers.authorization, secretKey);

  const body = req.body
  body.userId = tokenDecode.user;
  UserBasicInformation.update(
    { "email": tokenDecode.user },
    { $set: body });
  // const test = new UserBasicInformation(body);
  // test.save();
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

router.post('/signOut', function (req, res, next) {
  const data = { body: statusCode.completed, authorization: '' }
  saveInvalidTokens(req, res);
  res.send(data);
});


function saveInvalidTokens(req, res) {
  const token = new JWTTokens({ token: req.headers.authorization });
  token.save();
}
function isTokenValid(req, res, next) {
  JWTTokens.find({ 'token': req.headers.authorization }, function (err, isUserLoggedOut) {
    if (isUserLoggedOut.length > 0) {
      return res.status(401).json({ body: statusCode.completed, authorization: '' });
    }
    else {
      next();
    }
  });
}


module.exports = router;
