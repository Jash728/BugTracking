const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    rolename: {
        type: String,
        unique: true,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('role', RoleSchema);