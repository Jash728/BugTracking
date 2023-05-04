import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotifcationModal from "../../Modals/NotifcationModal";
import axios from "axios";

const DashBoardNavbar = (props) => {
  const user = props.user;
  const urlPath = window.location.pathname; 
  const pname = urlPath.substring(1); 
  const navigate = useNavigate();
  const [modal2, setModal2] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState("");

  const getUserRole = () => {
    setUserRole(localStorage.getItem("rolename"));
  };

  const getUserNotifications = async () => {
    const userid = localStorage.getItem("_id");
    setInterval(() => {
      axios
        .get(`http://localhost:4000/notifications/notifications/${userid}`)
        .then((res) => {
          setNotifications(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };
  const handleNotifications = () => {
    setModal2(true);
    getUserNotifications();
  };

  useEffect(() => {
    getUserRole();
    getUserNotifications();
  }, []);

  useEffect(() => {}, [user, notifications]);

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
               {/* eslint-disable-next-line */}
              <a className="opacity-5 text-dark" href="javascript:;">
                Pages
              </a>
            </li>
            <li
              className="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              {pname.charAt(0).toUpperCase() + pname.slice(1)}
            </li>
          </ol>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 "
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline">
              {/* <label className="form-label">Type here...</label> */}
              {/* <input type="text" className="form-control" /> */}
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              {userRole !== "manager" && (
                <>
                  <div style={{ position: "relative" }}>
                    <NotificationsIcon onClick={handleNotifications} style={{ cursor:"pointer"}}/>
                    {notifications.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          backgroundColor: "#DE2567",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                      >
                        {notifications.length}
                      </div>
                    )}
                  </div>
                </>
              )}

              <NotifcationModal
                modal2={modal2}
                setModal2={setModal2}
                notifications={notifications}
                setNotifications={setNotifications}
              />
              <img
                onClick={() => navigate("/profile")}
                src={
                  user.profile ? user.profile : "../assets/img/bruce-mars.jpg"
                }
                alt=""
                style={{
                  height: "40px",
                  width: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                  cursor: "pointer",
                  marginLeft: "10px", // add margin to the left of the image
                }}
              />
              <span className="d-sm-inline d-none" style={{fontWeight: "bold"}}>{user.firstname}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default DashBoardNavbar;
