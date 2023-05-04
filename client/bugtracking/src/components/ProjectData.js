import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import ProjectDetailsModal from "./Modals/ProjectDetailsModal";
import UpdateProjectModal from "./Modals/UpdateProjectModal";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function ProjectData(props) {
  var navigate = useNavigate();
  const { projects } = props;
  const searchHandle = props.searchHandle;
  const { reset } = useForm();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const [data, setData] = useState({});
  const [desc, setDesc] = useState("jash");
  // eslint-disable-next-line
  const [projects1, setProjects1] = useState([]);
  const [devs, setDevs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState("");
  const [mySet, setMySet] = useState([]);
  // eslint-disable-next-line
  const [currProject, setCurrProject] = useState("");
  const [currProjectID, setCurrProjectID] = useState("");
  const [showModal1, setShowModal1] = useState(false);

  const submit = (data) => {
    var id = localStorage.getItem("_id");
    data.userid = id;
    axios
      .post("http://localhost:4000/project/project", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    getData();
    setModal(false);
  };

  const pushTeamMember = async () => {
    let data = [currProjectID, JSON.parse(currentMember)._id];
    axios
      .post("http://localhost:4000/projectteam/add", data)
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem("_id",res.data.data[0]?._id)
      })
      .then(() => getTeamMembers(currProjectID))

      .catch((err) => {
        console.log(err);
      });
  };
  const getTeamMembers = async (id) => {
    // eslint-disable-next-line
    let data = [id];
    let newData = [];

    axios
      .get(`http://localhost:4000/projectteam/getbyuserproject/${id}`)
      .then((res) => {
        newData = res.data.data;

        setTeamMembers(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTeamMember = async (e) => {
    e.preventDefault();
    if (currentMember.length === 0 || currentMember === "Developer") {
      alert("Please assign developer name");
      return;
    }

    let currArr = teamMembers;

    let currSet = mySet;

    if (!currSet.includes(JSON.parse(currentMember)._id)) {
      currArr.push(JSON.parse(currentMember));
      currSet.push(JSON.parse(currentMember)._id);
    } else {
      alert("Please select other dev name");
      setCurrentMember("");
      return;
    }
    await pushTeamMember();

    setMySet(currSet);
    setCurrentMember("");
  };
  const getData = () => {
    let id = localStorage.getItem("_id");
    fetch(`http://localhost:4000/project/project/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setProjects1(resp.data))
      .catch((error) => console.log(error));
  };

  const getCurrentTeamMember = (e) => {
    e.preventDefault();
    setCurrentMember(e.target.value);
  };

  const getproductById = (id) => {
    // eslint-disable-next-line
    const projeData = fetch(`http://localhost:4000/project/project/${id}`, {
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

  const handleUpdate = (event) => {
    fetch(`http://localhost:4000/project/project/${data._id}`, {
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
    setModal1(false);
    props.getData();
  };

  const getDeveloperData = () => {
    fetch(`http://localhost:4000/user/user/dev`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setDevs(resp.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    props.getData();
    getDeveloperData();
    // eslint-disable-next-line
  }, [data, modal, teamMembers]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = () => {
    props.onSave(data);
  };

  const openModal1 = (project) => {
    setDesc(project.description);
    setCurrProjectID(project._id);
    getTeamMembers(project._id);
    setShowModal1(true);
  };

  const handleDeleteMember = (id) => {
    
    axios
      .delete(`http://localhost:4000/projectteam/deleteProjectTeam/${id._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        getTeamMembers(currProjectID);
      })
      .then(() => {
        let newSet = mySet.filter((item) => item !== id.userId._id); // filter the mySet array to remove the deleted member ID
        setMySet(newSet); // update the state with the new filtered array
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal1 = () => {
    setDesc("");
    setCurrProjectID("");
    getTeamMembers("");
    setShowModal1(false);
  };

  const handleProject = (project) => {
    // let currPrj = project
    // setCurrProject(currPrj)
  };

  const handleClick = (id) => {
    localStorage.setItem("project_id", id);
    navigate("/projectdetails");
  };
 
  return (
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
                  My Projects
                </h6>
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <div className="input-group input-group-outline">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search project"
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
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Project
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Technology
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Estimated hrs
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                        Start Date
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-5">
                        Completion Date
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length > 0 ? (
                      projects.map?.((project) => (
                        <tr>
                          <td>
                            <div className="d-flex px-1">
                            
                              <ProjectDetailsModal
                                submit={submit}
                                modal1={modal1}
                                modal={modal}
                                setModal={setModal}
                                showModal1={showModal1}
                                closeModal1={closeModal1}
                                desc={desc}
                                teamMembers={teamMembers}
                                devs={devs}
                                prooject={project}
                                getCurrentTeamMember={getCurrentTeamMember}
                                addTeamMember={addTeamMember}
                                handleDeleteMember={handleDeleteMember}
                                getproductById={getproductById}
                              />

                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">
                                  <button
                                    className="nav-link text-body p-1 btn btn-outline-primary"
                                    style={{
                                      marginLeft: "10px",
                                      border: "none",
                                      marginTop: "10px",
                                    }}
                                    onClick={() => {
                                      handleClick(project._id);
                                    }}
                                  >
                                    {project.title}
                                  </button>
                                </h6>
                              </div>

                              <UpdateProjectModal
                                data={data}
                                handleInputChange={handleInputChange}
                                modal1={modal1}
                                setModal1={setModal1}
                                setModal={setModal}
                                handleFormSubmit={handleFormSubmit}
                                handleUpdate={handleUpdate}
                              />
                              <button
                                className="btn btn-link text-secondary mb-0"
                                onClick={() => {
                                  setModal1(true);
                                  handleProject(() => setCurrProject(project));
                                  getproductById(project._id);
                                }}
                              >
                                <EditIcon fontSize="small" color="action" />
                              </button>
                              <button
                                className="btn btn-link text-secondary mb-0"
                                onClick={() => {
                                  openModal1(project ? project : "not found");
                                }}
                              >
                                <AddIcon fontSize="small" color="action" />
                              </button>
                            </div>
                          </td>

                          <td>
                            <p className="text-sm font-weight-bold mb-0">
                              {project.technology}
                            </p>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">
                              {project.estimatedhours}
                            </p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold mb-0">
                              {project.startdate.substr(0, 10)}
                            </span>
                          </td>
                          <td className="align-middle text-center">
                            <div>
                              <span
                                className="me-2 text-xs font-weight-bold"
                              >
                                {project.completiondate.substr(0, 10)}
                              </span>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-link text-secondary mb-0"
                              onClick={() => props.handleDelete(project._id)}
                            >
                              <DeleteIcon color="action" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1>No Projects Found</h1>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectData;
