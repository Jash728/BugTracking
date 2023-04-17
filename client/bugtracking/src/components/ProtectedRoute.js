import { Route, Navigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

function ProtectedRoute({ element: Component, ...rest }) {
  // check if user is authenticated and authorized to access the route
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.role === 'manager') {
        return <Route {...rest} element={<Component />} />;
      }
    } catch (err) {
      console.log('Invalid token:', err);
    }
  }

  // redirect to login page if user is not authenticated or authorized
  return <Navigate to="/login" />;
}