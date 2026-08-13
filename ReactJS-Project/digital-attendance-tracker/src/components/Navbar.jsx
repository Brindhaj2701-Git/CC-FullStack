import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { logout } from '../utils/storage';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      height: 'var(--navbar-height)',
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 5
    }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>Welcome, Admin</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '2rem', 
          height: '2rem', 
          borderRadius: '50%', 
          backgroundColor: '#e5e7eb',
          color: 'var(--text-secondary)'
        }}>
          <User size={16} />
        </div>
        <button onClick={handleLogout} className="btn btn-secondary flex items-center gap-2" style={{ padding: '0.375rem 0.75rem' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
