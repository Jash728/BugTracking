const express = require('express')
const router = express.Router()
const multer = require('multer');
const userController = require('../controller/UserController')


const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})


var upload = multer({ storage: storage })

router.get('/user', userController.getUserDataWithRole)
router.get('/user/dev', userController.getDeveloperData)
router.post('/user', upload.single('myFile'), userController.addUser)
router.get('/user/:id', userController.getUserById)
router.delete('/user/:id', userController.deleteUser)
router.put('/user/:id', userController.updateUser)
router.post('/user/login', userController.loginUser)
module.exports = router