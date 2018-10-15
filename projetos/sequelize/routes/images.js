const express = require('express');
const router = express.Router();

var models = require('../models');
var bp = require('body-parser');
var User = models.User;
var Image = models.Image;
var Tag = models.Tag;

router.use(bp.json());

router.post('', function(req, res) {
  Image.create({
    userId: req.body.userId,
    fileId: req.body.fileId,
    text: req.body.text
  }).then(function(image) {
    res.json(image);
  }).catch(function(error) {
    res.json(error);
  });
});

router.post('/:id/tags', function(req, res) {
  Tag
    .findAll({
      where: {
        text: req.body.text 
      }
    })
    .then(function(tags) {
      res.json(tags);
    });
  // Tag
  //   .create({
  //     text: req.body.text
  //   })
  //   .then(function(tag) {
  //     Image
  //       .findById(req.params.id)
  //       .then(function(image) {
  //         image.addTag(tag);
  //         image.save();
  //       });
  //     res.json(tag);
  //   });
});

module.exports = router;
