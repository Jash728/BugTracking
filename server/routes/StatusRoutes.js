const express = require('express');
const router = express.Router();
const statusController = require('../controller/StatusController');

router.post('/add', statusController.addStatus);
router.get('/get', statusController.getAllStatus);
module.exports = router;