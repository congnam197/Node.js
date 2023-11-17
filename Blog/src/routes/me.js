const express = require('express');
const router = express.Router();

//import đối tượng HomeController
const meController = require ('../app/controllers/MeController');
router.get('/stored/courses',meController.storedCourses);
router.get('/trash/courses',meController.trashCourses);

module.exports = router;