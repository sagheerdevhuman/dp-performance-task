import { Outlet, Navigate, useLocation } from "react-router-dom";

const ResetPassRoute = () => {
  const location = useLocation();


  return (
    // <Outlet />
    // <Navigate to="/login" state={{ from: location }} replace />
    <Outlet />
  );
};

export default ResetPassRoute;
