import { Outlet, Navigate, useLocation } from "react-router-dom";
import cookie from "js-cookie";

const OrgRoute = () => {
  const location = useLocation();
  // console.log("Your location ----->", location);
  const userStatus = {
    isAuthenticated:
      cookie.get("isAuthenticated") == "true" ? true : false,
    isOrgAdmin: cookie.get("isOrgAdmin") == "true" ? true : false,
    isOrgUser: cookie.get("isOrgUser") == "true" ? true : false,
    isMetaAdmin: cookie.get("isMetaAdmin") == "true" ? true : false,
    isBxdpAdmin: cookie.get("isBxdpAdmin") == "true" ? true : false,
  };

  console.log("Your user status ----->", userStatus);

  return !!userStatus.isAuthenticated && (!!userStatus.isMetaAdmin || !!userStatus.isBxdpAdmin || !!userStatus.isOrgAdmin || !!userStatus.isOrgUser )? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default OrgRoute;
