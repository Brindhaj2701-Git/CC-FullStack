import { useState, useEffect } from 'react';
import { getStudents, getSubjects, getAttendance } from '../utils/storage';
import { getStudentOverallAttendance } from '../utils/attendanceUtils';

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
    setSubjects(getSubjects());
    setAttendance(getAttendance());
  }, []);

  const reportData = students.map(student => {
    const data = getStudentOverallAttendance(student.id, attendance, subjects);
    return {
      ...student,
      ...data,
      absent: data.totalClasses - data.present
    };
  });

  return (
    <div>
      <h1>Attendance Reports</h1>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map(data => (
                <tr key={data.id}>
                  <td>
                    <strong>{data.name}</strong>
                    <div className="text-sm text-secondary">{data.id}</div>
                  </td>
                  <td>{data.totalClasses}</td>
                  <td>{data.present}</td>
                  <td>{data.absent}</td>
                  <td><strong>{data.percentage}%</strong></td>
                  <td style={{ minWidth: '150px' }}>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${data.percentage}%`,
                          backgroundColor: data.status === 'Good' ? '#10b981' : data.status === 'Warning' ? '#f59e0b' : '#ef4444' 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${data.status === 'Good' ? 'badge-success' : data.status === 'Warning' ? 'badge-warning' : 'badge-danger'}`}>
                      {data.status}
                    </span>
                  </td>
                </tr>
              ))}
              {reportData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-secondary">No students available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
