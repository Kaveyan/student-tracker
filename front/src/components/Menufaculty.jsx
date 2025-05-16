import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBorderAll,
  faUpload,
  faCalendarDays,
  faMessage,
  faRightFromBracket,
  faChalkboardTeacher,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./FacultyMenu.css";

export default function Menufaculty() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.firstName : 'Faculty';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuItems = [
    { path: '/facultyhome', icon: faBorderAll, label: 'Dashboard' },
    { path: '/facultyupload', icon: faUpload, label: 'Upload' },
    { path: '/events', icon: faCalendarDays, label: 'Events' },
    { path: '/messages', icon: faMessage, label: 'Messages' }
  ];

  return (
    <div className='faculty-menu'>
      <div className='faculty-profile'>
        <div className='faculty-avatar'>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
        </div>
        <h2 className='faculty-name'>{userName}</h2>
        <p className='faculty-role'>
          <FontAwesomeIcon icon={faGraduationCap} /> Faculty Member
        </p>
      </div>

      <nav className='menu-items'>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className='menu-footer'>
        <button className='logout-button' onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
