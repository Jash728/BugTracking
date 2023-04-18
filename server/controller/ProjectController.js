const projectSchema = require("../schema/ProjectSchema")


//const coursesChosen = async (req, res) => {
// let data = await CourseModel.find({studentRollNum : studentRollNumber})
// return res.status(200).json(data)
// }


const getProjectData = async(req, res) => {
    let id = req.params.id
        // console.log("data is", req.params)
    try {
        let data = await projectSchema.find({ userid: id })
            // console.log(data)
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

const getProjectDataById = async(req, res) => {
    let id = req.params.id
    console.log("Indivitual Project is", req.params)
    console.log("id is", id)
    try {
        let data = await projectSchema.find({ _id: id })
        console.log("data is ", data)
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




const addProject = (req, res) => {

    // console.log(req.body)
    const project = new projectSchema(req.body)

    project.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "error in adding user",
            })
        } else {
            res.status(201).json({
                message: "project added successfully",
                data: data
            })
        }

    })

}

const getProjectById = (req, res) => {

    var id = req.params.id


    projectSchema.findById(id, (err, data) => {
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



const updateProject = (req, res) => {

    const id = req.params.id

    // const user = new userSchema(req.body)
    // user.fi
    projectSchema.findByIdAndUpdate(id, req.body, (err, success) => {
        if (err) {
            res.status(404).json({
                message: "error in updating project",
            })
        } else {
            res.status(200).json({
                message: "project updated successfully",
            })
        }
    })



}

const deleteProject = (req, res) => {

    const id = req.params.id
    projectSchema.findByIdAndDelete(id, (err, success) => {
        if (err) {
            res.status(404).json({
                message: "error in deleting user",
            })
        } else {
            res.status(200).json({
                message: "project deleted successfully",
                data: success
            })
        }
    })

}





module.exports = { getProjectData, addProject, getProjectById, updateProject, deleteProject, getProjectDataById }