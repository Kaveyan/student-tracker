import React, { useEffect, useState } from 'react';
import Menuadmin from './Menuadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar, faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import './Adminhome.css';

export default function Adminhome() {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('total'); // Default to total points
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3001/upload/list?sortBy=${category}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (error) {
        setError('Failed to fetch rankings. Please try again.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [category]);

  // Get the appropriate icon for the rank
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return <FontAwesomeIcon icon={faTrophy} className="gold-trophy" />;
      case 2:
        return <FontAwesomeIcon icon={faMedal} className="silver-medal" />;
      case 3:
        return <FontAwesomeIcon icon={faAward} className="bronze-award" />;
      default:
        return <span className="rank-number">{rank}</span>;
    }
  };

  // Format points with commas
  const formatPoints = (points) => {
    return points.toLocaleString();
  };

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menuadmin 
          onCollapseChange={(collapsed) => {
            const menuElement = document.querySelector('.sidebar');
            if (menuElement) {
              menuElement.classList.toggle('collapsed');
            }
          }} 
        />
      </div>

      <div className='dash-main-admin'>
        <div className='admin-dashboard'>
          <div className='dashboard-header'>
            <h1>Student Rankings <FontAwesomeIcon icon={faRankingStar} /></h1>
            <div className='filter-container'>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className='category-select'
              >
                <option value="total">Total Points</option>
                <option value="project">Project Points</option>
                <option value="language">Language Points</option>
                <option value="achievement">Achievement Points</option>
                <option value="certificate">Certificate Points</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className='loading-container'>
              <div className='loading-spinner'></div>
              <p>Loading rankings...</p>
            </div>
          )}

          {error && (
            <div className='error-message'>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className='ranking-container'>
              <div className='ranking-stats'>
                <div className='stat-card'>
                  <h3>Total Students</h3>
                  <p className='stat-number'>{users.length}</p>
                </div>
                <div className='stat-card'>
                  <h3>Top Performer</h3>
                  <p className='stat-number'>{users[0]?.points?.total || 0}</p>
                </div>
              </div>

              <div className='ranking-table'>
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Roll Number</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Total Points</th>
                      <th>Project</th>
                      <th>Language</th>
                      <th>Achievement</th>
                      <th>Certificate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) && users.map((user) => (
                      <tr 
                        key={user.studentId} 
                        className={`rank-row ${user.rank <= 3 ? `rank-${user.rank}` : ''}`}
                      >
                        <td className='rank-cell'>{getRankIcon(user.rank)}</td>
                        <td>{user.roleNumber}</td>
                        <td>{`${user.firstName}`}</td>
                        <td>{user.email}</td>
                        <td>{formatPoints(user.points?.total || 0)}</td>
                        <td>{formatPoints(user.points?.project || 0)}</td>
                        <td>{formatPoints(user.points?.language || 0)}</td>
                        <td>{formatPoints(user.points?.achievement || 0)}</td>
                        <td>{formatPoints(user.points?.certificate || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
