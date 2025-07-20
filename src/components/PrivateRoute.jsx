import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/hooks";

export default function PrivateRoute({ roles = [] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Optional: role check
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
