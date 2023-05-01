const projectTeamSchema = require("../schema/ProjectTeamSchema");
const userTaskSchema = require("../schema/UserTaskSchema");
const taskSchema = require("../schema/TaskSchema")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

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
                console.log('Data before sorting: ', data); // print data before sorting
                if (data != null || data != undefined || data.length != 0) {
                    data.sort((a, b) => a.taskId.priority - b.taskId.priority); // sort the data
                    console.log('Data after sorting: ', data); // print data after sorting
                    res.status(200).json({
                        message: "Module fetched successfully",
                        data: data, // send sorted data
                    });
                } else {
                    res.status(404).json({
                        message: "Module not found",
                    });
                }
            }
        });
}


const updateTaskStatus = async(req, res) => {
    try {
        const taskId = req.params.id; // task ID from request parameters
        const { status } = req.body; // new status from request body

        // Convert status to ObjectId
        const statusId = new ObjectId(status);

        // Get the task from the database
        const task = await taskSchema.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Calculate the total minutes spent on the task
        const createdAt = new Date(task.createdAt).getTime();
        const updatedAt = new Date(task.updatedAt).getTime();
        const totalMinutes = Math.round((updatedAt - createdAt) / 1000 / 60);

        // Update task in TaskSchema
        const updatedTask = await taskSchema.findByIdAndUpdate(
            taskId, { status: statusId, totalMinutes: totalMinutes }, { new: true } // return updated document
        );

        // Update task status in UserTaskSchema
        await userTaskSchema.findOneAndUpdate({ taskId }, { $set: { status: statusId } }, { new: true });

        return res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { getProjectsByUser, getTaskByUsers, updateTaskStatus };