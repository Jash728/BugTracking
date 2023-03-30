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
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
}, {
    timestamps: true
})

// UserSchema.pre("save", async function(next) {
//     if (this.isModified("password")) {

//         // const passwordHash = await bcrypt.hash(password, 10);
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// })





module.exports = mongoose.model('users', UserSchema)