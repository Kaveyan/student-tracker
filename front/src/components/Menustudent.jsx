import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faCalendarDays,
  faMessage,
  faRightFromBracket,
  faUserGraduate,
  faGear,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import "./menu.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Menustudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.firstName : 'Student';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuItems = [
    { path: '/studenthome', icon: faHome, label: 'Dashboard' },
    { path: '/upload', icon: faUpload, label: 'Upload' },
    { path: '/detail', icon: faCalendarDays, label: 'Details' },
    { path: '/messages', icon: faMessage, label: 'Messages' },
    { path: '/profile', icon: faUserGraduate, label: 'Profile' },
    { path: '/settings', icon: faGear, label: 'Settings' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="user-info">
          <div className="avatar">{userName[0].toUpperCase()}</div>
          {!isCollapsed && (
            <div className="user-details">
              <h3>{userName}</h3>
              <p>Student</p>
            </div>
          )}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="menu-items">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={item.icon} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
