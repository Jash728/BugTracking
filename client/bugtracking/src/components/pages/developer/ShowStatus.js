import React, { useState, useEffect } from "react";
import DeveloperSideBar from "../sidebar/DeveloperSidebar";
import DashBoardNavbar from "../navbar/DashBoardNavbar";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Showtaskstatus from "./Showtaskstatus";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const statusId = new ObjectId("6431cc48af10c92d6dcf96fb");

const ShowStatus = () => {
  const [tasks, setTasks] = useState();
  const [user, setuser] = useState("");
  // eslint-disable-next-line
  const [totalMinutes, setTotalMinutes] = useState(0);
  var navigate = useNavigate();

  const getLoggedinUserData = () => {
    var id = localStorage.getItem("_id");
    axios
      .get("http://localhost:4000/user/user/" + id)
      .then((res) => {
        setuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTasks = async () => {
    let id = localStorage.getItem("_id");
    await fetch(`http://localhost:4000/developer/developerTask/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async (task) => {
    try {
      // eslint-disable-next-line
      const resp = await axios.put(
        `http://localhost:4000/developer/tasks/${task._id}`,
        {
          status: statusId,
        }
      );

      const createdAt = new Date(task.createdAt);
      const updatedAt = new Date(task.updatedAt);
      const diffMillis = updatedAt - createdAt;
      const diffMinutes = Math.round(diffMillis / 1000 / 60);
      const newTotalMinutes = task.totalMinutes - diffMinutes;

      const updatedTask = {
        ...task,
        taskId: { ...task.taskId._id, status: "complete" },
        totalMinutes: Math.abs(newTotalMinutes),
      };
      setTasks((prevState) =>
        prevState.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
      const updatedTaskCreatedAt = new Date(updatedTask.taskId.createdAt);
      const updatedTaskUpdatedAt = new Date(updatedTask.taskId.updatedAt);
      const updatedTaskMinutes = Math.floor(
        (updatedTaskUpdatedAt - updatedTaskCreatedAt) / (1000 * 60)
      );
      setTotalMinutes((prevState) => prevState - updatedTaskMinutes);
    } catch (error) {
      console.log(error);
    }

    getTasks();
  };
  useEffect(() => {
    let user = localStorage.getItem("_id");
    if (!user) {
      navigate("/login");
    }
    getTasks();
    getLoggedinUserData();
    // eslint-disable-next-line
  },[]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setuser("");
    navigate("/login");
  };

  return (
    <div>
      <body
        className="g-sidenav-show   overflow-hidden bg-gray-200"
        style={{ overflow: "hidden" }}
      >
        {/* side navbar */}
        <DeveloperSideBar logout={logout} user={user} />
        {/* --------------------------------------------------------------------------------------- */}
        {/* // top Navbar */}
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          {/* Navbar */}
          <DashBoardNavbar user={user} />

          <br />

          <div>
            <Showtaskstatus tasks={tasks} handleDelete={handleDelete}/>
          </div>
          
          {/* End Navbar */}
        </main>
      </body>
    </div>
  );
};

export default ShowStatus;
