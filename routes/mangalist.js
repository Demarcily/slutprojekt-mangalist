const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
  const name = req.session.username;
  if (name == undefined) {
    req.session.flash = {
      head: 'Login',
      msg: `You're not logged in`
    }
    return res.redirect('/');
  }

  await pool.promise()
  .query('SELECT * FROM limmuy_manga')
  .then(([rows, fields]) => {
    res.render('manga.njk', {
      mangalist: rows,
      Htitle: 'Manga',
      layout: 'layout.njk',
      loggedin: {
        logout: 'Logout',
        username: name
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      mangalist: {
        error: 'Error getting List'
      }
    })
  });
});

router.get('/search', async (req, res, next) => {
  const title = req.query.searchtitle;
  const search = `%${title}%`
  const name = req.session.username;
  if (name == undefined) {
    req.session.flash = {
      head: 'Login',
      msg: `You're not logged in`
    }
    return res.redirect('/');
  }

  await pool.promise()
  .query('SELECT * FROM limmuy_manga WHERE title LIKE ?', [search]) //Results based on user logged in
  .then(([rows, fields]) => {
    res.render('manga.njk', {
      mangalist: rows,
      Htitle: 'Manga',
      layout: 'layout.njk',
      loggedin: {
        logout: 'Logout',
        username: name
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      mangalist: {
        error: 'Error getting results'
      }
    })
  });
});

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await pool.promise()
  .query('DELETE FROM limmuy_manga WHERE id = ?', [id])
  .then((response) => {
    if (response[0].affectedRows == 1) {
      res.redirect('/mangalist');
    } else {
      res.status(400).redirect('/mangalist');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      manga: {
        error: 'Error getting manga'
      }
    })
  });
});

router.get('/logout', async (req, res, next) => {
  req.session.username = undefined;
  req.session.flash = {
    head: 'Logout',
    msg: 'Successfully logged out'
  }
  res.redirect('/');
});

router.post('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const chapter = req.body.chapter;
  const status = req.body.status;
  await pool.promise()
  .query('UPDATE limmuy_manga SET chapter = ?, status = ? WHERE id = ?', [chapter, status, id]) //Change to limmuy_connection
  .then((response) => {
    if (response[0].affectedRows == 1) {
      res.redirect('/mangalist')
    } else {
      res.status(400).redirect('/mangalist');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      manga: {
        error: 'Failed to edit'
      }
    })
  });
});


module.exports = router;
