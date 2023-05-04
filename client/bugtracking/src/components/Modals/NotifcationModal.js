import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./Notification.css";

const NotifcationModal = (props) => {
  const modal2 = props.modal2;
  const setModal2 = props.setModal2;
  const notifications = props.notifications;
  const setNotifications = props.setNotifications;
  const handleDeleteNotifications = () => {
    const userid = localStorage.getItem("_id");
   
    axios
      .delete(`http://localhost:4000/notifications/notifications/${userid}`)
      .then((res) => {
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
          Notifications <i className="fa fa-bell text-muted" />
        </ModalHeader>
        <ModalBody>
          <section className="section-50">
            <div className="container">
              <div className="notification-ui_dd-content">
                <div className="notification-list notification-list--unread">
                  <div className="notification-list_content">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((item) => {
                          const createdAt = new Date(item.taskId.createdAt);
                          const currentTime = new Date();
                          const timeElapsedMinutes = Math.floor(
                            (currentTime - createdAt) / 60000
                          );
                          const timeElapsedHours = Math.floor(
                            timeElapsedMinutes / 60
                          );
                          const timeElapsedDays = Math.floor(
                            timeElapsedHours / 24
                          );
                          const remainingHours = timeElapsedHours % 24;
                          const timeElapsed = `${timeElapsedDays} days ${remainingHours} hours`;
                          return (
                            <div className="notification-list_detail">
                              <p>
                                <b>Manager</b> assigned you a task
                              </p>
                              <p className="text-muted">
                                You have been assigned{" "}
                                <b>{item.taskId.title}</b> in the project{" "}
                                <b>{item.projectId.title}</b>
                              </p>
                              <p className="text-muted">
                                <small>{timeElapsed==='0 days 0 hours'?"now":timeElapsed} </small>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      "No Notifications"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
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
