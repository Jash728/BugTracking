import React, { useState, useEffect } from "react";
import DeveloperSideBar from "../sidebar/DeveloperSidebar";
import DashBoardNavbar from "../navbar/DashBoardNavbar";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const statusId = new ObjectId("6431cc48af10c92d6dcf96fb");

const ShowStatus = () => {
  const [tasks, setTasks] = useState();
  const [user, setuser] = useState("");
  const [totalMinutes, setTotalMinutes] = useState(0);
  var navigate = useNavigate();

  const getLoggedinUserData = () => {
    var id = localStorage.getItem("_id");
    axios
      .get("http://localhost:4000/user/user/" + id)
      .then((res) => {
        // console.log(res.data.data);
        setuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTasks = async () => {
    let id = localStorage.getItem("_id");
    console.log("Developer's ", id);
    await fetch(`http://localhost:4000/developer/developerTask/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Developer's task ", resp.data);
        setTasks(resp.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async (task) => {
    console.log("Task id", task._id);
    try {
      const resp = await axios.put(
        `http://localhost:4000/developer/tasks/${task._id}`,
        {
          status: statusId,
        }
      );
      console.log(resp);

      const createdAt = new Date(task.createdAt);
      const updatedAt = new Date(task.updatedAt);
      // console.log("updated At", createdAt, updatedAt)
      const diffMillis = updatedAt - createdAt;
      const diffMinutes = Math.round(diffMillis / 1000 / 60);
      const newTotalMinutes = task.totalMinutes - diffMinutes;
      console.log("updated At", createdAt, updatedAt, Math.abs(newTotalMinutes), typeof(newTotalMinutes))

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
  }, []);

  const logout = (e) => {
    e.preventDefault();
    console.log("Jash");
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

          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Tasks</h3>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <Table
                  className="table align-items-center justify-content-center mb-0"
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th
                        className="text-uppercase text-white text-xxs font-weight-bolder opacity-7"
                        style={{ width: "50%", backgroundColor: "#DE2567" }}
                      >
                        To Do
                      </th>
                      <th
                        className="text-uppercase text-white text-xxs font-weight-bolder opacity-7"
                        style={{ width: "50%", backgroundColor: "#DE2567" }}
                      >
                        Complete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks &&
                      tasks.map((task) => (
                        <tr key={task._id}>
                          <td>
                            <div className="d-flex px-1">
                              {task.taskId?.status.statusname === "pending" ? (
                                <>
                                  {task.taskId.title}
                                  <button
                                    onClick={() => handleDelete(task.taskId)}
                                    className="btn btn-sm btn-success ms-3"
                                  >
                                    Done
                                  </button>
                                </>
                              ) : null}
                            </div>
                          </td>
                          <td>
                            {task.taskId?.status.statusname === "complete"
                              ? task.taskId.title
                              : null}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          {/* End Navbar */}
        </main>
      </body>
    </div>
  );
};

export default ShowStatus;
