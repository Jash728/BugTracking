import React from "react";
import { Table } from 'react-bootstrap';


import axios from "axios";


const ShowStatus = () => {


  


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {/* {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.status === "pending" ? task.title : ""}</td>
              <td>{task.status === "complete" ? task.title : ""}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowStatus;
