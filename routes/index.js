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
  const manga_id = req.params.id;
  const name = req.session.username;
  const user_id = req.session.user_id;
  if (name == undefined) {
    req.session.flash = {
      head: 'Login',
      msg: `You need to login first`
    }
    return res.redirect('/');
  }
  await pool.promise()
  .query('SELECT * FROM Connection WHERE user_id = ? AND manga_id = ?', [user_id, manga_id])
  .then(async (response) => {
    if (response[0][0] == undefined) {
      await pool.promise()
      .query('INSERT INTO Connection (user_id, manga_id) VALUES (?,?)', [user_id, manga_id])
      .then((response) => {
        if (response[0].affectedRows == 1) {
          return;
        } else {
          res.status(400).redirect('/');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          manga: {
            error: 'Failed to add manga'
          }
        })
      });
    } else {
      req.session.flash = {
        head: 'Add',
        msg: 'This manga is already in your reading list'
      }
      return res.redirect('/');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      manga: {
        error: 'Failed to add manga'
      }
    })
  });
});

module.exports = router;
