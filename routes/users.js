var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('users.njk', { layout: 'layout.njk', title: 'Express' });
});

module.exports = router;
