import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../pages/Navbar";
import {  useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const UserReg = () => {
  const { register, handleSubmit, reset} = useForm();
  const [roles, setroles] = useState();
  const navigate = useNavigate()

  const submit = (data) => {
    axios
      .post("http://localhost:4000/user/user", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Registration Successful!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Error!  ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
     
      reset();
  };
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    axios.get("http://localhost:4000/role/get").then((res) => {
      //console.log(res.data.data)
      setroles(res.data.data);
    });
  };

  return (
    <div>
      <Navbar />
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage:
                        'url("../assets/img/illustrations/illustration-signup.jpg")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div className="card card-plain">
                    <div className="card-header">
                      <h4 className="font-weight-bolder">Sign Up</h4>
                      <p className="mb-0">
                        Enter your email and password to register
                      </p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(submit)}>
                        <div className="input-group input-group-outline mb-3">
                          {/* <label className="form-label">Name</label> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            {...register("firstname")}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            {...register("email")}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            {...register("password")}
                          />
                        </div>
                       
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          // placeholder="role"
                          {...register("role")}
                          style={{ padding: "12px", color: "#495057" }}
                        >
                          <option selected>Role</option>
                          {roles?.map((role) => {
                            return (
                              <option value={role._id}>
                                {role.rolename.charAt(0).toUpperCase() +
                                  role.rolename.slice(1)}
                              </option>
                            );
                          })}
                        </select>
                      
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-2 text-sm mx-auto">
                        Already have an account?
                        <Link
                          to="/login"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
