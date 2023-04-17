const projectTeamSchema = require('../schema/ProjectTeamSchema')

const getProjectsByUser = async(req, res) => {
    const id = req.params.id;
    console.log("user id is", id)
    try {
        let data = await projectTeamSchema.find({ userId: id })
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


module.exports = { getProjectsByUser }