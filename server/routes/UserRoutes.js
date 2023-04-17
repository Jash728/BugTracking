const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/user', userController.getUserDataWithRole)
router.get('/user/dev', userController.getDeveloperData)
router.post('/user', userController.addUser)
router.get('/user/:id', userController.getUserById)
router.delete('/user/:id', userController.deleteUser)
router.put('/user/:id', userController.updateUser)
router.post('/user/login', userController.loginUser)
module.exports = router