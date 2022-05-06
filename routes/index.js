var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index.njk', { layout: 'layout.njk', title: 'Start' });
});

module.exports = router;
