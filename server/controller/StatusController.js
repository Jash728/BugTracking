const statusSchema = require('../schema/StatusSchema');

const addStatus = (req, res) => {
    const status = new statusSchema(req.body);
    status.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        } else {
            res.status(200).json({
                message: 'Status Added',
                data: data
            })
        }

    })

}
const getAllStatus = (req, res) => {


    statusSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Error in fetching status",
                err: err
            })
        } else {
            if (data != null || data != undefined || data.length != 0) {
                res.status(200).json({
                    message: "status fetched successfully",
                    data: data
                })
            } else {
                res.status(404).json({
                    message: "status not found",
                })
            }
        }
    })

}

module.exports = {
    addStatus,
    getAllStatus,
}