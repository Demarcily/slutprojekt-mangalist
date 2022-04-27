var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('users.njk', { layout: 'layout.njk', title: 'Express' });
});

module.exports = router;
