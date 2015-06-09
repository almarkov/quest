var express = require('express');
var router = express.Router();

// запуск GUI
router.get('/', function(req, res, next) {
  res.render('index.html', {site: siate});
});

module.exports = router;
