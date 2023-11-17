const express = require('express');
const router = express.Router();

//import đối tượng HomeController
const siteController = require ('../app/controllers/SiteController');

router.get('/news',siteController.news);
router.get('/home',siteController.home);

module.exports = router;