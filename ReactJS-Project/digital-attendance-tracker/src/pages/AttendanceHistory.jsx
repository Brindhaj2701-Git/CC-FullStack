import { useState, useEffect } from 'react';
import { getAttendance, getStudents, getSubjects } from '../utils/storage';

const AttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  const [filterStudent, setFilterStudent] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    setAttendance(getAttendance());
    setStudents(getStudents());
    setSubjects(getSubjects());
  }, []);

  const filteredHistory = attendance.filter(record => {
    const matchesStudent = filterStudent ? record.studentId === filterStudent : true;
    const matchesSubject = filterSubject ? record.subjectCode === filterSubject : true;
    const matchesStatus = filterStatus ? record.status === filterStatus : true;
    
    const recordDate = new Date(record.date);
    const matchesDateFrom = filterDateFrom ? recordDate >= new Date(filterDateFrom) : true;
    const matchesDateTo = filterDateTo ? recordDate <= new Date(filterDateTo) : true;

    return matchesStudent && matchesSubject && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  return (
    <div>
      <h1>Attendance History</h1>

      <div className="card">
        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
            <label className="form-label text-sm">Student</label>
            <select className="form-control" value={filterStudent} onChange={e => setFilterStudent(e.target.value)}>
              <option value="">All Students</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
            <label className="form-label text-sm">Subject</label>
            <select className="form-control" value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
            <label className="form-label text-sm">Status</label>
            <select className="form-control" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '130px' }}>
            <label className="form-label text-sm">From Date</label>
            <input type="date" className="form-control" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '130px' }}>
            <label className="form-label text-sm">To Date</label>
            <input type="date" className="form-control" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? filteredHistory.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.studentName} <span className="text-sm text-secondary">({record.studentId})</span></td>
                  <td>{record.subjectCode}</td>
                  <td>
                    <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No attendance records found matching filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
