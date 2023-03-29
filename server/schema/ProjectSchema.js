const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technology: {
        type: String,
        required: true,
    },
    estimatedhours: {
        type: Number,

    },
    startdate: {
        type: Date,
        // required: true,
    },
    completiondate: {
        type: Date,

    },
    userid: {
        type: String,
        // ref: 'User',
        // required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('project', ProjectSchema)