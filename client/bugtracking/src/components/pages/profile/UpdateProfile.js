import React, {useState, useEffect} from "react";
import UpdateUserForm from "./UpdateUserForm";
import DeveloperSideBar from "../sidebar/DeveloperSidebar";
import DashBoardNavbar from "../navbar/DashBoardNavbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ManagerSideBar from "../sidebar/ManagerSideBar";

const UpdateProfile = () => {
    const [user, setuser] = useState("");
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

  useEffect(() => {
    let user = localStorage.getItem("_id");
    if (!user) {
      navigate("/login");
    }
    
    getLoggedinUserData();
    
   // eslint-disable-next-line
  }, []);


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
        {user && user.role && user.role.rolename === 'developer' ? <DeveloperSideBar logout={logout} user={user}/> : <ManagerSideBar logout={logout} />}
        {/* --------------------------------------------------------------------------------------- */}
        {/* // top Navbar */}
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          {/* Navbar */}
          <DashBoardNavbar user={user} />

          <br />

          <div>
            <UpdateUserForm/>
          </div>
          {/* End Navbar */}
        </main>
      </body>
    </div>
  );
};

export default UpdateProfile;
