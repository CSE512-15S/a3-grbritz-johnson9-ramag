var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/us-counties', function(req, res) {
  res.render('us-county');
});

module.exports = router;
