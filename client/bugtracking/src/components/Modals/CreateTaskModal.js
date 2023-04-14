import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import axios from "axios";

const CreateTaskModal = (props) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const submit = props.submit;
  const getTaskData = props.getTaskData;
  const modal = props.modal;
  const setModal = props.setModal;

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
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Create Task</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(submit)}>
            <div className="input-group input-group-outline my-3">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                {...register("title")}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="priority"
                {...register("priority")}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="description"
                {...register("description")}
              />
            </div>
            
            <select
              class="form-select"
              aria-label="Default select example"
              
              // placeholder="role"
              {...register("status")}
              style={{color: "#495057", marginBottom:"10px"}}
            >
              <option selected>Status</option>
              {status?.map((s) => {
                return <option value={s._id}>{s.statusname}</option>;
              })}
            </select>
            
            <div className="input-group input-group-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="totalMinutes"
                {...register("totalMinutes")}
              />
            </div>
           
            <div className="text-center">
              <button
                type="submit"
                className="btn bg-gradient-primary  w-15 my-5 mb-2"
                onClick={getTaskData}
              >
                Save
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
