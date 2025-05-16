import React, { useEffect, useState } from 'react';
import Menufaculty from './Menufaculty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNoteSticky,
  faUser,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faClipboardCheck,
  faHourglassHalf,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './FacultyHome.css';

export default function Facultyhome() {
  const [domainData, setDomainData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDomainData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch('https://student-tracker-backend-45dp.onrender.com/upload/domain-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        console.log('Fetched domain data:', data);
        setDomainData(data);
      } else {
        console.error('Unexpected response:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching domain data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomainData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://student-tracker-backend-45dp.onrender.com/upload/update-verification/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verify: true }),
      });

      if (response.ok) {
        fetchDomainData();
      } else {
        console.error('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error approving entry:', error);
    }
  };

  const stats = {
    pending: domainData.filter(item => !item.verify).length,
    approved: domainData.filter(item => item.verify).length,
    total: domainData.length,
  };

  return (
    <div className='faculty-dashboard'>
      <div className='dash-menu'>
        <Menufaculty />
      </div>

      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1>Faculty Dashboard</h1>
          <p>Manage and verify student submissions in your domain</p>
        </div>

        <div className='stats-container'>
          <div className='stat-card'>
            <h3>Pending Approvals</h3>
            <div className='stat-value'>
              <FontAwesomeIcon icon={faHourglassHalf} /> {stats.pending}
            </div>
          </div>
          <div className='stat-card'>
            <h3>Approved Submissions</h3>
            <div className='stat-value'>
              <FontAwesomeIcon icon={faCheckCircle} /> {stats.approved}
            </div>
          </div>
          <div className='stat-card'>
            <h3>Total Submissions</h3>
            <div className='stat-value'>
              <FontAwesomeIcon icon={faClipboardCheck} /> {stats.total}
            </div>
          </div>
        </div>

        <div className='work-grid'>
          {loading ? (
            <p>Loading submissions...</p>
          ) : domainData.length > 0 ? (
            domainData.map((item) => (
              <div className='work-card' key={item._id}>
                <div className='work-card-header'>
                  <h2 className='work-card-title'>{item.name || item.title}</h2>
                </div>

                <div className='work-card-content'>
                  <a
                    href={item.proof}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='proof-link'
                  >
                    <FontAwesomeIcon icon={faNoteSticky} /> View Submission
                  </a>

                  <div className='user-info'>
                    <FontAwesomeIcon icon={faUser} />
                    {item.userId?.firstName} ({item.userId?.roleNumber})
                  </div>

                  <div className='action-buttons'>
                    <button
                      className={`btn btn-approve ${item.verify ? 'disabled' : ''}`}
                      onClick={() => handleApprove(item._id)}
                      disabled={item.verify}
                    >
                      <FontAwesomeIcon icon={item.verify ? faCheckCircle : faSpinner} />
                      {item.verify ? 'Approved' : 'Approve'}
                    </button>

                    <button className='btn btn-revoke' disabled>
                      <FontAwesomeIcon icon={faTimesCircle} /> Revoke
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='empty-state'>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>No submissions available for your domain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
