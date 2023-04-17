const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserTaskSchema = new Schema({
    userId: {
        type: String,
        ref: 'users',
        unique: false
    },
    taskId: {
        type: String,
        ref: 'task',
        unique: false
    }
})


module.exports = mongoose.model('usertask', UserTaskSchema)