import React, { useEffect, useState } from 'react';
import Menufaculty from './Menufaculty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faNoteSticky} from '@fortawesome/free-solid-svg-icons';

export default function Facultyhome() {
  const [domainData, setDomainData] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchDomainData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch domain-specific data
      const response = await fetch('http://localhost:8000/upload/domain-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok && response.headers.get('content-type').includes('application/json')) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setDomainData(data);
      } else {
        console.error('Unexpected response:', await response.text());
      }

      // Fetch user data
      const userResponse = await fetch('http://localhost:8000/upload/domain-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (userResponse.ok && userResponse.headers.get('content-type').includes('application/json')) {
        const userData = await userResponse.json();
        console.log('Fetched user data:', userData);
        setUserData(userData);
      } else {
        console.error('Unexpected response:', await userResponse.text());
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDomainData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8000/upload/update-verification/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verify: true })
      });

      if (response.ok) {
        // Refetch the data to refresh the state
        await fetchDomainData();
      } else {
        console.error('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error approving entry:', error);
    }
  };

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menufaculty />
      </div>
      <div className='dash-main'>
        <h2>Your Domain Work...</h2>
        <div className="grid-container">
        {domainData.length > 0 ? (
          domainData.map((item) => (
            <div className="work" key={item._id}>
              <h2 className="title">{item.name || item.title}</h2>
              <p>
                <a
                  href={item.proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <FontAwesomeIcon icon={faNoteSticky} />
                </a>
              </p>
              <button onClick={() => handleApprove(item._id)} disabled={item.verify}>Approve</button>
              <button>Revoke</button>
              <p className='user-info'>
                {item.userId.firstName} ( {item.userId.roleNumber})
              </p>
            </div>
          ))
        ) : (
          <p>No data available for your domain.</p>
        )}
      </div>
    </div>
    </div>
  );
}
