var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const flash = req.session.flash;
  const name = req.session.username;
  req.session.flash = null;


  if (name == undefined) {
    res.render('index.njk', { 
      layout: 'layout.njk', 
      Htitle: 'Start',
      flash: flash
    });
  } else {
    res.render('index.njk', { 
      layout: 'layout.njk', 
      Htitle: 'Start',
      flash: flash,
      loggedin: 'Logout',
    });
  }
});

module.exports = router;
