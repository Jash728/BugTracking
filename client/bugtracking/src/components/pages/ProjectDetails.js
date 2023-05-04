import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../pages/sidebar/ManagerSideBar";
import DashBoardNavbar from "../pages/navbar/DashBoardNavbar";
import ProjectModule from "./ProjectModule";

function ProjectDetails() {
  const [user, setuser] = useState("");
  const [selectedProject, setSelectedProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const getProjectData = async () => {
    let id = localStorage.getItem("project_id");
    await fetch(`http://localhost:4000/project/project/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        let tempid = resp.data;
        setSelectedProject(tempid);
      })
      .catch((error) => console.log(error));
  };

  const getTeamMembers = async () => {
    let id = localStorage.getItem("project_id");
    let newData = [];

    axios
      .get(`http://localhost:4000/projectteam/getbyuserproject/${id}`)
      .then((res) => {
        newData = res.data.data;

        setTeamMembers(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    getProjectData();
    getTeamMembers();
  }, );

  useEffect(() => {
    getLoggedinUserData();
  }, []);

  return (
    <body
      className="g-sidenav-show   overflow-hidden bg-gray-200"
      style={{ overflow: "hidden" }}
    >
      {/* side navbar */}
      <SideBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <DashBoardNavbar user={user} />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">
                      My Projects
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Project
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Technology
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Estimated hrs
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                            Start Date
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                            Completion Date
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                            Member Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      
                        {selectedProject?.length !== 0 ? (
                          <tr key={selectedProject._id}>
                            <div className="my-auto">
                              <h6 className="mb-0 text-sm">
                                <button
                                  className="nav-link text-body p-1 btn btn-outline-primary"
                                  // onClick={()=>handleClick(task._id)}
                                  style={{
                                    marginLeft: "10px",
                                    border: "none",
                                    marginTop: "10px",
                                  }}
                                >
                                  {selectedProject?.title}
                                </button>
                              </h6>
                            </div>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">
                                {selectedProject?.technology}
                              </p>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">
                                {selectedProject?.estimatedhours}
                              </p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold mb-0">
                                {selectedProject?.startdate.substr(0, 10)}
                              </span>
                            </td>
                            <td>
                              <div>
                                <span
                                  className="me-2 text-xs font-weight-bold"
                                  // style={{ marginRight: "50px" }}
                                >
                                  {selectedProject?.completiondate.substr(0, 10)}
                                </span>
                              </div>
                            </td>
                            <ul>
                              {teamMembers?.map((member) => {
                                return (
                                  <li>
                                    {member && member?.userId
                                      ? member?.userId?.firstname
                                      : ""}
                                  </li>
                                );
                              })}
                            </ul>
                          </tr>
                        ) : (
                          ""
                        )}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectModule />
      </main>
    </body>
  );
}

export default ProjectDetails;