import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCalendarCheck,
  faChartPie,
  faGraduationCap,
  faListCheck,
  faUserTie,
  faClock,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import './studenthome.css';
import Menustudent from './Menustudent';

export default function Studenthome() {
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: 'Student' };

  const courseData = [
    { name: 'Web Development', progress: 75, grade: 'A', nextClass: '10:00 AM', assignments: 2 },
    { name: 'Database Systems', progress: 68, grade: 'B+', nextClass: '2:00 PM', assignments: 1 },
    { name: 'Software Engineering', progress: 92, grade: 'A+', nextClass: '11:30 AM', assignments: 3 },
    { name: 'Computer Networks', progress: 84, grade: 'A-', nextClass: '3:30 PM', assignments: 0 }
  ];

  const achievements = [
    { title: 'Perfect Attendance', icon: faClock, count: '30 days' },
    { title: 'Assignments Completed', icon: faListCheck, count: '45' },
    { title: 'Current GPA', icon: faAward, count: '3.8' },
    { title: 'Course Progress', icon: faChartPie, count: '78%' }
  ];

  return (
    <div className="student-dashboard">
      <Menustudent />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-info">
              <h1>Welcome Back, {user.firstName}! 👋</h1>
              <p>Let's continue your learning journey</p>
            </div>
            <div className="date-info">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="achievement-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">
                  <FontAwesomeIcon icon={achievement.icon} />
                </div>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.count}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="courses-section">
            <div className="section-header">
              <h2><FontAwesomeIcon icon={faBook} /> Your Courses</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="course-grid">
              {courseData.map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className="grade">{course.grade}</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <div className="course-footer">
                    <div className="next-class">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Next Class: {course.nextClass}</span>
                    </div>
                    <div className="assignments">
                      <FontAwesomeIcon icon={faListCheck} />
                      <span>{course.assignments} Pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-footer">
            <div className="quick-actions">
              <button className="action-btn primary">
                <FontAwesomeIcon icon={faGraduationCap} />
                View Transcript
              </button>
              <button className="action-btn">
                <FontAwesomeIcon icon={faUserTie} />
                Meet Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
