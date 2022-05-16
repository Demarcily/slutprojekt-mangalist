var express = require('express');
var router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => {
  const flash = req.session.flash;
  req.session.flash = null;

  res.render('users.njk', { 
    layout: 'layout.njk', 
    Htitle: 'Users', 
    flash: flash });
});


// Signup
router.get('/signup', async (req, res, next) => {
  const flash = req.session.flash;
  req.session.flash = null;

  res.render('signup.njk', { 
    layout: 'layout.njk', 
    title: 'Signup', 
    flash: flash
  });
});

router.post('/signup', async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  await pool.promise()
    .query('SELECT name FROM users WHERE name = ? ', [name])
    .then((response) => {
      if (response[0][0] == undefined) {
        bcrypt.hash(password, 8, async function (err, hash) {
          await pool.promise()
            .query('INSERT INTO users (name, password) VALUES (?, ?)', [name, hash])
            .then((response) => {
              if (response[0].affectedRows === 1) {
                res.redirect('/users/login');
              } else {
                res.status(400).redirect('/users/signup');
              }
            })
            .catch(err => {
              console.log(err);
              res.redirect('/');
            });
        });
      } else {
        req.session.flash = {
          head: 'Sign up',
          msg: 'Username is already in use'
        }
        res.redirect('/users/signup')
      }
    })


});


// Login
router.get('/login', async (req, res, next) => {
  const flash = req.session.flash;
  req.session.flash = null;

  res.render('login.njk', { 
    layout: 'layout.njk', 
    title: 'Login',
    flash: flash });
});

router.post('/login', async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  await pool.promise()
  .query('SELECT * FROM users WHERE name = ?', [name])
  .then(([rows, fields]) => {
    if (rows.length === 0) {
      req.session.flash = {
        head: 'Username',
        msg: 'Username does not exist'
      }
      res.redirect('/users/login');
    }
    const user_id = rows[0].id;
    bcrypt.compare(password, rows[0].password, function(err, result) {
      console.log(result);
      if (result) {
        req.session.username = name;
        req.session.user_id = user_id;
        return res.redirect('/mangalist');
      } else {
        req.session.flash = {
          head: 'Password',
          msg: 'Failed to login, wrong password'
        }
        res.redirect('/users/login');
      }
    });    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      login: {
        error: 'Failed to login'
      }
    })
  });
});


module.exports = router;
