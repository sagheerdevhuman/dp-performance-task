import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Confirm } from "../../../components/utls/confirm_page";
import cookie from "js-cookie";

function ConfirmOrg() {
  const dispatch = useDispatch();
  const newProgram = useSelector((state) => state?.newProgram);
  const navigate = useNavigate();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin")
  const type = "Org"
  const title = "Org Confirmation"
  const message = "Thank you for registering organization, on Digital Pipeline! "
  const button_text = "back to dashboard"
 
  function handleClick(event) {
    event.preventDefault();
      navigate("/dashboard");
  }
  

 
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <Confirm 
        type={type}
        title={title}
        handleClick={handleClick}
        message={message} 
        button_text={button_text} 
      />
    </div>
  );

}

export default ConfirmOrg;
