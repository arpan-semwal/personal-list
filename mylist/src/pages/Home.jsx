import React , {useState , useEffect}from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

import "./style.css"
const Home = () => {

  const [data , setData] = useState([]);

  //function is used to fetch data
  const loadData = async() => { 
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => { // on initial load it will fetch all the data
    loadData();
  }, []);

  return (
    <div style={{marginTop: "150px"}}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}} >No</th>
            <th style={{textAlign:"center"}} >Task</th>
            <th style={{textAlign:"center"}} >Priority</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item , index) => {
            return(
              <tr key={item.id}>
                <th scope='row'>{index+1}</th>
                <td>{item.task}</td>
                <td>{item.priority}</td>
                <td>
                  <link to={'/update/${item.id}'}>
                    <button className='btn btn-edit'>Edit</button>
                  </link >

                  <button className="btn btn-delete">Delete</button>

                  <link to={'/view/${item.id}'}>
                    <button className='btn btn-edit'>View</button>
                  </link >
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};

export default Home
