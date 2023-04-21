const express = require('express')
const router = express.Router();
const projectController = require('../controller/DevelopersByProjectController');

router.get('/developer/:id', projectController.getProjectsByUser);
router.get('/developerTask/:id', projectController.getTaskByUsers);
router.put('/tasks/:id', projectController.updateTaskStatus)


module.exports = router;