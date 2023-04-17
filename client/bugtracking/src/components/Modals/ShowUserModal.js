import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import RemoveIcon from '@mui/icons-material/Remove';

const ShowUserModal = (props) => {
    const modal2 = props.modal2;
    const setModal2 = props.setModal2;
    const assigndevs = props.assigndevs
    const deleteUserfromtask  = props.deleteUserfromtask
  return (
    <div>
      <Modal size="lg" isOpen={modal2} toggle={() => setModal2(!modal2)}>
        <ModalHeader toggle={() => setModal2(!modal2)}>
          Assign Members
        </ModalHeader>
        <ModalBody>
          {assigndevs.length > 0 ? (
            assigndevs.map((dev) => (
              <div key={dev._id}>
                {" "}
                {dev.userId ? dev.userId.firstname : "not found"}
                <RemoveIcon onClick={() => deleteUserfromtask(dev._id)} />
              </div>
            ))
          ) : (
            <div>No developers assigned.</div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowUserModal;
