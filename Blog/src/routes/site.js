const express = require('express');
const router = express.Router();

//import đối tượng HomeController
const siteController = require ('../app/controllers/SiteController');

router.get('/news',siteController.news);
router.get('/home',siteController.home);
router.get('/login',siteController.login);
router.get('/register',siteController.register);

module.exports = router;