import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const NotifcationModal = (props) => {
  const modal2 = props.modal2;
  const setModal2 = props.setModal2;
  const notifications = props.notifications;
  const setNotifications = props.setNotifications;
  const handleDeleteNotifications = () => {
    const userid = localStorage.getItem("_id");
    console.log("helllloe");
    axios
      .delete(`http://localhost:4000/notifications/notifications/${userid}`)
      .then((res) => {
        console.log("deleted ");
        setNotifications([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal size="lg" isOpen={modal2} toggle={() => setModal2(!modal2)}>
        <ModalHeader toggle={() => setModal2(!modal2)}>
          Notifications
        </ModalHeader>
        <ModalBody>
          {console.log("expo ", notifications)}
          <ol>
            {notifications.length > 0
              ? notifications.map((item) => (
                  <li>
                    You have been assigned {item.taskId.title} in the project{" "}
                    {item.projectId.title}
                  </li>
                ))
              : "No Notifications"}
          </ol>
        </ModalBody>

        <ModalFooter>
          {notifications.length > 0 ? (
            <button
              className="btn btn-danger"
              onClick={handleDeleteNotifications}
            >
              {" "}
              <DeleteIcon />
              Clear Notifications
            </button>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NotifcationModal;
