var express = require('express');
var router = express.Router();
const pool = require('../database');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const flash = req.session.flash;
  const name = req.session.username;
  req.session.flash = null;

  await pool.promise()
  .query('SELECT * FROM MangaList')
  .then(([rows, fields]) => {
    if (name == undefined) {
      res.render('index.njk', { 
        mangalist: rows,
        layout: 'layout.njk', 
        Htitle: 'Start',
        flash: flash
      });
    } else {
      res.render('index.njk', { 
        mangalist: rows,
        layout: 'layout.njk', 
        Htitle: 'Start',
        flash: flash,
        loggedin: {
          logout: 'Logout',
          username: name
        }
      });
    }
  })


  
});

module.exports = router;
