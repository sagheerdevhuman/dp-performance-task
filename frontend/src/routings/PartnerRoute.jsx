import { Outlet, Navigate, useLocation } from "react-router-dom";
import cookie from "js-cookie";

const PartnerRoute = () => {
  const location = useLocation();
  // console.log("Your location ----->", location);

  const userStatus = {
    isAuthenticated: cookie.get("isAuthenticated") === "true",
    isApproved: cookie.get("isApproved") === "true",
    isActive: cookie.get("isActive") === "true",
    isLoggedIn: cookie.get("isLoggedIn") === "true",
  };

  // console.log("Your user status ----->", userStatus);

  return userStatus.isAuthenticated &&
    userStatus.isApproved &&
    userStatus.isActive &&
    userStatus.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/softlock" state={{ from: location }} replace />
  );
};

export default PartnerRoute;
