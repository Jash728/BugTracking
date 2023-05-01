import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sidebar/ManagerSideBar";
import DashBoardNavbar from "./navbar/DashBoardNavbar";
import { useForm } from "react-hook-form";
import CreateTaskModal from "../Modals/CreateTaskModal";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaskModal from "../Modals/UpdateTaskModal";
import EditIcon from "@mui/icons-material/Edit";

import ShowUserModal from "../Modals/ShowUserModal";

const ModuleDetails = () => {
  const [user, setuser] = useState("");
  const [tasks, setTasks] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const {  reset } = useForm();
  const [data, setData] = useState({});
  const [modal1, setModal1] = useState(false);
  const [assigndevs, setAssigndevs] = useState([]);
  const [currTask, setCurrTask] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState("");
  const [showModal1, setShowModal1] = useState(false);


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

  const getTeamMembers = async () => {
    let id = localStorage.getItem("project_id");
    let newData = [];

    axios
      .get(`http://localhost:4000/projectteam/getbyuserproject/${id}`)
      .then((res) => {
        console.log("Get Data Devs", res);
        // localStorage.setItem("_id",res.data.data[0]?._id)
        newData = res.data.data;
        console.log("senor hola ", newData);

        setTeamMembers(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTaskData = () => {
    var id = localStorage.getItem("module_id");
    fetch(`http://localhost:4000/task/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setTasks(resp.data))
      .then((resp) => console.log("task is", resp))
      .catch((error) => console.log(error));
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    let id = localStorage.getItem("module_id");
    if (key) {
      let result = await fetch(
        `http://localhost:4000/task/${id}/search/${key}`
      );
      result = await result.json();
      if (result) {
        setTasks(result);
      }
    } else {
      getTaskData();
    }
  };

  const submit = (data) => {
    var id = localStorage.getItem("module_id");
    data.moduleId = id;
    console.log(data);
    axios
      .post("http://localhost:4000/task/task", data)
      .then((res) => {
        console.log("Task is ", res.data);
        // localStorage.setItem("_id",res.data.data[0]?._id)
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    getTaskData();
    setModal(false);
  };

  const assignusertotask = (id) => {
    console.log("Assign Task", id);
    console.log("current Member", currentMember.userId._id);
    const userid = currentMember.userId._id;
    const projectid = localStorage.getItem("project_id")
    // console.log("user id", userid.userId._id)
    let dataArr = [userid, id, projectid];
    axios
      .post("http://localhost:4000/userTask/userTask", dataArr)
      .then((res) => {
        console.log("Task is ", res.data);
        // localStorage.setItem("_id",res.data.data[0]?._id)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  function handleDelete(id) {
    console.log("item deleted");
    axios
      .delete(`http://localhost:4000/task/task/${id}`)
      .then((response) => {
        // handle success
        console.log("Data deleted successfully");
        setTasks(module.filter((item) => item._id !== id)); // remove deleted item from state
      })
      .catch((error) => {
        // handle error
        console.log("Error deleting data:", error);
      });
    getTaskData();
  }

  const handleUpdate = (event) => {
    fetch(`http://localhost:4000/task/task/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      getTaskData();
    setModal1(false);
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = () => {
    //   onSave(data);
  };

  const handleTask = (project) => {
    // let currPrj = project
    // setCurrProject(currPrj)
  };

  const gettaskById = (id) => {
    fetch(`http://localhost:4000/task/taskbyModule/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const obj = res.data;
        setData(obj);
      })

      .catch((error) => console.log(error));
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const showAssginMembers = (id) => {
    console.log("assign id", id);
    fetch(`http://localhost:4000/userTask/userTask/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const obj = res.data;
        console.log("devs", obj);
        setAssigndevs(obj);
      })

      .catch((error) => console.log(error));
    setModal2(true);
  };

  const handleOnChange = (e, id) => {
    e.preventDefault();
    console.log("task id", id);
    gettaskById(id);
    console.log("assign member1", JSON.parse(e.target.value));
    setCurrentMember(JSON.parse(e.target.value));
  };

  function formatMinutes(totalMinutes) {
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    // const minutes = totalMinutes % 60;

    return `${days} days ${hours} hours `;
  }

  const deleteUserfromtask = (id) => {
    console.log("delete user", id);
    axios
      .delete(`http://localhost:4000/userTask/userTask/${id}`)
      .then((response) => {
        // handle success
        console.log("Data deleted successfully");
        setAssigndevs(module.filter((item) => item._id !== id)); // remove deleted item from state
      })
      .catch((error) => {
        // handle error
        console.log("Error deleting data:", error);
      });
    showAssginMembers(id);
  };

  useEffect(() => {
    getTaskData();
    getLoggedinUserData();
    getTeamMembers();
    
  }, []);
  return (
    <body
      className="g-sidenav-show   overflow-hidden bg-gray-200"
      style={{ overflow: "hidden" }}
    >
      {/* side navbar */}
      <SideBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <DashBoardNavbar user={user} />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div
                    className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <h6
                      className="text-white text-capitalize ps-3"
                      style={{ marginRight: "20px" }}
                    >
                      All Tasks
                    </h6>
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                      <div className="input-group input-group-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search tasks"
                          style={{ color: "white" }}
                          onChange={searchHandle}
                        />
                      </div>
                      <style>
                        {`
          ::placeholder {
            color: white;
          }
        `}
                      </style>
                    </div>
                  </div>
                </div>
                <CreateTaskModal
                  submit={submit}
                  getTaskData={getTaskData}
                  modal={modal}
                  setModal={setModal}
                />
                <UpdateTaskModal
                  data={data}
                  handleInputChange={handleInputChange}
                  modal1={modal1}
                  setModal1={setModal1}
                  setModal={setModal}
                  handleFormSubmit={handleFormSubmit}
                  handleUpdate={handleUpdate}
                />

                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                            Title
                          </th>

                         

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            description
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                            Status
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                            Total Time
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                            Team Members
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                            Assign Members
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map?.((task) => (
                          <tr key={task._id}>
                            {/* {console.log("module name", module)} */}
                            <td>
                              <div className="d-flex px-1">
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">
                                    <button
                                      className="nav-link text-body p-1 btn btn-outline-primary"
                                      // onClick={()=>handleClick(task._id)}
                                      style={{
                                        marginLeft: "10px",
                                        border: "none",
                                        marginTop: "10px",
                                      }}
                                    >
                                      {task.title}
                                    </button>
                                  </h6>
                                </div>
                                <button
                                  className="btn btn-link text-secondary mb-0"
                                  onClick={() => {
                                    setModal1(true);
                                    handleTask(() => setCurrTask(task));
                                    gettaskById(task._id);
                                  }}
                                >
                                  <EditIcon fontSize="small" color="action" />
                                </button>
                              </div>
                            </td>
                            
                            <td>
                              <p className="text-sm font-weight-bold mb-0">
                                {task.description}
                              </p>
                            </td>

                            <td>
                              <div>
                                <span
                                  className="me-2 text-xs font-weight-bold"
                                  // style={{ marginRight: "50px" }}
                                >
                                  {task.status.statusname}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="text-sm font-weight-bold mb-0">
                                {formatMinutes(task.totalMinutes)}
                              </span>
                            </td>
                            <td className="input-group input-group-outline mb-3 d-flex flex-column">
                              <div style={{ width: "70%" }}>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  onChange={(e) => handleOnChange(e, task._id)}
                                  style={{ padding: "12px", color: "#495057" }}
                                >
                                  <option selected>Members</option>
                                  {teamMembers?.map((member) => {
                                    return (
                                      <option
                                        value={
                                          member && member.userId
                                            ? JSON.stringify(member)
                                            : ""
                                        }
                                      >
                                        {member && member.userId
                                          ? member.userId.firstname
                                          : ""}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "-40px",
                                  width: "100%",
                                }}
                              >
                                <button
                                  style={{ width: "70%" }}
                                  type="button"
                                  class="btn btn-danger btn-sm"
                                  onClick={() => assignusertotask(task._id)}
                                >
                                  Assign
                                </button>
                              </div>
                            </td>
                            <td>
                              <button
                                style={{ width: "70%" }}
                                type="button"
                                class="btn btn-danger btn-sm"
                                onClick={() => showAssginMembers(task._id)}
                              >
                                show assign developer
                              </button>
                              <ShowUserModal
                                modal2={modal2}
                                setModal2={setModal2}
                                assigndevs={assigndevs}
                                deleteUserfromtask={deleteUserfromtask}
                              />
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                onClick={() => handleDelete(task._id)}
                              >
                                <DeleteIcon color="action" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              float: "right",
              marginRight: "20px",
              paddingTop: "15px",
            }}
          >
            <li className="nav-item px-3 d-flex align-items-center">
              <button
                class="btn btn-danger"
                onClick={() => setModal(true)}
                style={{ float: "left" }}
              >
                <AddIcon /> Add Task
              </button>

              <span
                className="d-sm-inline d-none"
                style={{ marginLeft: "5px" }}
              ></span>
            </li>
          </div>
        </div>
      </main>
    </body>
  );
};

export default ModuleDetails;
