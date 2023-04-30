const notificationSchema = require("../schema/NotificationSchema");

const sendNotification = async(req, res) => {
    const userId = req.params.id;
    const data = await notificationSchema
        .find({ userId: userId })
        .populate("userId")
        .populate("projectId")
        .populate("taskId")
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting user Notifications",
                    err: err
                })
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "notification sent",
                        data: data, // send populated data
                    });
                } else {
                    res.status(404).json({
                        message: "Notifications not found",
                    })
                }
            }
        })
}


const deleteNotifications = async(req, res) => {
    const userId = req.params.id;
    const deleteNotifications = await notificationSchema.deleteMany({
        userId: userId,
    });
    res.status(200).json({
        message: "deleted successfully",
    });
};

module.exports = { sendNotification, deleteNotifications };