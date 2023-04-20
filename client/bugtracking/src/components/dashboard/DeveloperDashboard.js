import React, {useState, useEffect} from 'react'
import DeveloperSideBar from "../pages/sidebar/DeveloperSidebar";
import DashBoardNavbar from "../pages/navbar/DashBoardNavbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ShowDevProjects from '../pages/developer/ShowDevProjects';

const DeveloperDashboard = () => {

  const [user, setuser] = useState("");
  var navigate = useNavigate();
  const [devProjects, setDevProjects] = useState([]);
  const [devTasks, setDevTasks] = useState([]);


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


  const getProjects = async() => {
    let id = localStorage.getItem('_id');
    console.log("Developer's ", id)
    await fetch(`http://localhost:4000/developer/developer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Developer's resp ", resp.data);
        setDevProjects(resp.data)
        
      })
      .catch((error) => console.log(error));
    
  }

  const getTasks = async() => {
    let id = localStorage.getItem('_id');
    console.log("Developer's ", id)
    await fetch(`http://localhost:4000/developer/developerTask/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Developer's resp ", resp.data);
        setDevTasks(resp.data)
        
      })
      .catch((error) => console.log(error));
    
  }

  useEffect(() => {
    let user = localStorage.getItem("_id");
    if (!user) {
      navigate("/login");
    }
    getProjects();
    getLoggedinUserData();
    
   
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
     

      <DeveloperSideBar logout={logout} user = {user} />
    
      {/* --------------------------------------------------------------------------------------- */}
      {/* // top Navbar */}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* Navbar */}
        <DashBoardNavbar user = {user}/>

        <br />
       
      <div>

        <ShowDevProjects devProjects={devProjects}/>
      </div>
     
        {/* End Navbar */}

       

        
      </main>
     
    </body>
    </div>
  )
}

export default DeveloperDashboard
