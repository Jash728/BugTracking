import React from "react";
import { NavLink } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import styled from 'styled-components';


const DeveloperSideBar = (props) => {
  const logout = props.logout;
  const user = props.user;
  return (
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
          <span className="ms-1 font-weight-bold text-white">
            {user.firstname}
          </span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
       

          <li className="nav-item">
            <StyledNavLink
              className="nav-link text-white"
              to="/developer"
              exact
              activeClassName="active"
              isActive={(match, location) => {
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }}
              
            >
              <AccountTreeIcon />
              <span className="nav-link-text ms-2">Projects</span>
            </StyledNavLink>
          </li>

          <li className="nav-item">
            <StyledNavLink
              className="nav-link text-white"
              to="/tasks"
              exact
              activeClassName="active"
              isActive={(match, location) => {
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }}
              
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <BugReportIcon />
              </div>
              <span className="nav-link-text ms-1">Tasks</span>
            </StyledNavLink>
          </li>

          <li className="nav-item">
            <StyledNavLink
              className="nav-link text-white"
              to="/taskstatus"
              exact
              activeClassName="active"
              isActive={(match, location) => {
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }}
              
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <BugReportIcon />
              </div>
              <span className="nav-link-text ms-1">Status</span>
            </StyledNavLink>
          </li>

          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
              Account pages
            </h6>
          </li>

          <li className="nav-item">
            <StyledNavLink
              className="nav-link text-white"
              to="/updateprofile"
              exact
              activeClassName="active"
              isActive={(match, location) => {
                if (match) {
                  return true;
                } else {
                  return false;
                }
              }}
              
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </StyledNavLink>
          </li>

          <li className="nav-item">
            <a
              className="nav-link text-white"
              href="/logout"
              onClick={(e) => logout(e)}
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const StyledNavLink = styled(NavLink)`
  &.active {
    background-color: #DE2567 !important;
  }
`;
export default DeveloperSideBar;