import React, { useEffect, useState } from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

function ProjectData(props) {
  const { projects } = props;
  // console.log(projects);

  const { register, handleSubmit } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  
  // const { register, handleSubmit, reset,setValue } = useForm();
  // console.log(data)
  const handleClick = () => {
    setModal(true);
  };

  const getproductById = (id) => {
    const projeData = fetch(`http://localhost:4000/project/project/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log("resp are" ,res.data))
      // .then((res) => setData(res.data))
      .then((res) => {
        const obj = res.data;
        console.log("obj is", obj);
        setData(obj);
      })

      .catch((error) => console.log(error));
  };

  const handleUpdate = (event) => {
    console.log("event + ", data);
    fetch(`http://localhost:4000/project/project/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setModal(false)
      props.getData();
      // return data;

  };

  useEffect(() => {
    // setTitle("Jas")

    console.log("data is", data);
  }, [data]);

  const handleInputChange = (event) => {
    // console.log("event", event.target)
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = () => {
    props.onSave(data);
  };

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const openModal1 = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
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
                            <Modal isOpen={showModal1} onRequestClose={closeModal1}>
                              <ModalHeader onClick={closeModal1}>
                                  Description
                                </ModalHeader>

                                <p style={{marginTop:"20px" , marginLeft:"20px", fontSize:"20px"}}>-- {project.description}</p>
                                {/* <button on?Click={closeModal1}>Close Modal 1</button> */}
                            </Modal>

                            <div className="my-auto">
                              <h6
                                className="mb-0 text-sm"
                                
                              >
                                <button
                                  className="nav-link text-body p-1 btn btn-outline-primary"
                                  style={{
                                    marginLeft: "10px",
                                    border: "none",
                                    marginTop: "10px",
                                  }}
                                  onClick={openModal1}
                                >
                                  {project.title}
                                </button>
                              </h6>
                            </div>

                            <Modal
                              size="lg"
                              isOpen={modal}
                              toggle={() => setModal(!modal)}
                            >
                              <ModalHeader toggle={() => setModal(!modal)}>
                                Update Project
                              </ModalHeader>
                              <ModalBody>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                  <div className="input-group input-group-outline my-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Title"
                                      name="title"
                                      value={data ? data.title : ""}
                                      onChange={handleInputChange}
                                    />
                                    
                                  </div>
                                  <div className="input-group input-group-outline mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="technology"
                                      name="technology"
                                      value={data ? data.technology : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="input-group input-group-outline mb-3">
                                    <textarea
                                      class="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                      placeholder="description"
                                      name="description"
                                      value={data ? data.description : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="input-group input-group-outline mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="estimated hrs"
                                      name = "estimatedhours"
                                      value={data ? data.estimatedhours : ""}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div>
                                    <Form.Group
                                      as={Row}
                                      controlId="formHorizontalDateRange"
                                    >
                                      <Form.Label column sm={2}>
                                        Start Date
                                      </Form.Label>
                                      <Col sm={3}>
                                        <Form.Control
                                          type="date"
                                          placeholder="Start Date"
                                          name="startdate"
                                          value={
                                            data && data.startdate
                                              ? data.startdate.substr(0, 10)
                                              : ""
                                          }
                                          
                                          onChange={handleInputChange}
                                        />
                                      </Col>
                                      <Form.Label column sm={2}>
                                        End Date
                                      </Form.Label>
                                      <Col sm={3}>
                                        <Form.Control
                                          type="date"
                                          placeholder="End Date"
                                          name = "completiondate"
                                          value={
                                            data && data.completiondate
                                              ? data.completiondate.substr(
                                                  0,
                                                  10
                                                )
                                              : ""
                                          }
                                          onChange={handleInputChange}
                                        />
                                      </Col>
                                    </Form.Group>
                                  </div>
                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className="btn bg-gradient-primary  w-15 my-5 mb-2"
                                      onClick={handleUpdate}
                                      
                                    >
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </ModalBody>
                            </Modal>

                            <button
                              className="btn btn-link text-secondary mb-0"
                              onClick={() => {
                                setModal(true);
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
                            {project.startdate.substr(0,10)}
                          </span>
                          
                        </td>
                        <td className="align-middle text-center">
                          <div>
                            <span
                              className="me-2 text-xs font-weight-bold"
                              // style={{ marginRight: "50px" }}
                            >
                              {project.completiondate.substr(0,10)}
                            </span>
                          </div>
                            
                        
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-link text-secondary mb-0"
                            onClick={() => props.handleDelete(project._id)}
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
        </div>
      </div>
    </div>
  );
}

export default ProjectData;
