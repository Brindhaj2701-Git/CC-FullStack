import { useState, useEffect } from 'react';
import { Users, BookOpen, ClipboardCheck, Percent } from 'lucide-react';
import { getStudents, getSubjects, getAttendance } from '../utils/storage';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    todayAttendance: 0,
    overallPercentage: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [lowAttendanceStudents, setLowAttendanceStudents] = useState([]);

  useEffect(() => {
    const students = getStudents();
    const subjects = getSubjects();
    const attendance = getAttendance();

    // Stats calculations
    const totalStudents = students.length;
    const totalClasses = subjects.reduce((acc, sub) => acc + parseInt(sub.classesConducted || 0, 10), 0);
    
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendance.filter(r => r.date === today);
    const todayPresent = todayRecords.filter(r => r.status === 'Present').length;
    
    // Overall Percentage
    let totalPresent = 0;
    let totalRecordsCount = attendance.length;
    attendance.forEach(r => {
      if (r.status === 'Present') totalPresent++;
    });
    
    const overallPercentage = totalRecordsCount > 0 ? Math.round((totalPresent / totalRecordsCount) * 100) : 0;

    setStats({
      totalStudents,
      totalClasses,
      todayAttendance: todayPresent,
      overallPercentage
    });

    // Recent activity (last 5 records)
    setRecentActivity(attendance.slice().reverse().slice(0, 5));

  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}><BookOpen size={24} /></div>
          <div className="stat-info">
            <h3>Total Classes Conducted</h3>
            <p>{stats.totalClasses}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef9c3', color: '#ca8a04' }}><ClipboardCheck size={24} /></div>
          <div className="stat-info">
            <h3>Today's Present</h3>
            <p>{stats.todayAttendance}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e8ff', color: '#9333ea' }}><Percent size={24} /></div>
          <div className="stat-info">
            <h3>Overall Attendance</h3>
            <p>{stats.overallPercentage}%</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h2>Recent Attendance Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student ID</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.studentId}</td>
                      <td>{record.subjectCode}</td>
                      <td>
                        <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondary">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
