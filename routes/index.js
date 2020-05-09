var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/cart', function(req, res, next) {
  res.render('productCart');
});

router.get('/mobile', function(req, res, next) {
  res.render('home-mobile');
});

router.get('/section/:id', function(req, res, next) {
  res.render('section-'+ req.params.id)
});



module.exports = router;
