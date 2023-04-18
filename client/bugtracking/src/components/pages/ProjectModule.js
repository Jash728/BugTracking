import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useForm } from "react-hook-form";
import CreateProjectModuleModal from "../Modals/CreateProjectModuleModal";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateProjectModuleModal from "../Modals/UpdateProjectModuleModal";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";


const ProjectModule = () => {
  var navigate = useNavigate()
  const [module, setModule] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [data, setData] = useState({});
  const [modal1, setModal1] = useState(false);
  const [currModule, setCurrModule] = useState("");

  const getModuleData = () => {
    var id = localStorage.getItem("project_id");
    fetch(`http://localhost:4000/projectmodule/getbyprojectstatus/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setModule(resp.data))
      .then((resp) => console.log("module is", resp))
      .catch((error) => console.log(error));
  };

  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/projectmodule/deleteprojectmodule/${id}`)
      .then((response) => {
        // handle success
        console.log("Data deleted successfully");
        setModule(module.filter((item) => item._id !== id)); // remove deleted item from state
      })
      .catch((error) => {
        // handle error
        console.log("Error deleting data:", error);
      });
  }

  const submit = (data) => {
    var id = localStorage.getItem("project_id");
    data.projectId = id;
    // console.log(data);
    axios
      .post("http://localhost:4000/projectmodule/add", data)
      .then((res) => {
        console.log("Project module is ", res.data);
        // localStorage.setItem("_id",res.data.data[0]?._id)
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    getModuleData();
    setModal(false);
  };

  useEffect(() => {
    getModuleData();
  }, []);

  // Update code

  const handleUpdate = (event) => {
    fetch(
      `http://localhost:4000/projectmodule/updateprojectmodule/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setModal1(false);
    getModuleData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = () => {
    //   onSave(data);
  };

  const handleModule = (project) => {
    // let currPrj = project
    // setCurrProject(currPrj)
  };

  const getmoduleById = (id) => {
    const moduleData = fetch(
      `http://localhost:4000/projectmodule/getmodulebyid/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const obj = res.data;
        setData(obj);
      })

      .catch((error) => console.log(error));
  };

  const handleClick = (id) => {
    localStorage.setItem("module_id", id);
    
    navigate(`/moduledetails`);
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">
                  Project Modules
                </h6>
              </div>
            </div>
            <CreateProjectModuleModal
              submit={submit}
              getModuleData={getModuleData}
              modal={modal}
              setModal={setModal}
              // getStatus = {getStatus}
            />
            <UpdateProjectModuleModal
              data={data}
              handleInputChange={handleInputChange}
              modal1={modal1}
              setModal1={setModal1}
              setModal={setModal}
              handleFormSubmit={handleFormSubmit}
              handleUpdate={handleUpdate}
            />
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Module Name
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Description
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Estimated hrs
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                        Start Date
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                        Status
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {module.map?.((m) => (
                      <tr>
                        {/* {console.log("module name", module)} */}
                        <td>
                          <div className="d-flex px-1">
                           

                            <div className="my-auto">
                              <h6 className="mb-0 text-sm">
                                <button
                                  className="nav-link text-body p-1 btn btn-outline-primary"
                                  onClick={()=>handleClick(m._id)}
                                  style={{
                                    marginLeft: "10px",
                                    border: "none",
                                    marginTop: "10px",
                                  }}
                                >
                                  {m.modulename}
                                </button>
                              </h6>
                            </div>
                            <button
                              className="btn btn-link text-secondary mb-0"
                              onClick={() => {
                                setModal1(true);
                                handleModule(() => setCurrModule(m));
                                getmoduleById(m._id);
                              }}
                            >
                              <EditIcon fontSize="small" color="action" />
                            </button>
                          </div>
                        </td>

                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {m.description}
                          </p>
                        </td>
                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {m.estimatedhours}
                          </p>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold mb-0">
                            {m.startdate.substr(0, 10)}
                          </span>
                        </td>
                        <td >
                          <div>
                            <span
                              className="me-2 text-xs font-weight-bold"
                              // style={{ marginRight: "50px" }}
                            >
                              {m.status.statusname}
                            </span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-link text-secondary mb-0"
                            onClick={() => handleDelete(m._id)}
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
      <div
        style={{
          float: "right",
          marginRight: "20px",
          paddingTop: "15px",
        }}
      >
        <li className="nav-item px-3 d-flex align-items-center">
          <button
            class="btn btn-danger"
            onClick={() => setModal(true)}
            style={{ float: "left" }}
          >
            <AddIcon /> Add Module
          </button>

          <span
            className="d-sm-inline d-none"
            style={{ marginLeft: "5px" }}
          ></span>
        </li>
      </div>
    </div>
  );
};

export default ProjectModule;
