const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    moduleId: {
        type: String
    },
    projectId: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    priority: {
        type: String,

    },
    description: {
        type: String,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'status'
    },
    totalMinutes: {
        type: Number
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('task', TaskSchema)