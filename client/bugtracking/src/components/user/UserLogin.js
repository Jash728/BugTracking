import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Footer from "../pages/Footer";
import Navbar from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserLogin = () => {

  const { register, handleSubmit, reset } = useForm();
  var navigate = useNavigate()
  const submit = (data)=>{
    
    axios.post('http://localhost:4000/user/user/login',data).then((res)=>{
        if(res.data.data){
            console.log("user found....")
            //console.log(res.data.data[0].role.name)
            console.log(res.data.data?._id)
            localStorage.setItem("_id",res.data.data?._id)
            // localStorage.setItem("token", res.data.token);
            localStorage.setItem("rolename", res.data.data.role.rolename)
            console.log(res.data.data?.role.rolename)
            // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            if(res.data.data?.role.rolename ==="manager"){
                navigate("/manager")
            }
            else if(res.data.data?.role.rolename ==="developer"){
              navigate("/developer")
            }
            else{
              navigate("/developer")
            }
            //role...
            
        }
        
    }).catch((err)=>{
        console.log("user not found....")
        alert("user not found....")
    })
    reset();
  }

  return (
    <div>
      <Navbar />
      <main className="main-content  mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-facebook text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-github text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-google text-white text-lg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(submit)}>
                      <div className="input-group input-group-outline my-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          {...register("email")}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          {...register("password")}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-primary w-100 my-4 mb-2"
                        >
                          Sign in
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Don't have an account?
                        <Link
                          to="/userreg"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
