import React, { useEffect, useState } from 'react';
import Menuadmin from './Menuadmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

export default function Adminhome() {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('total'); // Default to total points

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/upload/rank?sortBy=${category}`); // Add query param for sorting
        const data = await response.json();
        // Sort users based on the selected category
        const sortedUsers = data.sort((a, b) => b.points[category] - a.points[category]);
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [category]); // Re-fetch users when category changes

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menuadmin />
      </div>

      <div className='dash-main-admin'>
        <div className='option'>
          <div className="up" onClick={() => setCategory('total')}><p>All</p></div>
          <div className="up" onClick={() => setCategory('achievement')}><p>Achievement</p></div>
          <div className="up" onClick={() => setCategory('certificate')}><p>Certificate</p></div>
          <div className="up" onClick={() => setCategory('project')}><p>Project</p></div>
          <div className="up" onClick={() => setCategory('communication')}><p>Ps</p></div>
          <div className="up" onClick={() => setCategory('language')}><p>Language</p></div>
        </div>

        <h2>Ranking <FontAwesomeIcon icon={faRankingStar} /></h2>

        {/* Render the user ranking list */}
        {users.map((user) => (
          <div className='box' key={user._id}>
            <div className='box-content'>
              <h3>
                <FontAwesomeIcon icon={faRankingStar} /> {user.firstName}
              </h3>
              <p>{user.department}</p>
              <p>{user.batch} year</p>
              <p>{user.points[category]}</p> {/* Show points based on the selected category */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
