import { useState, useEffect } from 'react';
import { getSubjects, saveSubjects } from '../utils/storage';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ code: '', name: '', faculty: '', totalClasses: 0, classesConducted: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(search.toLowerCase()) || 
    subject.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (subject = null) => {
    if (subject) {
      setFormData(subject);
      setIsEditing(true);
    } else {
      setFormData({ code: '', name: '', faculty: '', totalClasses: 0, classesConducted: 0 });
      setIsEditing(false);
    }
    setError('');
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      setError('Subject Code and Name are required.');
      return;
    }

    let updatedSubjects;
    if (isEditing) {
      updatedSubjects = subjects.map(s => s.code === formData.code ? formData : s);
    } else {
      if (subjects.some(s => s.code === formData.code)) {
        setError('Subject Code already exists.');
        return;
      }
      updatedSubjects = [...subjects, formData];
    }
    
    setSubjects(updatedSubjects);
    saveSubjects(updatedSubjects);
    handleCloseModal();
  };

  const handleDelete = (code) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      const updatedSubjects = subjects.filter(s => s.code !== code);
      setSubjects(updatedSubjects);
      saveSubjects(updatedSubjects);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Subjects</h1>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Subject
        </button>
      </div>

      <div className="card">
        <div className="form-group mb-4" style={{ maxWidth: '300px' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search subjects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '0.6rem', color: 'var(--text-light)' }} />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Faculty</th>
                <th>Total Classes</th>
                <th>Conducted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? filteredSubjects.map(subject => (
                <tr key={subject.code}>
                  <td><strong>{subject.code}</strong></td>
                  <td>{subject.name}</td>
                  <td>{subject.faculty}</td>
                  <td>{subject.totalClasses}</td>
                  <td>{subject.classesConducted}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleOpenModal(subject)}><Edit size={14} /></button>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(subject.code)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center text-secondary">No subjects found.</td>
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
              <h2>{isEditing ? 'Edit Subject' : 'Add Subject'}</h2>
              <button className="close-btn" onClick={handleCloseModal}><X size={24} /></button>
            </div>
            
            {error && <div className="text-danger mb-4" style={{ backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.25rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Subject Code *</label>
                <input type="text" className="form-control" required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} disabled={isEditing} />
              </div>
              <div className="form-group">
                <label className="form-label">Subject Name *</label>
                <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Faculty</label>
                <input type="text" className="form-control" value={formData.faculty} onChange={e => setFormData({...formData, faculty: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Total Classes Planned</label>
                <input type="number" className="form-control" value={formData.totalClasses} onChange={e => setFormData({...formData, totalClasses: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Classes Conducted</label>
                <input type="number" className="form-control" value={formData.classesConducted} onChange={e => setFormData({...formData, classesConducted: e.target.value})} />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
