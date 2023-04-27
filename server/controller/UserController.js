const userSchema = require('../schema/UserSchema');
// const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const encrypt = require('../utils/encrypt');
const jwt = require('jsonwebtoken')


const getUserDataWithRole = (req, res) => {

    userSchema.find().populate('role').exec((err, users) => {
        if (err) {
            res.status(500).json({
                message: "Error in getting users",
                err: err
            })
        } else {
            if (users != null || users != undefined || users.length != 0) {
                res.status(200).json({
                    message: "Users fetched successfully",
                    users: users
                })
            } else {
                res.status(404).json({
                    message: "Users not found",
                })
            }

        }
    })

}


const getUserData = (req, res) => {
    userSchema.find((err, data) => {
        if (err) {
            res.status(404).json({
                message: "error in fetching data"
            })
        } else {
            res.status(200).json({
                message: "data fetched successfully",
                data: data
            })
        }

    })

}



const addUser = async(req, res) => {

    let profile = req.file ? req.file.filename : null
    const hash = await encrypt.encryptPassword(req.body.password)
        // console.log(hash)
    const userData = {
        firstname: req.body.firstname,
        email: req.body.email,
        role: req.body.role,
        password: hash,
        profile: profile
    }

    const user = new userSchema(userData)
    user.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "error in adding user",
            })
        } else {
            res.status(201).json({
                message: "user added successfully",
                data: data
            })
        }

    })

}






const deleteUser = (req, res) => {

    const id = req.params.id
    userSchema.findByIdAndDelete(id, (err, success) => {
        if (err) {
            res.status(404).json({
                message: "error in deleting user",
            })
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                data: success
            })
        }
    })

}





const loginUser = async(req, res) => {
    userSchema.findOne({ email: req.body.email }).populate('role').exec(async(err, data) => {
        if (err) {
            res.status(500).json({
                message: "error in fetching data",
                err: err
            })
        } else {
            // console.log("-sasa--", await userSchema.findOne({ email: req.body.email }))
            // console.log("data is", data)
            if (data !== null || data !== undefined) {
                console.log("---", req.body)

                const result = await encrypt.comparePassword(req.body.password, data.password)

                // console.log("req.body.password", await encrypt.encryptPassword(req.body.password, 10))
                // console.log("result is", result)
                // const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
                //     expiresIn: "1d",
                // });
                if (result == true) {
                    res.status(200).json({
                        message: "user found",
                        data: data,


                    })
                    console.log("Yesss")
                    return;
                } else {
                    console.log("elsessss")
                    res.status(404).json({
                        message: "user not found",
                    })
                }


            } else {
                console.log("Idhar aa raha he")
                res.status(404).json({
                    message: "user not found",
                })
            }


        }
    })

}









const getUserById = (req, res) => {

    var id = req.params.id

    userSchema.findById(id)
        .populate('role') // replace fieldToPopulate with the actual field name in your schema
        .exec((err, data) => {
            if (err) {
                res.status(404).json({
                    message: "error in fetching data"
                })
            } else {
                res.status(200).json({
                    message: "data fetched successfully",
                    data: data
                })
            }
        });


}


const getDeveloperData = async(req, res) => {
    let id = "6410b77ad7e29a5fc469da8a"
        // console.log("data is", req.params)
    try {
        let data = await userSchema.find({ role: id })
            // console.log("Jash", data)
        res.status(200).json({
            message: "data fetched successfully",
            data: data
        })
    } catch (err) {
        res.status(404).json({
            message: "error in fetching data"
        })
    }


}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const { firstname, email, password, profile, role } = req.body;
    // console.log("req.body", req.body)

    try {
        const user = await userSchema.findById(id).populate('role');
        // console.log("user is", user)

        if (!user) {
            console.log("1")
            return res.status(404).json({ message: 'User not found' });

        }
        // Only hash the new password if it is provided
        if (password) {
            const hashedPassword = await encrypt.encryptPassword(password);
            user.password = hashedPassword;
            // console.log("2")
        }

        // Add validation for required fields
        if (firstname && email) {
            user.firstname = firstname;
            user.email = email;
            user.profile = profile;
            user.role = role;
            // console.log("3")

            const updatedUser = await user.save();

            return res.status(200).json(updatedUser);
        } else {
            return res.status(400).json({ message: 'Firstname and email are required fields' });
        }
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getUserData,
    addUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser,
    getUserDataWithRole,
    getDeveloperData
}