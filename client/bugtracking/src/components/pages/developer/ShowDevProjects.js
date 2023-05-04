import React from "react";

const ShowDevProjects = (props) => {
  const devProjects = props.devProjects;
  return (
    <div className="container-fluid py-4 ">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Projects</h6>
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
                        Technology
                      </th>

                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Estimated hrs
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-1">
                        Start Date
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder  opacity-7 ps-1">
                        Completion Date
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {devProjects.map?.((project) => (
                      <tr>
                        <td>
                          <div className="d-flex px-1">
                            <div
                              className="my-auto"
                              style={{
                                marginLeft: "10px",
                                border: "none",
                                marginTop: "10px",
                              }}
                            >
                              <h6 className="mb-0 text-sm">
                                {project.projectId.title}
                              </h6>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {project.projectId.technology}
                          </p>
                        </td>
                        <td>
                          <p className="text-sm font-weight-bold mb-0">
                            {project.projectId.estimatedhours}
                          </p>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold mb-0">
                            {project.projectId.startdate.substr(0, 10)}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div>
                            <span
                              className="me-2 text-xs font-weight-bold"
                              
                            >
                              {project.projectId.completiondate.substr(0, 10)}
                            </span>
                          </div>
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

export default ShowDevProjects;
