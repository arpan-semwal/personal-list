import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './style.css';

const Home = () => {
  const [data, setData] = useState([]);

  // Function used to fetch data
  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get');
      setData(response.data);
    } catch (error) {
      console.error('Error while calling the API:', error);
    }
  };

  useEffect(() => {
    // On initial load, fetch all the data
    loadData();
  }, []);

  const deleteTask = (id) => {
    if(window.confirm("are you sure u want to delete the task ? ")){
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Task Deleted Successfully");
      setTimeout(() => loadData() , 500);
    }
  }

  return (
    <div >
      <Link to="/addEdit">
        <button className="btn btn-Task">Add task</button>
      </Link>
      
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Task</th>
            <th style={{ textAlign: 'center' }}>Priority</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.task}</td>
                <td>{item.priority}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>

                  <button className="btn btn-delete" onClick={() => deleteTask(item.id)}>Delete</button>

                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
