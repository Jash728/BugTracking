const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
}, {
    timestamps: true
})






module.exports = mongoose.model('users', UserSchema)