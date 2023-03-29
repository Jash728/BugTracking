import axios from "axios";
import React, { useEffect, useState } from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddIcon from "@mui/icons-material/Add";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import ProjectData from "../ProjectData";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate } from "react-router-dom";

const DevDashboard = () => {
  const [user, setuser] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedData, setSelectedData] = useState({});
  var navigate = useNavigate()
  const [projects, setProjects] = useState([]);



  const getData = () => {
    let id = localStorage.getItem("_id")
    fetch(`http://localhost:4000/project/project/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
    
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setProjects(resp.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
    getLoggedinUserData();
  }, []);

  const getLoggedinUserData = () => {
    var id = localStorage.getItem("_id");
    axios
      .get("http://localhost:4000/user/user/" + id)
      .then((res) => {
        console.log(res.data.data);
        setuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = (data) => {
    var id = localStorage.getItem("_id");
    data.userid = id;
    console.log(data)
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
    setModal(false)
  };
  // useEffect(() => {
  //   getLoggedinUserData();
  // }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/project/project/${id}`)
      .then((response) => {
        // handle success
        console.log("Data deleted successfully");
        setProjects(projects.filter((item) => item._id !== id)); // remove deleted item from state
      })
      .catch((error) => {
        // handle error
        console.log("Error deleting data:", error);
      });
  }

  const handleUpdate = async (formData, id) => {
    try {
      await axios.put(`http://localhost:4000/project/project/${id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };


  const logout = (e)=>{
    e.preventDefault();
    console.log("Jash")
    localStorage.clear();
    setuser("")
    setProjects("")
    navigate("/login")
    
  }
  return (
    <body
      className="g-sidenav-show   overflow-hidden bg-gray-200"
      style={{ overflow: "hidden" }}
    >
      {/* side navbar */}
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <a
            className="navbar-brand m-0"
            href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
            target="_blank"
          >
            <img
              src="../assets/img/logo-ct.png"
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span className="ms-1 font-weight-bold text-white">Developer</span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-white active bg-gradient-primary"
                href="../pages/dashboard.html"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white " href="../pages/tables.html">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <BugReportIcon />
                </div>
                <span className="nav-link-text ms-1">Bugs</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white " href="/devform">
                <AccountTreeIcon />
                <span className="nav-link-text ms-2">Projects</span>
              </a>
            </li>

            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white " href="../pages/profile.html">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <span className="nav-link-text ms-1">Profile</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white " href="/login">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">login</i>
                </div>
                <span className="nav-link-text ms-1">Sign In</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white " href="/userreg">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">assignment</i>
                </div>
                <span className="nav-link-text ms-1">Sign Up</span>
              </a>
            </li>
            
          </ul>
        </div>
      </aside>
      {/* --------------------------------------------------------------------------------------- */}
      {/* // top Navbar */}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* Navbar */}

        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
          id="navbarBlur"
          data-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="opacity-5 text-dark" href="javascript:;">
                    Pages
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Dashboard
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Dashboard</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 "
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group input-group-outline">
                  <label className="form-label">Type here...</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <i className="fa fa-user me-sm-1" />
                  <span className="d-sm-inline d-none">{user.firstname}</span>
                </li>
                <div>
                  <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                  >
                    <ModalHeader toggle={() => setModal(!modal)}>
                      Create Project
                    </ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(submit)}>
                        <div className="input-group input-group-outline my-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            {...register("title")}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="technology"
                            {...register("technology")}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="description"
                            {...register("description")}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="estimated hrs"
                            {...register("estimatedhours")}
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
                                {...register("startdate")}
                              />
                            </Col>
                            <Form.Label column sm={2}>
                              End Date
                            </Form.Label>
                            <Col sm={3}>
                              <Form.Control
                                type="date"
                                placeholder="End Date"
                                {...register("completiondate")}
                              />
                            </Col>
                          </Form.Group>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-primary  w-15 my-5 mb-2"
                            onClick={getData}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </ModalBody>
                  </Modal>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div>
          <ProjectData
            projects={projects}
            handleDelete={handleDelete}
            getData={getData}
          />
        </div>
        <div style={{float:"right", marginRight:"20px"}}>
          <li className="nav-item px-3 d-flex align-items-center">
            <button
              class="btn btn-danger"
              onClick={() => setModal(true)}
              style={{ float: "left" }}
            >
              <AddIcon /> Add Project
            </button>

            <span
              className="d-sm-inline d-none"
              style={{ marginLeft: "5px" }}
            ></span>
          </li>
        </div>
        <li className="nav-item">
              <a className="nav-link text-white " href="/logout">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">assignment</i>
                </div>
                <button className="nav-link-text ms-1" onClick={(e)=>logout(e)}>Logout</button>
              </a>
            </li>
        {/* End Navbar */}
      </main>
    </body>
  );
};

export default DevDashboard;
