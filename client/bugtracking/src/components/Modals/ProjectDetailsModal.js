import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProjectDetailsModal = (props) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const submit = props.submit;
    const modal1 = props.modal1;
    const showModal1 = props.showModal1;
    const closeModal1 = props.closeModal1;
    const desc = props.desc;
    const modal = props.modal;
    const setModal = props.setModal
    const teamMembers = props.teamMembers;
    const devs = props.devs
    const project = props.project
    const getCurrentTeamMember = props.getCurrentTeamMember
    const addTeamMember = props.addTeamMember
    const handleDeleteMember = props.handleDeleteMember
    const getproductById = props.getproductById
  return (
    <div>
      <Modal isOpen={showModal1}>
        <ModalHeader onClick={closeModal1}>
          <h1 style={{ AlignItems: "center" }}>Details</h1>
        </ModalHeader>

        <ModalBody>
          {/* {project.description} */}
          <h5>
            Description :{" "}
            <span style={{ fontSize: "15px", color: "red" }}> {desc}</span>
          </h5>
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "10px",
              }}
            >
              <h5>{teamMembers.length == 0 ? " " : "Team Member Name"}</h5>

              <button
                className="btn btn-link text-secondary mb-0"
                onClick={(e) => {
                  setModal(true);
                  getproductById(() => project._id);
                }}
                style={{ marginLeft: "100px" }}
              >
                {teamMembers.length == 0 ? (
                  <AddCircleRoundedIcon />
                ) : (
                  <EditIcon />
                )}
              </button>
            </div>

           
          </div>
          <div>
            <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
              <ModalHeader toggle={() => setModal(!modal)}>
                {teamMembers.length == 0
                  ? "Add Team Member"
                  : "Edit Team Members"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                  <div>
                    <Col sm={6}>
                      <div className="input-group input-group-outline my-3">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          // placeholder="role"
                          {...register("role")}
                          style={{
                            padding: "12px",
                            color: "#495057",
                          }}
                          onChange={(e) => getCurrentTeamMember(e)}
                          // placeholder="Add Developers "
                        >
                          {console.log("dev is there : ", devs)}
                          <option selected>Developer</option>

                          {devs?.map((dev) => {
                            return (
                              <option value={JSON.stringify(dev)}>
                                {/* {role.rolename.charAt(0).toUpperCase() +
                                          role.rolename.slice(1)} */}
                                {dev.firstname}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn bg-gradient-primary my-1 mb-2"
                        onClick={(e) => {
                          addTeamMember(e);
                        }}
                      >
                        Add Team Member
                      </button>
                    </Col>
                    <Col sm={6}>
                      <div className="input-group input-group-outline my-3 mx-5">
                        {/* <ul> */}
                        <table className="table align-items-center justify-content-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Member Name
                              </th>

                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamMembers?.map((member) => {
                              {
                                /* {console.log("Dani: ", member)} */
                              }
                              return (
                                <tr>
                                  <td>
                                    {member && member.userId
                                      ? member.userId.firstname
                                      : ""}
                                  </td>
                                  <td>
                                    <RemoveIcon
                                      onClick={() => handleDeleteMember(member)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* </ul> */}
                      </div>
                    </Col>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
        </ModalBody>

        {/* <button on?Click={closeModal1}>Close Modal 1</button> */}
      </Modal>
    </div>
  );
};

export default ProjectDetailsModal;
