// React Component (addEdit.js)
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './addedit.css';

const initialState = {
  task: '',
  priority: '',
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { task, priority } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !priority) {
      toast.error('Please provide a value for each input field.');
    } else {
      const requestData = { task, priority };

      if (!id) {
        axios.post('http://localhost:5000/api/post', requestData)
          .then(() => {
            setState(initialState);
            toast.success('Task added successfully');
            navigate('/');
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      } else {
        axios.put(`http://localhost:5000/api/put/${id}`, requestData)
          .then(() => {
            setState(initialState);
            toast.success('Task updated successfully');
            navigate('/');
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      }
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: 400,
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="task">Task</label>
        <input
          type="text"
          id="task"
          name="task"
          placeholder="Enter your task..."
          value={task || ''}
          onChange={handleInputChange}
        />

        <label htmlFor="priority">Priority</label>
        <input
          type="text"
          id="priority"
          name="priority"
          placeholder="Enter your Priority..."
          value={priority || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />

        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
