
import React from "react";
import Menustudent from './Menustudent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLanguage,
  faTrophy,
  faCode,
  faLaptopCode,
  faCertificate,
  faUserNinja
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "./upload.css";

export default function Upload() {
  const uploadCategories = [
    {
      title: 'Communication Language',
      description: 'Share your language proficiency and certifications',
      icon: faLanguage,
      path: '/up-clanguage',
      color: '#3b82f6'
    },
    {
      title: 'Achievements',
      description: 'Share your accomplishments',
      icon: faTrophy,
      path: '/up-ach',
      color: '#f97316'
    },
    {
      title: 'Projects',
      description: 'Showcase your work',
      icon: faCode,
      path: '/up-pro',
      color: '#10b981'
    },
    {
      title: 'Programming Languages',
      description: 'Share your programming expertise',
      icon: faLaptopCode,
      path: '/up-planguage',
      color: '#6366f1'
    },
    {
      title: 'Certificates',
      description: 'Display your credentials',
      icon: faCertificate,
      path: '/up-cer',
      color: '#ec4899'
    },
    {
      title: 'Coding Profile',
      description: 'Link your coding platforms',
      icon: faUserNinja,
      path: '/up-coding',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-menu">
        <Menustudent />
      </div>

      <div className="dashboard-main">
        <div className="upload-header">
          <h1>Upload Details</h1>
          <p>Add or update your profile information</p>
        </div>

        <div className="upload-grid">
          {uploadCategories.map((category, index) => (
            <Link 
              key={index} 
              to={category.path}
              className="upload-card"
              style={{
                '--card-color': category.color
              }}
            >
              <div className="upload-icon">
                <FontAwesomeIcon icon={category.icon} />
              </div>
              <div className="upload-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
