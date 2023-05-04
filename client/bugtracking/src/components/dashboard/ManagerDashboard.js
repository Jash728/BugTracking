import axios from "axios";
import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import ProjectData from "../ProjectData";
import { useNavigate } from "react-router-dom";
import SideBar from "../pages/sidebar/ManagerSideBar";
import DashBoardNavbar from "../pages/navbar/DashBoardNavbar";
import CreateProjectModal from "../Modals/CreateProjectModal";

const ManagerDashboard = () => {
  const [user, setuser] = useState("");
  const [modal, setModal] = useState(false);
  const { reset } = useForm();
  var navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  // eslint-disable-next-line
  const [devs, setDevs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({});

  const getData = () => {
    let id = localStorage.getItem("_id");
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
    let user = localStorage.getItem("_id");
    if (!user) {
      navigate("/login");
    }
    getLoggedinUserData();
    getDeveloperData();
    // eslint-disable-next-line
  }, []);

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

  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/project/project/${id}`)
      .then((response) => {
        setProjects(projects.filter((item) => item._id !== id)); // remove deleted item from state
      })
      .catch((error) => {
        // handle error
        console.log("Error deleting data:", error);
      });
  }
  // eslint-disable-next-line
  const handleUpdate = async (formData, id) => {
    try {
      await axios.put(`http://localhost:4000/project/project/${id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };
// eslint-disable-next-line
  const addTeamMember = (e) => {
    e.preventDefault();

    let currArr = teamMembers;
    currArr.push(currentMember);
    setTeamMembers(currArr);
    setCurrentMember("");
  };
// eslint-disable-next-line
  const getCurrentTeamMember = (e) => {
    e.preventDefault();
    setCurrentMember(e.target.value);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setuser("");
    setProjects("");
    navigate("/login");
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/project/search/${key}`);
      result = await result.json();
      if (result) {
        setProjects(result);
      }
    }
    else{
      getData();
    }

    // console.warn(event.target.value);
  };
  return (
    <body
      className="g-sidenav-show   overflow-hidden bg-gray-200"
      style={{ overflow: "hidden" }}
    >
      {/* side navbar */}
      <SideBar logout={logout} />
      {/* --------------------------------------------------------------------------------------- */}
      {/* // top Navbar */}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* Navbar */}
        <DashBoardNavbar user={user} />

        <br />
        <div>
          <ProjectData
            projects={projects}
            handleDelete={handleDelete}
            getData={getData}
            searchHandle={searchHandle}
          />
        </div>
        <CreateProjectModal
          submit={submit}
          getData={getData}
          modal={modal}
          setModal={setModal}
        />
        <div style={{ float: "right", marginRight: "20px" }}>
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

        {/* End Navbar */}
      </main>
    </body>
  );
};

export default ManagerDashboard;
