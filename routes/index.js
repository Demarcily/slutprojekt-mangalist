var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const flash = req.session.flash;
  req.session.flash = null;

  res.render('index.njk', { 
    layout: 'layout.njk', 
    Htitle: 'Start',
    flash: flash });
});

module.exports = router;
