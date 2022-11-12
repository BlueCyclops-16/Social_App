import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, loading, children }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PrivateRoute;
