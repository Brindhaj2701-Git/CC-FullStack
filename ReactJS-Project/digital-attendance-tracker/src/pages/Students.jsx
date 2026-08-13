import { useState, useEffect } from 'react';
import { getStudents, saveStudents, getAttendance, getSubjects } from '../utils/storage';
import { getStudentOverallAttendance } from '../utils/attendanceUtils';
import { Plus, Search, Edit, Trash2, Eye, X } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterYear, setFilterYear] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', department: '', year: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setStudents(getStudents());
    setSubjects(getSubjects());
    setAttendance(getAttendance());
  }, []);

  const departments = [...new Set(students.map(s => s.department))];
  const years = [...new Set(students.map(s => s.year))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept ? student.department === filterDept : true;
    const matchesYear = filterYear ? student.year === filterYear : true;
    return matchesSearch && matchesDept && matchesYear;
  });

  const handleOpenModal = (student = null) => {
    if (student) {
      setFormData(student);
      setIsEditing(true);
    } else {
      setFormData({ id: '', name: '', email: '', department: '', year: '', phone: '' });
      setIsEditing(false);
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }

    let updatedStudents;
    if (isEditing) {
      updatedStudents = students.map(s => s.id === formData.id ? formData : s);
    } else {
      if (students.some(s => s.id === formData.id)) {
        setError('Student ID already exists.');
        return;
      }
      updatedStudents = [...students, formData];
    }
    
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(s => s.id !== id);
      setStudents(updatedStudents);
      saveStudents(updatedStudents);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Students</h1>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by ID or Name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '0.6rem', color: 'var(--text-light)' }} />
            </div>
          </div>
          <select className="form-control" style={{ width: 'auto' }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <select className="form-control" style={{ width: 'auto' }} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All Years</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Overall Att.</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? filteredStudents.map(student => {
                const attData = getStudentOverallAttendance(student.id, attendance, subjects);
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>
                      <div><strong>{student.name}</strong></div>
                      <div className="text-sm text-secondary">{student.email}</div>
                    </td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>{attData.percentage}%</td>
                    <td>
                      <span className={`badge ${attData.status === 'Good' ? 'badge-success' : attData.status === 'Warning' ? 'badge-warning' : 'badge-danger'}`}>
                        {attData.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleOpenModal(student)}><Edit size={14} /></button>
                        <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(student.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
              <button className="close-btn" onClick={handleCloseModal}><X size={24} /></button>
            </div>
            
            {error && <div className="text-danger mb-4" style={{ backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.25rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Student ID *</label>
                <input type="text" className="form-control" required value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} disabled={isEditing} />
              </div>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input type="text" className="form-control" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input type="text" className="form-control" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
