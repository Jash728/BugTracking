const express = require('express');
const router = express.Router();
const userTaskController = require("../controller/UserTaskController");

router.post('/userTask', userTaskController.addUserTask)
router.get('/userTask/:id', userTaskController.getDeveloper);
router.delete('/userTask/:id', userTaskController.deleteDeveloper);

module.exports = router