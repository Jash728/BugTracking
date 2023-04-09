import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";

const UpdateProjectModuleModal = (props) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const data = props.data;
  const handleInputChange = props.handleInputChange;
  const modal1 = props.modal1;
  const setModal1 = props.setModal1;
  const setModal = props.setModal;
  const handleFormSubmit = props.handleFormSubmit;
  const handleUpdate = props.handleUpdate;

  const [status, setStatus] = useState();

  const getStatus = () => {
    axios.get("http://localhost:4000/status/get").then((res) => {
      //console.log(res.data.data)
      setStatus(res.data.data);
    });
  };

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div>
      {console.log("status data ", data != null ? data : "not found")}
      <Modal size="lg" isOpen={modal1} toggle={() => setModal(!modal1)}>
        <ModalHeader toggle={() => setModal1(!modal1)}>
          Update Module
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input-group input-group-outline my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Module name"
                name="modulename"
                value={data ? data.modulename : ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="description"
                name="description"
                value={data ? data.description : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group input-group-outline mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Estimated Hours"
                name="estimatedhours"
                value={data ? data.estimatedhours : ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group input-group-outline mb-3">
              Current Status : {data && data.status ? data.status.statusname.toUpperCase().substr(0,1) +  data.status.statusname.substr(1): ""}
            </div>
            <div className="input-group input-group-outline mb-3">
            <select
              class="form-select"
              aria-label="Default select example"
              // placeholder="role"
              name="status"
              value={data && data.status ? data.status.statusname : ""}
              onChange={handleInputChange}
              style={{ padding: "12px", color: "#495057" }}
            >
              <option selected>Status</option>
              {status?.map((s) => {
                return (
                  <option value={s._id}>
                    {s.statusname}
                  </option>
                );
              })}
            </select>
              {/* <input
                type="text"
                className="form-control"
                placeholder="status"
                name="status"
                value={data && data.status ? data.status.statusname : ""}
                onChange={handleInputChange}
              /> */}
            </div>
            
            <div>
              <Form.Group as={Row} controlId="formHorizontalDateRange">
                <Form.Label column sm={2}>
                  Start Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="startdate"
                    value={
                      data && data.startdate ? data.startdate.substr(0, 10) : ""
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
    </div>
  );
};

export default UpdateProjectModuleModal;
