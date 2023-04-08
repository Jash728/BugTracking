const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectModuleSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    modulename: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedhours: {
        type: Number,

    },
    startdate: {
        type: Date,
        // required: true,
        default: Date.now()
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'status'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('projectModule', ProjectModuleSchema)