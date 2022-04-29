const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
  await pool.promise()
  .query('SELECT * FROM MangaList')
  .then(([rows, fields]) => {
    res.render('manga.njk', {
      mangalist: rows,
      title: 'Manga',
      layout: 'layout.njk'
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

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await pool.promise()
  .query('DELETE FROM MangaList WHERE id = ?', [id])
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

router.post('/', async (req, res, next) => {
  const title = req.body.Title;
  const chapter = req.body.Chapter;
  const status = req.body.Status;
  await pool.promise()
  .query('INSERT INTO MangaList (Title, Chapter, Status) VALUES (?,?,?)', [title, chapter, status])
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
        error: 'Failed to post'
      }
    })
  });
});

router.post('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.Title;
  const chapter = req.body.Chapter;
  const status = req.body.Status;
  await pool.promise()
  .query('UPDATE MangaList SET Title = ?, Chapter = ?, Status = ? WHERE id = ?', [title, chapter, status, id])
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
