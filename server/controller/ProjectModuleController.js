const projectModuleSchema = require("../schema/ProjectModuleSchema");


const addProjectModule = (req, res) => {
    const projectmodule = new projectModuleSchema(req.body);
    console.log("Project module is", projectmodule)
    projectmodule.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "error in adding project module",
            });
        } else {
            res.status(201).json({
                message: "project module added successfully",
                data: data,
            });
        }
    });
};

const getProjectModuleByProjectStatus = async(req, res) => {
    let id = req.params.id
    console.log("id is", id)
    projectModuleSchema
        .find({ projectId: id })
        .populate('projectId') // populate project field
        .populate('status') // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting module",
                    err: err
                })
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "Module fetched successfully",
                        data: data // send populated data
                    })
                } else {
                    res.status(404).json({
                        message: "Module not found",
                    })
                }
            }
        })
}


const getModuleById = (req, res) => {
    var id = req.params.id


    projectModuleSchema.findById(id).populate('projectId')
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

const updateProjectModule = (req, res) => {
    const id = req.params.id;

    projectModuleSchema.findByIdAndUpdate(id, req.body, { new: true })
        .populate('projectId') // populate project field
        .populate('status') // populate user field
        .exec((err, updatedData) => {
            if (err) {
                res.status(404).json({
                    message: "error in updating project module data",
                })
            } else {
                res.status(200).json({
                    message: "project module data updated successfully",
                    data: updatedData // send populated and updated data
                })
            }
        })
}
const deleteProjectModule = (req, res) => {
    const id = req.params.id;

    projectModuleSchema.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: "Error in deleting project module",
                error: err
            });
        } else if (!doc) {
            res.status(404).json({
                message: "Project module not found"
            });
        } else {
            res.status(200).json({
                message: "Project module deleted successfully",
                data: doc
            });
        }
    });
};


module.exports = { addProjectModule, getProjectModuleByProjectStatus, updateProjectModule, deleteProjectModule, getModuleById }