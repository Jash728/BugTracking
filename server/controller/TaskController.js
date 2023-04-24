const taskSchema = require("../schema/TaskSchema");

const addTask = (req, res) => {
    const newtask = new taskSchema(req.body);
    // console.log("Project module is", projectmodule)
    newtask.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "error in adding task",
            });
        } else {
            res.status(201).json({
                message: "task added successfully",
                data: data,
            });
        }
    });
};

const getTaskBymodulestatus = async(req, res) => {
    let id = req.params.id
        // console.log("id is", id)
    taskSchema
        .find({ moduleId: id })
        .populate('projectId')
        .populate('moduleId') // populate project field
        .populate('status')
        .sort({ priority: 1 }) // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting task",
                    err: err
                })
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "task fetched successfully",
                        data: data // send populated data
                    })
                } else {
                    res.status(404).json({
                        message: "task not found",
                    })
                }
            }
        })
}


const gettaskById = (req, res) => {
    var id = req.params.id


    taskSchema.findById(id).populate('projectId')
        .populate("moduleId")
        .populate('status')
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
        })
}

const updateTask = (req, res) => {
    const id = req.params.id;

    taskSchema.findByIdAndUpdate(id, req.body, { new: true })
        .populate('projectId') // populate project field
        .populate('moduleId') // populate project field
        .populate('status') // populate user field
        .exec((err, updatedData) => {
            if (err) {
                res.status(404).json({
                    message: "error in updating task data",
                })
            } else {
                res.status(200).json({
                    message: "task data updated successfully",
                    data: updatedData // send populated and updated data
                })
            }
        })
}
const deleteTask = (req, res) => {
    const id = req.params.id;

    taskSchema.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: "Error in deleting task",
                error: err
            });
        } else if (!doc) {
            res.status(404).json({
                message: "task not found"
            });
        } else {
            res.status(200).json({
                message: "task deleted successfully",
                data: doc
            });
        }
    });
};

const searchTask = async(req, res) => {
    try {
        const { id } = req.params;
        const regex = new RegExp(req.params.key, 'i');
        const results = await taskSchema
            .find({
                moduleId: id,
                $or: [{ title: regex }],
            })

        .exec();
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while searching for projects");
    }
};


module.exports = { addTask, getTaskBymodulestatus, gettaskById, updateTask, deleteTask, searchTask }