const express = require('express')
const router = express.Router();
const notificationController = require("../controller/NotificationsController");

router.get("/notifications/:id", notificationController.sendNotification);
router.delete("/notifications/:id", notificationController.deleteNotifications);


module.exports = router;