const express = require('express');
const router = express.Router();
const projectTeamController = require("../controller/ProjectTeamController")

router.post('/add', projectTeamController.addProjectTeam)
router.get('/getbyuserproject', projectTeamController.getProjectTeamByUserProject);
router.put('/updateProjectTeam/:id', projectTeamController.updateProjectTeam);
router.delete('/deleteProjectTeam/:id', projectTeamController.deleteProjectTeam);

module.exports = router;