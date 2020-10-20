var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home' });
});
/* GET About page. */
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'About Us' });
});
/* GET Contact page. */
router.get('/contacts', function (req, res, next) {
    res.render('contacts', { title: 'Contacts' });
});
/* GET FAQ page. */
router.get('/faq', function (req, res, next) {
    res.render('faq', { title: 'F.A.Q' });
});

module.exports = router;
