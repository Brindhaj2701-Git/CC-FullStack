import { useState, useEffect } from 'react';
import { getStudents, getSubjects, getAttendance } from '../utils/storage';
import { getStudentOverallAttendance } from '../utils/attendanceUtils';
import { AlertTriangle } from 'lucide-react';

const LowAttendance = () => {
  const [defaulters, setDefaulters] = useState([]);

  useEffect(() => {
    const students = getStudents();
    const subjects = getSubjects();
    const attendance = getAttendance();

    const lowAttStudents = students.map(student => {
      const data = getStudentOverallAttendance(student.id, attendance, subjects);
      return {
        ...student,
        ...data
      };
    }).filter(s => s.percentage < 75);

    setDefaulters(lowAttStudents);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle color="var(--danger-color)" size={28} />
        <h1 style={{ margin: 0 }}>Low Attendance Students</h1>
      </div>
      <p className="text-secondary mb-4">Students whose attendance is below the mandatory 75% threshold.</p>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Percentage</th>
                <th>Warning Status</th>
              </tr>
            </thead>
            <tbody>
              {defaulters.length > 0 ? defaulters.map(student => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                    <div className="text-sm text-secondary">{student.id}</div>
                  </td>
                  <td>{student.department}</td>
                  <td>{student.totalClasses}</td>
                  <td>{student.present}</td>
                  <td><strong>{student.percentage}%</strong></td>
                  <td>
                    <span className={`badge ${student.status === 'Warning' ? 'badge-warning' : 'badge-danger'}`}>
                      {student.status === 'Warning' ? 'Requires Attention' : 'Critical Shortage'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center text-secondary" style={{ padding: '3rem 1rem' }}>
                    <div className="flex flex-col items-center gap-2" style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '50%' }}>
                        <svg xmlns="http://www.3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <p>Great! No students have attendance below 75%.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowAttendance;
