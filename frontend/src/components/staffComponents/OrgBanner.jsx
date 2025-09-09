import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orgApprovalStatus } from "../../redux/org/approveOrgSlice";
import { orgFeatureStatus } from "../../redux/org/featureOrgSlice";
import { orgActiveStatus } from "../../redux/org/activateOrgSlice";
import { removeOrg } from "../../redux/org/deleteOrgSlice";
import {TableButton} from "./TableButton";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

function OrgBanner() {
  const dispatch = useDispatch();
  const approved = useSelector((state) => state?.getOrgById?.org?.org?.is_approved);
  const navigate = useNavigate();
  const emailCofirmed = cookie.get("emailCofirmed");
  const orgId = cookie.get("orgId");
  const text =` Organization is now pending approval`

  useEffect(() => {
    if(emailCofirmed=="false"){
      navigate("/confirm_email")
    }else if(orgId=="null"){
      navigate("/org_registration")
    }
  }, []);


  if (approved===false) {
    return(
    <>
      <div >
        <div className=" banner flex items-end justify-center p-3 text-[#fff]">
         <p>{text}</p>
        </div>
        
      </div>
      <style jsx>{`
        .seclect-menu {
          background: white;
        }
        .banner {
          background: red;
          height:80px;
          top:20;
          width:100vw;
        }
      `}</style>
    </>
  )}

  return (
    <>
    </>
  );
}
export default OrgBanner;
