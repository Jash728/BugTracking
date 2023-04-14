const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserTaskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        unique: false
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        unique: false
    }
})

module.exports = mongoose.model('usertask', UserTaskSchema)