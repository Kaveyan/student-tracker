import React, { useState } from 'react';
import "./all.css";
import img from "../img/Free Vector _ Flat creativity concept illustration.jpeg";

export default function FacultyCreate() {
  const [facultySignup, setFacultySignup] = useState({
    firstName: "",
    department: "",
    roleNumber: "",
    domain: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultySignup(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/facultyregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultySignup),
      });
  
      if (response.ok) {
        alert('Registration successful!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="column">
      <div className='f-contain'>
        <div>
          <header>Register Here..</header>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <div className='res'>
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                name="firstName"
                placeholder='Name...'
                value={facultySignup.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder='Department...'
                value={facultySignup.department}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='res'>
            <div className="input-box">
              <label>Faculty ID</label>
              <input
               type="text"
                name="roleNumber"
                placeholder='Faculty ID...'
                value={facultySignup.roleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Domain</label>
              <input
                type="text"
                name="domain"
                placeholder='Domain...'
                value={facultySignup.domain}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='res'>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder='Email...'
                value={facultySignup.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Password...'
                value={facultySignup.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
       
      </div>
      <img src={img} alt="Illustration" />
    </div>
  );
}
