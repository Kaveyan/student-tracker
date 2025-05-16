import React, { useState, useEffect } from 'react';
import Menustudent from './Menustudent';
import "./student.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrophy,
  faCode,
  faDiagramProject,
  faAward,
  faPaperPlane,
  faGraduationCap,
  faChartLine,
  faLaptopCode,
  faLanguage,
  faCertificate,
  faRankingStar
} from '@fortawesome/free-solid-svg-icons';

export default function Studenhome() {
  const [stats, setStats] = useState({
    projects: 0,
    achievements: 0,
    languages: 0,
    communication: 0,
    certifications: 0,
    ps: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch token from local storage
      const response = await fetch('https://student-tracker-backend-45dp.onrender.com/upload/list', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setStats(data); // Update the stats state with the fetched data
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const user = JSON.parse(localStorage.getItem('user')) || { firstName: 'Student' };

  return (
    <div className='dashboard'>
      <div className='dashboard-menu'>
        <Menustudent />
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome, {user.firstName}! 👋</h1>
            <p>Track your academic progress and achievements</p>
          </div>
          <div className="header-stats">
            <div className="stat-card primary">
              <FontAwesomeIcon icon={faGraduationCap} />
              <div className="stat-content">
                <h3>Attendance</h3>
                <p>78%</p>
              </div>
            </div>
            <div className="stat-card success">
              <FontAwesomeIcon icon={faChartLine} />
              <div className="stat-content">
                <h3>Overall Progress</h3>
                <p>85%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon trophy">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <div className="achievement-details">
              <h3>Achievements</h3>
              <p>{stats.achievements}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(stats.achievements/10) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon project">
              <FontAwesomeIcon icon={faDiagramProject} />
            </div>
            <div className="achievement-details">
              <h3>Projects</h3>
              <p>{stats.projects}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(stats.projects/5) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon code">
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>
            <div className="achievement-details">
              <h3>Programming</h3>
              <p>{stats.languages} Languages</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(stats.languages/8) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon cert">
              <FontAwesomeIcon icon={faCertificate} />
            </div>
            <div className="achievement-details">
              <h3>Certifications</h3>
              <p>{stats.certifications}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(stats.certifications/5) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <div className="section-header">
            <h2>Key Performance Areas</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <FontAwesomeIcon icon={faLanguage} />
              <h3>Communication</h3>
              <p>{stats.communication} Languages</p>
              <div className="skill-level">
                <div className="level-indicator" style={{ width: `${(stats.communication/3) * 100}%` }}></div>
              </div>
            </div>

            <div className="skill-card">
              <FontAwesomeIcon icon={faRankingStar} />
              <h3>Problem Solving</h3>
              <p>Rank {stats.ps}</p>
              <div className="skill-level">
                <div className="level-indicator" style={{ width: `${(stats.ps/100) * 100}%` }}></div>
              </div>
            </div>

            <div className="skill-card">
              <FontAwesomeIcon icon={faCode} />
              <h3>Coding Skills</h3>
              <p>{stats.languages} Technologies</p>
              <div className="skill-level">
                <div className="level-indicator" style={{ width: `${(stats.languages/10) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
