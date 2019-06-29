var express = require('express');
var router = express.Router();
const User = require('../schemas/user-registartion-schema');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */

router.post('/signUp', function (req, res, next) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(req);
  const test = new User(req.body);
  test.save();
  // User.create({
  //   email: "email.com",
  //   password: "password"
  // }).then(data => {
  //   res.send({ hello: 'test' });
  // });

  res.send(req.body);

});

module.exports = router;
