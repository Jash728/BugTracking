import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { get, set, useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const UpdateProjectModal = (props) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const data = props.data;
    const handleInputChange = props.handleInputChange
    const modal1 = props.modal1;
    const setModal1 = props.setModal1;
    const setModal = props.setModal;
    const handleFormSubmit = props.handleFormSubmit;
    const handleUpdate = props.handleUpdate;
 
    return (
    <div>
      <Modal size="lg" isOpen={modal1} toggle={() => setModal(!modal1)}>
        <ModalHeader toggle={() => setModal1(!modal1)}>
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
                name="estimatedhours"
                value={data ? data.estimatedhours : ""}
                onChange={handleInputChange}
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
                    name="startdate"
                    value={
                      data && data.startdate ? data.startdate.substr(0, 10) : ""
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
                    name="completiondate"
                    value={
                      data && data.completiondate
                        ? data.completiondate.substr(0, 10)
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
    </div>
  );
};

export default UpdateProjectModal;
