import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

function OrgBanner() {
  const navigate = useNavigate();
  const preferencesSet = cookie.get("profileCofirmed");
console.log(preferencesSet)
  useEffect(() => {
    if(preferencesSet == "false"){
      navigate("/set_preferences")
    }
  }, []);




  return (
    <>
    </>
  );
}
export default OrgBanner;
