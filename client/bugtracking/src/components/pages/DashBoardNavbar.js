import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DashBoardNavbar = (props) => {
  const user = props.user;
  const urlPath = window.location.pathname; // "/developer"
  const pname = urlPath.substring(1); // "developer"
  const SERVER_URL = "http://localhost:4000";
  const navigate = useNavigate();

  const imagePath = `${SERVER_URL}/uploads/`;
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
              <img
                onClick={() => navigate("/profile")}
                src={`${imagePath}${user.profile}`}
                alt=""
                style={{
                  height: "20px",
                  width: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
              />
              <span className="d-sm-inline d-none">{user.firstname}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default DashBoardNavbar;
