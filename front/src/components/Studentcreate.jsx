import React, { useState,useEffect } from 'react';
import img from "../img/Startup life Customizable Semi Flat Illustrations _ Pana Style.jpeg";

export default function StudentCreate() {
  const [studentSignup, setStudentSignup] = useState({
    firstName: "",
    department: "",
    roleNumber: "",
    batch: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    setStudentSignup([{
      firstName: "",
      department: "",
      roleNumber: "",
      batch: "",
      email: "",
      password: ""
    }]);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentSignup(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/studentregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentSignup),
      });

      if (response.ok) {
        alert('Registration successful!');
        // Handle successful registration (e.g., redirect, clear form)
        
      } else {
        alert('Registration failed.');
        // Handle errors (e.g., show error message)
        
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error)
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
                value={studentSignup.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Department</label>
              <input
               
                name="department"
                placeholder='Department...'
                value={studentSignup.department}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='res'>
            <div className="input-box">
              <label>Roll Number</label>
              <input
                 type="text"
                name="roleNumber"
                placeholder='Roll number...'
                value={studentSignup.roleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Batch</label>
              <input
                type="number"
                name="batch"
                placeholder='Batch...'
                value={studentSignup.batch}
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
                value={studentSignup.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Password...'
                value={studentSignup.password}
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
