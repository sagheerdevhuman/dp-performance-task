import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Confirm } from "../../../components/utls/confirm_page";
import cookie from "js-cookie";

function ConfirmEvent() {
  const dispatch = useDispatch();
  const newProgram = useSelector((state) => state?.newProgram);
  const navigate = useNavigate();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin")
  const type = "Event"
  const title = "Event Confirmation"
  const message_1 = "Thank you for submitting your event,Our team is reviewing it to ensure it meets our guidelines. Your event won’t appear on the Explore page until approved"
  const message_2 = "Thank you for submitting your event! Your event is instantly appoved."
  const button_text = "back to dashboard"
  
  console.log(isMetaAdmin)


  function handleClick(event) {
    event.preventDefault();
    if((isBxdpAdmin=="true")||(isMetaAdmin=="true")){
      navigate("/dashboard");
    }
    else{
      navigate("/org_dashboard");
    }
  }
  

 
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <Confirm 
        type={type}
        title={title}
        handleClick={handleClick} 
        message={(isBxdpAdmin==true)||(isBxdpAdmin==true) ? message_2 : message_1} 
        button_text={button_text} 
      />
    </div>
  );

}

export default ConfirmEvent;
