const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express()
const dotenv = require("dotenv");
const path = require('path');


dotenv.config();

app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/UserRoutes')
const roleRoutes = require('./routes/RoleRoutes')
const projectRoutes = require('./routes/ProjectRoutes')
const projectTeamRoutes = require('./routes/ProjectTeamRoutes')
const projectModuleRoutes = require('./routes/ProjectModuleRoutes')
const statusRoutes = require('./routes/StatusRoutes');
const taskRoutes = require("./routes/TaskRoutes")
const userTaskRoutes = require("./routes/UserTaskRoutes")
const developerProjectRoutes = require("./routes/DevelopersByProjectRoutes");
const notificationRoutes = require("./routes/NotificationRoutes");

app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes)
app.use('/projectteam', projectTeamRoutes)
app.use('/projectmodule', projectModuleRoutes)
app.use('/status', statusRoutes)
app.use('/task', taskRoutes)
app.use('/userTask', userTaskRoutes)
app.use('/developer', developerProjectRoutes)
app.use("/notifications", notificationRoutes)


mongoose.connect(process.env.MONGO_URL, {}, (err) => {
    if (err) {
        console.log("error in db connections....")
    } else {
        console.log("db connected....")
    }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})