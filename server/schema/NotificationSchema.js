const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('notification', NotificationSchema);