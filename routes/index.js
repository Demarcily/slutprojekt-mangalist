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
  .catch(err => {
    console.log(err);
    res.status(500).json({
      manga: {
        error: 'Error getting manga from database'
      }
    })
  });
});

router.get('/:id/add', async (req, res, next) => {
  const id = req.params.id;
  if (req.session.username == undefined) {
    req.session.flash = {
      head: 'Login',
      msg: `You're not logged in`
    }
    return res.redirect('/');
  }

  console.log('Works');

});

module.exports = router;
