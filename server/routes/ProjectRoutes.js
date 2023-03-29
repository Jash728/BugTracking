const express = require('express')
const router = express.Router()
const projectController = require('../controller/ProjectController')

router.get('/project/all/:id', projectController.getProjectData)
router.post('/project', projectController.addProject)
router.get('/project/:id', projectController.getProjectById)
router.put('/project/:id', projectController.updateProject)
router.delete('/project/:id', projectController.deleteProject)

module.exports = router