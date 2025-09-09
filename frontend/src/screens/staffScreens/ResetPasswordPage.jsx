import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changeGeneratedPasswordBxdp } from "../../redux/bxdp/resetGeneratedBxdpPasswordSlice";
import { changeGeneratedPasswordOrg } from "../../redux/org/resetGeneratedOrgPasswordSlice";
import { signOutUser } from "../../redux/user/userLogoutSlice";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import cookie from "js-cookie";

export default function ResetPasswordPage() {
  const [inputData, setInputData] = useState({
    passwordA: "",
    passwordB: "",
    mou: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgId = cookie.get("orgId");
  const userId = cookie.get("userId");
  const isMetaAdmin = cookie.get("isMetaAdmin") === "true";
  const isBxdpAdmin = cookie.get("isBxdpAdmin") === "true";
  const isOrgAdmin = cookie.get("isOrgAdmin") === "true";
  const isOrgManager = cookie.get("isOrgManager") === "true";
  const isOrgUser = cookie.get("isOrgUser") === "true";


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isOrgAdmin || isOrgManager || isOrgUser) {
      dispatch(
        changeGeneratedPasswordOrg({
          org_id: orgId,
          user_id: userId,
          passwordA: inputData.passwordA,
          passwordB: inputData.passwordB,
          mou: inputData.mou,
          isMetaAdmin: isMetaAdmin,
          isBxdpAdmin: isBxdpAdmin,
          isOrgAdmin: isOrgAdmin,
          isOrgManager: isOrgManager,
          isOrgUser: isOrgUser,
        })
      ).then(() => {
        navigate("/org_dashboard")
      });
    } else {
      dispatch(
        changeGeneratedPasswordBxdp({
          user_id: userId,
          passwordA: inputData.passwordA,
          passwordB: inputData.passwordB,
          mou: inputData.mou,
          isMetaAdmin: isMetaAdmin,
          isBxdpAdmin: isBxdpAdmin,
          isOrgAdmin: isOrgAdmin,
          isOrgManager: isOrgManager,
          isOrgUser: isOrgUser,
        })
      ).then(() => {
        navigate("/org_dashboard")
      });;
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />

      <div className="flex flex-col justify-center items-center h-2/3 border-2 border-black">
        <form
          className="flex flex-col justify-around items-center h-2/3 w-2/5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="w-3/5 text-3xl">New Password</label>
          <input
            className="h-12 w-3/5"
            type="password"
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            placeholder="type here..."
            value={inputData.passwordA}
            onChange={(e) => {
              setInputData({ ...inputData, passwordA: e.target.value });
              console.log(e.target.value);
            }}
            required

          />
          {/*<span className="text-sm mt-1 mb-3">password must contain at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.</span>*/}
          <label className="w-3/5 text-3xl">Confirm Password</label>
          <input
            className="h-12 w-3/5"
            type="password"
            placeholder="type here..."
            value={inputData.passwordB}
            onChange={(e) => {
              setInputData({ ...inputData, passwordB: e.target.value });
              if (e.target.value !== inputData.passwordA) {
                return e.target.setCustomValidity("passwords do not match");
              }
              e.target.setCustomValidity("");
              console.log(e.target.value);
            }}
            required
          />
          {/* <label className="text-2xl">MOU</label>
          <input
            type="checkbox"
            id="mou"
            value={inputData.mou}
            onChange={() => {
              setInputData({
                ...inputData,
                mou: inputData.mou == true ? false : true,
              });
              console.log(e.target.value);
            }}
          /> */}
          <input
            className="border-2 border-black rounded-md h-10 w-1/3 cursor-pointer"
            type="submit"
          />
        </form>
      </div>

      <Footer />
    </div>
  );
}
