const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
  await pool.promise()
    .query('SELECT * FROM MangaList')
    .then(([rows, fields]) => {
      res.render('manga.njk', {
        MangaList: rows,
        title: 'Manga',
        layout: 'layout.njk'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        MangaList: {
          error: 'Error getting List'
        }
      })
    });
});
module.exports = router;
