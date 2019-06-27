var express = require('express');
var router = express.Router();
const User = require('../schemas/user-registartion-schema');

/* GET home page. */

router.post('/signUp', function (req, res, next) {
  console.log("in user router");
  const test = new User({ email: "testEmail", password: 'ksh' });
  test.save();
  debugger;
  // User.create({
  //   email: "email.com",
  //   password: "password"
  // }).then(data => {
  //   res.send({ hello: 'test' });
  // });

  res.render('index', { title: 'test' });

});
router.get('/', function (req, res, next) {
  console.log("in user router");

  res.render('index', { title: 'hello2' });
});

module.exports = router;
