import React, { useEffect, useState } from 'react';
import Menuadmin from './Menuadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar, faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import './Adminhome.css';

export default function Adminhome() {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('total'); // Default to total points

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No auth token found');
          return;
        }

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
        setUsers(data); // Data is already sorted from backend
      } catch (error) {
        console.error('Error fetching users:', error);
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

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menuadmin />
      </div>

      <div className='dash-main-admin'>
        <div className='option'>
          <h1>Student Rankings <FontAwesomeIcon icon={faRankingStar} /></h1>
          <div className='ranking-controls'>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="total">Total Points</option>
              <option value="project">Project Points</option>
              <option value="language">Language Points</option>
              <option value="achievement">Achievement Points</option>
              <option value="certificate">Certificate Points</option>
            </select>
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
                {users.map((user) => (
                  <tr key={user.studentId} className={user.rank <= 3 ? `rank-${user.rank}` : ''}>
                    <td>{getRankIcon(user.rank)}</td>
                    <td>{user.roleNumber}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.points.total || 0}</td>
                    <td>{user.points.project || 0}</td>
                    <td>{user.points.language || 0}</td>
                    <td>{user.points.achievement || 0}</td>
                    <td>{user.points.certificate || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
