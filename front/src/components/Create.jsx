import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import img2 from "../img/Interaction design Customizable Cartoon Illustrations _ Bro Style.jpeg";

function Create() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Store selected role in local storage for registration
    localStorage.setItem('selectedRole', role);
    
    // Navigate to appropriate registration page
    switch(role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'student':
        navigate('/student');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      default:
        console.error('Invalid role selected');
    }
  };

  return (
    <div className='background'>
      <div>
        <form>
          <h3 className='sign'>Signup As</h3>
          <button type="button" onClick={() => handleRoleSelection('admin')}>Admin</button>
          <button type="button" onClick={() => handleRoleSelection('student')}>Student</button>
          <button type="button" onClick={() => handleRoleSelection('faculty')}>Faculty</button>
         
          <div className="new">
            <p>Already have an account? &nbsp; &nbsp; &nbsp;  <Link to="/">Login</Link> </p>
          </div>
        </form>
      </div>
      <img src={img2} alt="Illustration" />
    </div>
  );
}

export default Create;


