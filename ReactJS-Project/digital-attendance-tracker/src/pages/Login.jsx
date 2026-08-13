import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuth, getAuth } from '../utils/storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuth()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setAuth('true');
      navigate('/');
    } else {
      setError('Invalid username or password. Use admin / admin123');
    }
  };

  const handleDemoLogin = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Attendance Tracker</h1>
          <p className="text-secondary">Please sign in to continue</p>
        </div>
        
        {error && <div className="text-danger text-center mb-4" style={{ backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.25rem' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username / Email</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem' }}>
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-secondary" style={{ marginBottom: '0.5rem' }}>Demo Credentials: admin / admin123</p>
          <button onClick={handleDemoLogin} className="btn btn-secondary text-sm">
            Fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
