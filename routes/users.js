var express = require('express');
var router = express.Router();
const pool = require('../database');

router.get('/', (req, res, next) => {
  res.render('users.njk', { layout: 'layout.njk', title: 'Express' });
});


// Signup
router.get('/signup', (req, res, next) => {
  res.render('signup.njk', { layout: 'layout.njk', title: 'Express' });
});

router.post('/signup', (req, res, next) => {
});
// Login
router.get('/login', (req, res, next) => {
  res.render('login.njk', { layout: 'layout.njk', title: 'Express' });
});

router.post('/login', (req, res, next) => {
});






module.exports = router;
