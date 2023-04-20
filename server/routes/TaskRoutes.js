const express = require('express')
const router = express.Router()
const taskController = require("../controller/TaskController");

router.post('/task', taskController.addTask)
router.get('/task/:id', taskController.getTaskBymodulestatus)
router.get('/taskbyModule/:id', taskController.gettaskById)
router.put('/task/:id', taskController.updateTask)
router.delete('/task/:id', taskController.deleteTask)
router.get('/:id/search/:key', taskController.searchTask)


module.exports = router