import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setuser] = useState("");
  const SERVER_URL = "http://localhost:4000";

  const imagePath = `${SERVER_URL}/uploads/`;
  const defaultPath = "../assets/img/";

  const getLoggedinUserData = () => {
    var id = localStorage.getItem("_id");
    axios
      .get("http://localhost:4000/user/user/" + id)
      .then((res) => {
        console.log("----", res.data.data);
        setuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLoggedinUserData();
  }, [user]);

  return (
    <div className="container-fluid px-2 px-md-4">
      <div
        className="page-header min-height-300 border-radius-xl mt-4"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <span className="mask  bg-gradient-primary  opacity-6" />
      </div>
      <div className="card card-body mx-3 mx-md-4 mt-n6">
        <div className="row gx-4 mb-2">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <img
                src={
                  user.profile ? user.profile : `${defaultPath}bruce-mars.jpg`
                }
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">{user.firstname}</h5>
              <p className="mb-0 font-weight-normal text-sm">
                {/* {user.role} */}
                {user.role && user.role.rolename}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col-12">
              <div className="card card-plain h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div class="col-md-4 text-end">
                      <Link to="/updateprofile">
                        <i
                          class="fas fa-user-edit text-secondary text-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit Profile"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <p className="text-sm">
                    Hi, I’m {user.firstname} and I am{" "}
                    {user.role && user.role.rolename}.
                  </p>
                  <hr className="horizontal gray-light my-4" />
                  <ul className="list-group">
                    <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                      <strong className="text-dark">Full Name:</strong> &nbsp;
                      {user.firstname}
                    </li>

                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Email:</strong> &nbsp;
                      {user.email}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Location:</strong> &nbsp;
                      India
                    </li>
                    <li className="list-group-item border-0 ps-0 pb-0">
                      <strong className="text-dark text-sm">Social:</strong>{" "}
                      &nbsp;
                      <Link
                        className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                        
                      >
                        <i className="fab fa-facebook fa-lg" />
                      </Link>
                      <Link
                        className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                        
                      >
                        <i className="fab fa-twitter fa-lg" />
                      </Link>
                      <Link
                        className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                        
                      >
                        <i className="fab fa-instagram fa-lg" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
