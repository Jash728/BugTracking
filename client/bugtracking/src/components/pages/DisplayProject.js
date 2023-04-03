import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";

const DisplayProject =  (displayProjectProps) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const modal = displayProjectProps.modal;
    const modal1 = displayProjectProps.modal1;
    const setModal = displayProjectProps.setModal;
    const setModal1 = displayProjectProps.setModal1;
    const showModal1 = displayProjectProps.showModal1
    const closeModal1 = displayProjectProps.closeModal1
    const openModal1 = displayProjectProps.openModal1
    const projects = displayProjectProps.projects;
    const ProjectDetailsModal = displayProjectProps.ProjectDetailsModal
    const submit = displayProjectProps.submit
    const desc = displayProjectProps.desc
    const teamMembers = displayProjectProps.teamMembers
    const devs = displayProjectProps.devs
    const handleDeleteMember = displayProjectProps.handleDeleteMember
    const addTeamMember = displayProjectProps.addTeamMember
    const getCurrentTeamMember = displayProjectProps.getCurrentTeamMember
    const data = displayProjectProps.data
    const getproductById = displayProjectProps.getproductById
    const UpdateProjectModal = displayProjectProps.UpdateProjectModal
    const handleInputChange = displayProjectProps.handleInputChange
    const handleFormSubmit = displayProjectProps.handleFormSubmit
    const handleUpdate = displayProjectProps.handleUpdate
    const handleProject = displayProjectProps.handleProject
    const setCurrProject = displayProjectProps.setCurrProject
    
  return (
    <div className="card my-4">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
          <h6 className="text-white text-capitalize ps-3">My Projects</h6>
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
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-5">
                  Completion Date
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projects.map?.((project) => (
                <tr>
                  <td>
                    <div className="d-flex px-1">
                      <div>
                        <img
                          src="../assets/img/small-logos/logo-asana.svg"
                          className="avatar avatar-sm rounded-circle me-2"
                          alt="spotify"
                        />
                      </div>
                      <ProjectDetailsModal
                        submit={displayProjectProps.submit}
                        modal1={displayProjectProps.modal1}
                        modal={displayProjectProps.modal}
                        setModal={displayProjectProps.setModal}
                        showModal1={displayProjectProps.showModal1}
                        closeModal1={displayProjectProps.closeModal1}
                        desc={displayProjectProps.desc}
                        teamMembers={displayProjectProps.teamMembers}
                        devs={displayProjectProps.devs}
                        prooject={displayProjectProps.project}
                        getCurrentTeamMember={displayProjectProps.getCurrentTeamMember}
                        addTeamMember={displayProjectProps.addTeamMember}
                        handleDeleteMember={displayProjectProps.handleDeleteMember}
                        getproductById={displayProjectProps.getproductById}
                      />

                      <div className="my-auto">
                        <h6 className="mb-0 text-sm">
                          <button
                            className="nav-link text-body p-1 btn btn-outline-primary"
                            style={{
                              marginLeft: "10px",
                              border: "none",
                              marginTop: "10px",
                            }}
                            onClick={() => {
                              openModal1(project ? project : "not found");
                            }}
                          >
                            {project.title}
                          </button>
                        </h6>
                      </div>

                      <UpdateProjectModal
                        data={displayProjectProps.data}
                        handleInputChange={displayProjectProps.handleInputChange}
                        modal1={displayProjectProps.modal1}
                        setModal1={displayProjectProps.setModal1}
                        setModal={displayProjectProps.setModal}
                        handleFormSubmit={displayProjectProps.handleFormSubmit}
                        handleUpdate={displayProjectProps.handleUpdate}
                      />
                      <button
                        className="btn btn-link text-secondary mb-0"
                        onClick={() => {
                          setModal1(true);
                          handleProject(() => setCurrProject(project));
                          getproductById(project._id);
                        }}
                      >
                        <EditIcon fontSize="small" color="action" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm font-weight-bold mb-0">
                      {project.technology}
                    </p>
                  </td>
                  <td>
                    <p className="text-sm font-weight-bold mb-0">
                      {project.estimatedhours}
                    </p>
                  </td>
                  <td>
                    <span className="text-xs font-weight-bold mb-0">
                      {project.startdate.substr(0, 10)}
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <div>
                      <span
                        className="me-2 text-xs font-weight-bold"
                        // style={{ marginRight: "50px" }}
                      >
                        {project.completiondate.substr(0, 10)}
                      </span>
                    </div>
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-link text-secondary mb-0"
                      onClick={() => displayProjectProps.handleDelete(project._id)}
                    >
                      <DeleteIcon color="action" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
