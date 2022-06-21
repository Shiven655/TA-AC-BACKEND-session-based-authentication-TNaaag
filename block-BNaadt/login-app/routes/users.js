var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function (req, res, next) {
  res.render('registrationForm');
});
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      return next(err);
    }
    console.log(user);
    res.redirect('/');
  });
});
router.get('/login', function (req, res, next) {
  let error = req.flash('error');
  res.render('loginForm', { error });
});
router.post('/login', function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'email/password required');
    res.redirect('users/login');
  }
  User.findOne({ email }, (err, user) => {
    console.log(user);
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'register user before attempting login');
      res.redirect('users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'password verification failed');
        res.redirect('users/login');
      }
      req.session.userId = user.id;
      res.redirect('/');
    });
  });
});
module.exports = router;

module.exports = router;
