import React from "react";

const ShowTasks = (props) => {
    const devTasks = props.devTasks
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">My Tasks</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Title
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Prority
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Description
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                        Total Mins
                      </th>
                     
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {devTasks.map?.((task) => (
                      <tr>
                        <td>
                          <div className="d-flex px-1">
                           
                          

                            <div className="my-auto" style={{
                                        marginLeft: "10px",
                                        border: "none",
                                        marginTop: "10px",
                                      }}>
                              <h6 className="mb-0 text-sm">
                               
                                  {task.taskId.title}
                                
                              </h6>
                            </div>

                          </div>
                        </td>

                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {task.taskId.priority}
                          </p>
                        </td>
                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {task.taskId.description}
                          </p>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold mb-0">
                            {task.taskId.totalMinutes}
                          </span>
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
    </div>
  );
};

export default ShowTasks;
