import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changeGeneratedPasswordBxdp } from "../../redux/bxdp/resetGeneratedBxdpPasswordSlice";
import { changeGeneratedPasswordOrg } from "../../redux/org/resetGeneratedOrgPasswordSlice";
import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import cookie from "js-cookie";

export default function InactiveUserPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let orgId = searchParams.get("orgId");
  let userId = searchParams.get("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin");
  const isOrgManager = cookie.get("isOrgManager");
  const isOrgStaff = cookie.get("isOrgUser");
  const isActive = cookie.get("isActive");
  const passwordResetRequired = cookie.get("passwordResetRequired");

  let convertMetaAdminToBoolean = isMetaAdmin === "true";
  let convertBxdpAdminToBoolean = isBxdpAdmin === "true";
  let convertOrgAdminToBoolean = isOrgAdmin === "true";
  let convertOrgManagerToBoolean = isOrgManager === "true";
  let convertOrgUserToBoolean = isOrgStaff === "true";

  if (!orgId) {
    orgId = sessionStorage.getItem("orgId");
  }

  if (!userId) {
    userId = sessionStorage.getItem("userId");
  }

  const renderAccountMessage = (
    convertMetaAdminToBoolean,
    convertBxdpAdminToBoolean,
    convertOrgAdminToBoolean,
    convertOrgManagerToBoolean,
    convertOrgUserToBoolean
  ) => {
    if (convertBxdpAdminToBoolean || convertMetaAdminToBoolean) {
      return (
        <p className="text-align text-xl">
          Please contact the bxdp helpdesk to inquire about your account
        </p>
      );
    } else if (
      convertOrgAdminToBoolean ||
      convertOrgManagerToBoolean ||
      convertOrgUserToBoolean
    ) {
      return (
        <p className="text-align text-xl">
          Please contact your organization's admin or manager to inquire about
          your account
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-align text-3xl">Your Account was Deactivated!!!</h1>
        {renderAccountMessage(
          convertMetaAdminToBoolean,
          convertBxdpAdminToBoolean,
          convertOrgAdminToBoolean,
          convertOrgManagerToBoolean,
          convertOrgUserToBoolean
        )}
      </div>

      <Footer />
    </div>
  );
}
