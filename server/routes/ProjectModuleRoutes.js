const express = require('express')
const router = express.Router()
const projectModuleController = require('../controller/ProjectModuleController')

router.post('/add', projectModuleController.addProjectModule)
router.get('/getbyprojectstatus/:id', projectModuleController.getProjectModuleByProjectStatus)
router.put('/updateprojectmodule/:id', projectModuleController.updateProjectModule)
router.delete('/deleteprojectmodule/:id', projectModuleController.deleteProjectModule)
router.get('/getmodulebyid/:id', projectModuleController.getModuleById)
router.get('/:id/search/:key', projectModuleController.searchModule)


module.exports = router