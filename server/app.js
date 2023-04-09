const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express()
const dotenv = require("dotenv");
const PORT = 4000

dotenv.config({ path: './config.env' });

app.use(cors())
app.use(express.json());

const userRoutes = require('./routes/UserRoutes')
const roleRoutes = require('./routes/RoleRoutes')
const projectRoutes = require('./routes/ProjectRoutes')
const projectTeamRoutes = require('./routes/ProjectTeamRoutes')
const projectModuleRoutes = require('./routes/ProjectModuleRoutes')
const statusRoutes = require('./routes/StatusRoutes');

app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes)
app.use('/projectteam', projectTeamRoutes)
app.use('/projectmodule', projectModuleRoutes)
app.use('/status', statusRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/bugtracker", {}, (err) => {
    if (err) {
        console.log("error in db connections....")
    } else {
        console.log("db connected....")
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})