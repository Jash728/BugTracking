import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Form, Row, Col } from "react-bootstrap";
import {useForm } from "react-hook-form";


const CreateProjectModal = (props) => {
    const { register, handleSubmit } = useForm();
    const submit = props.submit
    const getData = props.getData
    const modal = props.modal
    const setModal = props.setModal

  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Create Project
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(submit)}>
            <div className="input-group input-group-outline my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="technology"
                {...register("technology")}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="description"
                {...register("description")}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="estimated hrs"
                {...register("estimatedhours")}
              />
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
                    {...register("startdate")}
                  />
                </Col>
                <Form.Label column sm={2}>
                  End Date
                </Form.Label>
                <Col sm={3}>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    {...register("completiondate")}
                  />
                </Col>
              </Form.Group>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn bg-gradient-primary  w-15 my-5 mb-2"
                onClick={getData}
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

export default CreateProjectModal;
