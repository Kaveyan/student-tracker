import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faUpload, faCalendarDays, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";

export default function Menuadmin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.firstName : 'Student';

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className='menu'>
      <div className='name'>
        <h2>Hi, {userName} 👋</h2>
      </div>
       
      <div className='mai-menu'>
        <p><FontAwesomeIcon icon={faBorderAll} />Dashboard</p>
        <p><FontAwesomeIcon icon={faUpload} />Data</p>
        <p><FontAwesomeIcon icon={faCalendarDays} />Events</p>
        <p><FontAwesomeIcon icon={faMessage} />Message</p>
        <br/><br/><br/>
        <p onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />Logout</p>
      </div>
    </div>
  );
}
