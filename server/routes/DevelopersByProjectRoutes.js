const express = require('express')
const router = express.Router();
const projectController = require('../controller/DevelopersByProjectController');

router.get('/developer/:id', projectController.getProjectsByUser);

module.exports = router;