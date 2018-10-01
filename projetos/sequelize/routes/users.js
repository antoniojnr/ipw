var express = require('express');
var models = require('../models');
var bp = require('body-parser');
var router = express.Router();

router.use(bp.json());

router.get('', function(req, res) {
  res.send('ok!');
});

module.exports = router;
