const projectTeamSchema = require("../schema/ProjectTeamSchema");

const addProjectTeam = async(req, res) => {
    console.log(req.body)
    let data = req.body
    const projectTeam = await projectTeamSchema.create({
        projectId: data[0],
        userId: data[1],
    })

    // const projectTeam = new projectTeamSchema(req.body)
    console.log("Project team is ", projectTeam)
        // projectTeam.save((err, data) => {
        //     if (err) {
        // res.status(500).json({
        //         message: "error in adding user",
        //     })
        //     } else {
    res.status(201).json({
            message: "user added successfully",
            data: data
        })
        //     }

    // })
}

const getProjectTeamByUserProject = (req, res) => {
    projectTeamSchema
        .find()
        .populate('projectId') // populate project field
        .populate('userId') // populate user field
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error in getting team",
                    err: err
                })
            } else {
                if (data != null || data != undefined || data.length != 0) {
                    res.status(200).json({
                        message: "Team fetched successfully",
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

const updateProjectTeam = (req, res) => {
    const id = req.params.id;

    projectTeamSchema.findByIdAndUpdate(id, req.body, { new: true })
        .populate('projectId') // populate project field
        .populate('userId') // populate user field
        .exec((err, updatedData) => {
            if (err) {
                res.status(404).json({
                    message: "error in updating project team data",
                })
            } else {
                res.status(200).json({
                    message: "project team data updated successfully",
                    data: updatedData // send populated and updated data
                })
            }
        })
}
const deleteProjectTeam = (req, res) => {
    const id = req.params.id;

    projectTeamSchema.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.status(500).json({
                message: "Error in deleting project team",
                error: err
            });
        } else if (!doc) {
            res.status(404).json({
                message: "Project team not found"
            });
        } else {
            res.status(200).json({
                message: "Project team deleted successfully",
                data: doc
            });
        }
    });
};

module.exports = {
    addProjectTeam,
    getProjectTeamByUserProject,
    updateProjectTeam,
    deleteProjectTeam
}