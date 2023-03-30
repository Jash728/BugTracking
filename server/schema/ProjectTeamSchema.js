const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProjectTeamSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('project_team', ProjectTeamSchema)