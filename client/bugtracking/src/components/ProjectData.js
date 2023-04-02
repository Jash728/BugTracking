import React, { useEffect, useState } from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";

function ProjectData(props) {
  const { projects } = props;
  // console.log(projects);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("jash");
  const [projects1, setProjects1] = useState([]);
  const [devs, setDevs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState("");
  const [mySet, setMySet] = useState([]);
  const [currProject, setCurrProject] = useState("");
  const [currProjectID, setCurrProjectID] = useState("");
  const [teamDevelopers, setTeamDevelopers] = useState({});

  // const { register, handleSubmit, reset, setValue } = useForm();

  // const { register, handleSubmit, reset,setValue } = useForm();
  // console.log(data)
  const handleClick = () => {
    setModal(true);
  };
  const submit = (data) => {
    var id = localStorage.getItem("_id");
    data.userid = id;
    // console.log(data);
    axios
      .post("http://localhost:4000/project/project", data)
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem("_id",res.data.data[0]?._id)
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    getData();
    setModal(false);
  };

  const pushTeamMember = async () => {
    console.log(currProjectID);
    let data = [currProjectID, JSON.parse(currentMember)._id];
    console.log("Dhruvil", data);
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

    console.log("Inside getTeamMembers: ",id);
    let data = [id];
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
  const addTeamMember = async (e) => {
    e.preventDefault();
    console.log("XYZ : ", currentMember);
    if (currentMember.length == 0 || currentMember === "Developer") {
      alert("hello");
      return;
    }

    let currArr = teamMembers;
    console.log("Currrrr mem", currArr);

    let currSet = mySet;

    if (!currSet.includes(JSON.parse(currentMember)._id)) {
      currArr.push(JSON.parse(currentMember));
      currSet.push(JSON.parse(currentMember)._id);
    } else {
      alert("hello");
      setCurrentMember("");
      return;
    }
    await pushTeamMember();

    setMySet(currSet);
    // setTeamMembers(currArr);
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
    console.log("curr member1", e.target.value);
    setCurrentMember(e.target.value);
  };

  const getproductById = (id) => {
    const projeData = fetch(`http://localhost:4000/project/project/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log("resp are" ,res.data))
      // .then((res) => setData(res.data))
      .then((res) => {
        const obj = res.data;
        // console.log("obj is", obj);
        setData(obj);
      })

      .catch((error) => console.log(error));
  };

  const handleUpdate = (event) => {
    // console.log("event + ", data);
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
    // return data;
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
    // setTitle("Jas")
    props.getData();
    console.log("data is", data);
    getDeveloperData();
  }, [data, modal, teamMembers]);

  const handleInputChange = (event) => {
    // console.log("event", event.target)
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = () => {
    props.onSave(data);
  };

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const openModal1 = (project) => {
    // setDesc(props.)
    console.log("Modal ", project);
    setDesc(project.description);
    setCurrProjectID(project._id);
    getTeamMembers(project._id);
    setShowModal1(true);
  };

  const handleDeleteMember =(id) =>{
    console.log(id)
    axios
    .delete(`http://localhost:4000/projectteam/deleteProjectTeam/${id}`)
    .then((res) => {
      console.log(res.data);
      // localStorage.setItem("_id",res.data.data[0]?._id)
    })
    .then(()=>{
      getTeamMembers(currProjectID);
    })
    .then(()=>{
      let newSet = mySet.filter((item)=>{
        return item != id;
      } 
      )
      setMySet(newSet)
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">My Projects</h6>
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
                    {projects.map?.((project) => (
                      <tr>
                        {console.log("QWERT", project)}
                        <td>
                          <div className="d-flex px-1">
                            <div>
                              {/* {console.log("Project is" , project)} */}
                              <img
                                src="../assets/img/small-logos/logo-asana.svg"
                                className="avatar avatar-sm rounded-circle me-2"
                                alt="spotify"
                              />
                            </div>
                            <Modal isOpen={showModal1}>
                              <ModalHeader onClick={closeModal1}>
                                Description
                              </ModalHeader>

                              <ModalBody>
                                {/* {project.description} */}

                                <p
                                  style={{
                                    marginTop: "20px",
                                    marginLeft: "20px",
                                    fontSize: "20px",
                                  }}
                                >
                                  -- {desc}
                                </p>
                                
                                <button
                                  className="btn btn-link text-secondary mb-0"
                                  onClick={(e) => {
                                    setModal(true);
                                    getproductById(()=>project._id)

                                  }}
                                >
                                  {teamMembers.length == 0
                                    ? "Add Team Member"
                                    : "Edit Team Members"}
                                </button>

                                <Col sm={6}>
                                  <div className="input-group input-group-outline my-3 mx-5">
                                    <ul>
                                      {teamMembers?.map((member) => {
                                        console.log("qwertyuiop: ",member)
                                        return (
                                          <div>
                                            <li>
                                              {member && member.userId
                                                ? member.userId.firstname
                                                : ""}
                                            </li>
                                          </div>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </Col>

                                <div>
                                  <Modal
                                    size="lg"
                                    isOpen={modal}
                                    toggle={() => setModal(!modal)}
                                  >
                                    <ModalHeader
                                      toggle={() => setModal(!modal)}
                                    >
                                      {teamMembers.length == 0
                                        ? "Add Team Member"
                                        : "Edit Team Members"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <form onSubmit={handleSubmit(submit)}>
                                        <div>
                                          <Col sm={6}>
                                            <div className="input-group input-group-outline my-3">
                                              <select
                                                class="form-select"
                                                aria-label="Default select example"
                                                // placeholder="role"
                                                {...register("role")}
                                                style={{
                                                  padding: "12px",
                                                  color: "#495057",
                                                }}
                                                onChange={(e) =>
                                                  getCurrentTeamMember(e)
                                                }
                                                // placeholder="Add Developers "
                                              >
                                                {console.log(
                                                  "dev is there : ",
                                                  devs
                                                )}
                                                <option selected>
                                                  Developer
                                                </option>

                                                {devs?.map((dev) => {
                                                  return (
                                                    <option
                                                      value={JSON.stringify(
                                                        dev
                                                      )}
                                                    >
                                                      {/* {role.rolename.charAt(0).toUpperCase() +
                                          role.rolename.slice(1)} */}
                                                      {dev.firstname}
                                                    </option>
                                                  );
                                                })}
                                              </select>
                                            </div>
                                            <button
                                              type="submit"
                                              className="btn bg-gradient-primary my-1 mb-2"
                                              onClick={(e) => {
                                                addTeamMember(e);
                                              }}
                                            >
                                              Add Team Member
                                            </button>
                                          </Col>
                                          <Col sm={6}>
                                            <div className="input-group input-group-outline my-3 mx-5">
                                              {/* <ul> */}
                                                <table className="table align-items-center justify-content-center mb-0">
                                                  <thead>
                                                    <tr>
                                                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Member Name
                                                      </th>

                                                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                        Actions
                                                      </th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                  {teamMembers?.map((member) => {
                                                  {/* {console.log("Dani: ", member)} */}
                                                  return (
                                                    <tr>
                                                      <td>
                                                        {member && member.userId
                                                          ? member.userId.firstname
                                                          : ""}
                                                      </td>
                                                      <td>
                                                        <RemoveIcon
                                                          onClick={() =>
                                                              handleDeleteMember(member._id)
                                                          }
                                                        />
                                                      </td>

                                                    </tr>
                                                  );
                                                })}
                                                  </tbody>
                                                </table>
                                                
                                              {/* </ul> */}
                                            </div>
                                          </Col>
                                        </div>
                                      </form>
                                    </ModalBody>
                                  </Modal>
                                </div>
                              </ModalBody>

                              {/* <button on?Click={closeModal1}>Close Modal 1</button> */}
                            </Modal>

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
                                    openModal1(project ? project : "not found")
                                    console.log("mooni: ",project._id)

                                  }
                                  }
                                >
                                  {project.title}
                                </button>
                              </h6>
                            </div>

                            <Modal
                              size="lg"
                              isOpen={modal1}
                              toggle={() => setModal(!modal1)}
                            >
                              <ModalHeader toggle={() => setModal1(!modal1)}>
                                Update Project
                              </ModalHeader>
                              <ModalBody>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                  <div className="input-group input-group-outline my-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Title"
                                      name="title"
                                      value={data ? data.title : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="input-group input-group-outline mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="technology"
                                      name="technology"
                                      value={data ? data.technology : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>

                                  <div className="input-group input-group-outline mb-3">
                                    <textarea
                                      class="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                      placeholder="description"
                                      name="description"
                                      value={data ? data.description : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="input-group input-group-outline mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="estimated hrs"
                                      name="estimatedhours"
                                      value={data ? data.estimatedhours : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div>
                                    <Form.Group
                                      as={Row}
                                      controlId="formHorizontalDateRange"
                                    >
                                      <Form.Label column sm={2}>
                                        Start Date
                                      </Form.Label>
                                      <Col sm={3}>
                                        <Form.Control
                                          type="date"
                                          placeholder="Start Date"
                                          name="startdate"
                                          value={
                                            data && data.startdate
                                              ? data.startdate.substr(0, 10)
                                              : ""
                                          }
                                          onChange={handleInputChange}
                                        />
                                      </Col>
                                      <Form.Label column sm={2}>
                                        End Date
                                      </Form.Label>
                                      <Col sm={3}>
                                        <Form.Control
                                          type="date"
                                          placeholder="End Date"
                                          name="completiondate"
                                          value={
                                            data && data.completiondate
                                              ? data.completiondate.substr(
                                                  0,
                                                  10
                                                )
                                              : ""
                                          }
                                          onChange={handleInputChange}
                                        />
                                      </Col>
                                    </Form.Group>
                                  </div>
                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className="btn bg-gradient-primary  w-15 my-5 mb-2"
                                      onClick={handleUpdate}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </ModalBody>
                            </Modal>

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
                              // style={{ marginRight: "50px" }}
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
                    ))}
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
