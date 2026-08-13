import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  History, 
  FileBarChart,
  AlertTriangle
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/students', name: 'Students', icon: <Users size={20} /> },
    { path: '/subjects', name: 'Subjects', icon: <BookOpen size={20} /> },
    { path: '/mark-attendance', name: 'Mark Attendance', icon: <ClipboardCheck size={20} /> },
    { path: '/history', name: 'History', icon: <History size={20} /> },
    { path: '/reports', name: 'Reports', icon: <FileBarChart size={20} /> },
    { path: '/low-attendance', name: 'Low Attendance', icon: <AlertTriangle size={20} /> },
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      backgroundColor: 'var(--surface-color)',
      borderRight: '1px solid var(--border-color)',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      zIndex: 10
    }}>
      <div style={{
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: 'var(--primary-color)'
      }}>
        Attendance Tracker
      </div>
      <nav style={{ padding: '1rem 0' }}>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-secondary)',
                  backgroundColor: location.pathname === item.path ? '#e0e7ff' : 'transparent',
                  borderRight: location.pathname === item.path ? '3px solid var(--primary-color)' : '3px solid transparent',
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  transition: 'background-color 0.2s',
                  gap: '0.75rem'
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
