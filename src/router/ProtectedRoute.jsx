import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/tokenHandler';

function ProtectedRoute({ component: Component }) {
  const token = getAuthToken();
  return token ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
