var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.njk', { layout: 'layout.njk', title: 'Express' });
});

module.exports = router;
