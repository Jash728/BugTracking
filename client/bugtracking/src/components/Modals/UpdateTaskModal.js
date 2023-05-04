import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";

const UpdateTaskModal = (props) => {
  const {handleSubmit } = useForm();
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
      setStatus(res.data.data);
    });
  };

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div>
     
      <Modal size="lg" isOpen={modal1} toggle={() => setModal(!modal1)}>
        <ModalHeader toggle={() => setModal1(!modal1)}>
          Update Task
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
                placeholder="priority"
                name="priority"
                value={data ? data.priority : ""}
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
              Current Status :{" "}
              {data && data.status ? data.status.statusname : ""}
            </div>
            <div className="input-group input-group-outline mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                name="status"
                value={data && data.status ? data.status.statusname : ""}
                onChange={handleInputChange}
                style={{ padding: "12px", color: "#495057" }}
              >
                <option selected>Status</option>
                {status?.map((s) => {
                  return <option value={s._id}>{s.statusname}</option>;
                })}
              </select>
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Total Minutes"
                name="totalMinutes"
                value={data ? data.totalMinutes : ""}
                onChange={handleInputChange}
              />
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

export default UpdateTaskModal;
