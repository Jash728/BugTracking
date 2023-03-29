import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserReg = () => {
  const { register, handleSubmit, reset} = useForm();
  const [roles, setroles] = useState();

  const submit = (data) => {
    axios
      .post("http://localhost:4000/user/user", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                          {/* <option selected>Role</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option> */}
                        </select>
                        {/* <div className="input-group input-group-outline mb-3">
                          <label>Role</label>
                          {roles?.map((role) => {
                            return (
                              <div
                                style={{ display: "flex",paddingLeft: "20px", flexDirection:"row" }}
                              >
                                <input
                                  type="radio"
                                  value={role._id}
                                  {...register("role")}
                                  style={{ cursor: "pointer", paddingTop:"10px", paddingBottom:"10px" }}
                                />
                                <label style={{ marginRight: "25px", paddingBlock:"0px"}}>
                                  {role.rolename}
                                </label>
                              </div>
                            );
                          })}
                        </div> */}
                        {/* <div className="form-check form-check-info text-start ps-0">
                          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" defaultChecked />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            I agree the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
                          </label>
                        </div> */}
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
                        <a
                          href="/login"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign in
                        </a>
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
