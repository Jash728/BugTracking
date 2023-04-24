import React from "react";
import { Table } from "react-bootstrap";

const Showtaskstatus = (props) => {
  const tasks = props.tasks;
  const handleDelete = props.handleDelete;
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">Tasks</h3>
        </div>
        <div className="card-body px-0 pb-2">
          <div className="table-responsive p-0">
            <Table
              className="table align-items-center justify-content-center mb-0"
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th
                    className="text-uppercase text-white text-xxs font-weight-bolder opacity-7"
                    style={{ width: "50%", backgroundColor: "#DE2567" }}
                  >
                    To Do
                  </th>
                  <th
                    className="text-uppercase text-white text-xxs font-weight-bolder opacity-7"
                    style={{ width: "50%", backgroundColor: "#DE2567" }}
                  >
                    Complete
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks &&
                  tasks.map((task) => (
                    <tr key={task._id}>
                      <td>
                        <div className="d-flex px-1">
                          {task.taskId?.status.statusname === "pending" ? (
                            <>
                              {task.taskId.title}
                              <button
                                onClick={() => handleDelete(task.taskId)}
                                className="btn btn-sm btn-success ms-3"
                              >
                                Done
                              </button>
                            </>
                          ) : null}
                        </div>
                      </td>
                      <td>
                        {task.taskId?.status.statusname === "complete"
                          ? task.taskId.title
                          : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showtaskstatus;
