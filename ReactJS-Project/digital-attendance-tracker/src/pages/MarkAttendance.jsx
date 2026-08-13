import { useState, useEffect } from 'react';
import { getStudents, getSubjects, getAttendance, saveAttendance, saveSubjects } from '../utils/storage';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setStudents(getStudents());
    setSubjects(getSubjects());
  }, []);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    // Reset attendance status for new subject selection
    const defaultStatus = {};
    students.forEach(s => defaultStatus[s.id] = 'Present'); // Default all to present to speed up marking
    setAttendanceStatus(defaultStatus);
    setError('');
    setSuccessMessage('');
  };

  const handleToggle = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSave = () => {
    if (!date || !selectedSubject) {
      setError('Please select both Date and Subject.');
      return;
    }

    const allAttendance = getAttendance();
    
    // Check for duplicates
    const duplicateExists = allAttendance.some(record => 
      record.date === date && record.subjectCode === selectedSubject
    );

    if (duplicateExists) {
      setError('Attendance for this subject on the selected date has already been marked.');
      return;
    }

    const newRecords = students.map(student => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9), // unique ID
      date,
      subjectCode: selectedSubject,
      studentId: student.id,
      studentName: student.name,
      status: attendanceStatus[student.id] || 'Present' // Default to present if not touched
    }));

    saveAttendance([...allAttendance, ...newRecords]);

    // Update classes conducted for the subject
    const updatedSubjects = subjects.map(sub => {
      if (sub.code === selectedSubject) {
        return { ...sub, classesConducted: (parseInt(sub.classesConducted || 0, 10) + 1) };
      }
      return sub;
    });
    setSubjects(updatedSubjects);
    saveSubjects(updatedSubjects);

    setSuccessMessage('Attendance saved successfully!');
    setError('');
    
    // Clear selection
    setSelectedSubject('');
  };

  return (
    <div>
      <h1>Mark Attendance</h1>

      <div className="card">
        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={date} 
              onChange={e => {setDate(e.target.value); setError(''); setSuccessMessage('');}}
            />
          </div>
          <div className="form-group" style={{ flex: 2, minWidth: '200px' }}>
            <label className="form-label">Subject</label>
            <select className="form-control" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">-- Select Subject --</option>
              {subjects.map(sub => (
                <option key={sub.code} value={sub.code}>{sub.code} - {sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="text-danger mb-4" style={{ backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '0.375rem' }}>{error}</div>}
        {successMessage && <div className="mb-4" style={{ color: '#065f46', backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '0.375rem' }}>{successMessage}</div>}

        {selectedSubject && students.length > 0 && (
          <>
            <div className="table-container mb-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Department</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className={`btn ${attendanceStatus[student.id] === 'Present' || !attendanceStatus[student.id] ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleToggle(student.id, 'Present')}
                            style={{ padding: '0.25rem 0.75rem' }}
                          >
                            Present
                          </button>
                          <button 
                            className={`btn ${attendanceStatus[student.id] === 'Absent' ? 'btn-danger' : 'btn-secondary'}`}
                            onClick={() => handleToggle(student.id, 'Absent')}
                            style={{ padding: '0.25rem 0.75rem' }}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.75rem 2rem' }}>
                Save Attendance
              </button>
            </div>
          </>
        )}
        
        {selectedSubject && students.length === 0 && (
          <p className="text-secondary text-center">No students found to mark attendance.</p>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
