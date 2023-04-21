import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const statusId = new ObjectId("6431cc48af10c92d6dcf96fb");


const ShowStatus = () => {
  const [tasks, setTasks] = useState();

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
    console.log("Task id", task._id)
    try {
      const resp = await axios.put(`http://localhost:4000/developer/tasks/${task._id}`, {
        status: statusId,
      });
      console.log(resp);
      const updatedTask = {
        ...task,
        taskId: { ...task.taskId._id, status: "complete" },
      };
      setTasks((prevState) => prevState.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (error) {
      console.log(error);
    }

    getTasks();
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>
                  {task.taskId?.status.statusname === "pending" ? (
                    <>
                      {task.taskId.title}
                      <button onClick={() => handleDelete(task.taskId)}>
                        Delete
                      </button>
                    </>
                  ) : null}
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
  );
};

export default ShowStatus;
