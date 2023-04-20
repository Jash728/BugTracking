const projectTeamSchema = require("../schema/ProjectTeamSchema");
const userTaskSchema = require("../schema/UserTaskSchema");

const getProjectsByUser = async(req, res) => {
    let id = req.params.id;
    // console.log("id is", id)
    projectTeamSchema
        .find({ userId: id })
        .populate("projectId") // populate project field
        .populate("userId") // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting module",
                    err: err,
                });
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "Module fetched successfully",
                        data: data, // send populated data
                    });
                } else {
                    res.status(404).json({
                        message: "Module not found",
                    });
                }
            }
        });
};


const getTaskByUsers = async(req, res) => {
    let id = req.params.id;
    // console.log("id is", id)
    userTaskSchema
        .find({ userId: id })
        .populate({
            path: 'taskId',
            populate: {
                path: 'status', // the field you want to populate
                select: 'statusname', // specify the fields to be returned
            }
        }) // populate project field
        .populate("userId") // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting module",
                    err: err,
                });
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "Module fetched successfully",
                        data: data, // send populated data
                    });
                } else {
                    res.status(404).json({
                        message: "Module not found",
                    });
                }
            }
        });
}

module.exports = { getProjectsByUser, getTaskByUsers };