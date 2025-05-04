import React, { useState, useEffect } from 'react';
import Menustudent from './Menustudent';
import "./student.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faShieldHalved, faCode, faDiagramProject, faAward, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
      const response = await fetch('http://localhost:8000/upload/list', {
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

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menustudent />
      </div>

      <div className="dash-main">
        <div className='row1'>
          <div className='projextbox'>
            <div className='project'>
              <p>Attendance %</p>
              <div className='projectin'>
                <p>78%</p>
              </div>
            </div>
            <div className='project'>
              <p>Achievement <FontAwesomeIcon icon={faTrophy} /></p>
              <div className='projectin'>
                <p>{stats.achievements} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
            <div className='project'>
              <p>Project <FontAwesomeIcon icon={faDiagramProject} /></p>
              <div className='projectin'>
                <p>{stats.projects} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
          </div>
        </div>
        <div className='row1'>
          <div className='projextbox'>
            <div className='project'>
              <p>Certification <FontAwesomeIcon icon={faAward} /></p>
              <div className='projectin'>
                <p>{stats.certifications} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
            <div className='project'>
              <p>Programming Language <FontAwesomeIcon icon={faCode} /></p>
              <div className='projectin'>
                <p>{stats.languages} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
            <div className='project'>
              <p>PS Rank <FontAwesomeIcon icon={faTrophy} /></p>
              <div className='projectin'>
                <p>{stats.ps} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
          </div>
        </div>
        <div className='row1'>
          <div className='projextbox'>
            <div className='project'>
              <p>Communication Language <FontAwesomeIcon icon={faPaperPlane} /></p>
              <div className='projectin'>
                <p>{stats.communication} <FontAwesomeIcon icon={faShieldHalved} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
