const userTaskSchema = require("../schema/UserTaskSchema");

const addUserTask = async(req, res) => {
    let data = req.body
    console.log("data is", req.body);
    try {
        let userId = data[0];
        let taskId = data[1];
        const check = await userTaskSchema.findOne({ userId, taskId });
        console.log("check is-----------", check)
        if (check != null) {
            res.status(409).json({
                message: "User already assigned"
            })
            console.log("already Assigned")

        } else {
            const userTask = await userTaskSchema.create({
                userId: data[0],
                taskId: data[1],
            })
            res.status(201).json({
                message: "user added successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Error in assigning user"
        })
        console.log(error)
    }
}


const getDeveloper = async(req, res) => {
    let id = req.params.id
    userTaskSchema
        .find({ taskId: id })
        .populate('taskId') // populate project field
        .populate('userId') // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting user",
                    err: err
                })
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "assign user fetched successfully",
                        data: data // send populated data
                    })
                } else {
                    res.status(404).json({
                        message: "Team not found",
                    })
                }
            }
        })
}


const updateDeveloper = (req, res) => {
    const id = req.params.id;

    userTaskSchema.findByIdAndUpdate(id, req.body, { new: true })
        .populate('taskId') // populate project field
        .populate('userId') // populate user field
        .exec((err, updatedData) => {
            if (err) {
                res.status(404).json({
                    message: "error in updating project user",
                })
            } else {
                res.status(200).json({
                    message: "user data updated successfully",
                    data: updatedData // send populated and updated data
                })
            }
        })
}


const deleteDeveloper = (req, res) => {
    const id = req.params.id;

    userTaskSchema.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: "Error in deleting user",
                error: err
            });
        } else if (!doc) {
            res.status(404).json({
                message: "user not found"
            });
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                data: doc
            });
        }
    });
};


module.exports = {
    addUserTask,
    getDeveloper,
    updateDeveloper,
    deleteDeveloper
}