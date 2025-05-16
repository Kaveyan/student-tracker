import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBorderAll, 
  faUpload, 
  faCalendarDays, 
  faMessage, 
  faRightFromBracket,
  faUser,
  faDatabase,
  faCalendar,
  faEnvelope,
  faChartLine,
  faCog,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";

export default function Menuadmin({ isCollapsed, onCollapseChange }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.firstName : 'Student';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuItems = [
    { 
      icon: faBorderAll, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      subItems: [
        { label: 'Student Rankings', path: '/admin/dashboard/rankings' },
        { label: 'Activity Overview', path: '/admin/dashboard/overview' }
      ]
    },
    { 
      icon: faUpload, 
      label: 'Data Management', 
      path: '/admin/data',
      subItems: [
        { label: 'Student Data', path: '/admin/data/students' },
        { label: 'Project Data', path: '/admin/data/projects' },
        { label: 'Language Data', path: '/admin/data/languages' }
      ]
    },
    { 
      icon: faCalendarDays, 
      label: 'Events', 
      path: '/admin/events',
      subItems: [
        { label: 'Upcoming Events', path: '/admin/events/upcoming' },
        { label: 'Past Events', path: '/admin/events/past' },
        { label: 'Create Event', path: '/admin/events/create' }
      ]
    },
    { 
      icon: faMessage, 
      label: 'Messages', 
      path: '/admin/messages',
      subItems: [
        { label: 'Inbox', path: '/admin/messages/inbox' },
        { label: 'Sent Messages', path: '/admin/messages/sent' },
        { label: 'Compose', path: '/admin/messages/compose' }
      ]
    },
    { 
      icon: faChartLine, 
      label: 'Analytics', 
      path: '/admin/analytics',
      subItems: [
        { label: 'Student Performance', path: '/admin/analytics/performance' },
        { label: 'Activity Trends', path: '/admin/analytics/trends' },
        { label: 'Engagement Metrics', path: '/admin/analytics/engagement' }
      ]
    },
    { 
      icon: faCog, 
      label: 'Settings', 
      path: '/admin/settings',
      subItems: [
        { label: 'Profile', path: '/admin/settings/profile' },
        { label: 'Notifications', path: '/admin/settings/notifications' },
        { label: 'Security', path: '/admin/settings/security' }
      ]
    }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className='sidebar-header'>
        <div className='user-info'>
          <div className='avatar'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className='user-details'>
            <h3>{userName}</h3>
            <p>Administrator</p>
          </div>
        </div>
        <button 
          className='collapse-btn' 
          onClick={() => {
            if (onCollapseChange) {
              onCollapseChange(!isCollapsed);
            }
          }}
        >
          <FontAwesomeIcon icon={isCollapsed ? faArrowRight : faArrowLeft} />
        </button>
      </div>

      <div className='menu-items'>
        {menuItems.map((item, index) => (
          <div key={index} className='menu-item-container'>
            <Link 
              to={item.path} 
              className='menu-item'
            >
              <FontAwesomeIcon icon={item.icon} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
            {item.subItems && !isCollapsed && (
              <div className='sub-menu-items'>
                {item.subItems.map((subItem, subIndex) => (
                  <Link 
                    key={subIndex} 
                    to={subItem.path} 
                    className='sub-menu-item'
                  >
                    <span>{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className='logout-section'>
          <button 
            className='logout-btn'
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
