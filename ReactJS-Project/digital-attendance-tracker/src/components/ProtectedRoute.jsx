import { Navigate } from 'react-router-dom';
import { getAuth } from '../utils/storage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
