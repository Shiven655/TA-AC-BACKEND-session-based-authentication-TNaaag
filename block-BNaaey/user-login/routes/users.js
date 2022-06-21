var express = require('express');
var router = express.Router();
var User = require('./models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', (req, res, next) => {
  res.render('registrationForm');
});
router.post('/', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      return next(err);
    }
    console.log(user);
    res.redirect('/');
  });
});
router.get('/login', (req, res, next) => {
  res.render('loginForm');
});
router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.redirect('/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.redirect('/login');
    }
    user.verifyPassword(passwoed, (err, result) => {
      if (err) return next(err);
      if (!result) {
        res.redirect('/login');
      }
      req.session.userId = user.id;
      res.redirect('/');
    });
  });
});

module.exports = router;
