import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword } from "../../redux/user/resetPasswordSlice";
import { signOutUser } from "../../redux/user/userLogoutSlice";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";


export default function ReremovPasswordPage() {
  const [inputData, setInputData] = useState({
    passwordA: "",
    passwordB: "",
  });
  const email = useLocation().search.split('=')[2];
  const resetToken = useLocation().search.split('=')[1].split("&")[0];
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgId = cookie.get("orgId");
  const userId = cookie.get("userId");
  const isMetaAdmin = cookie.get("isMetaAdmin") === "true";
  const isBxdpAdmin = cookie.get("isBxdpAdmin") === "true";
  const isOrgAdmin = cookie.get("isOrgAdmin") === "true";
  const isOrgManager = cookie.get("isOrgManager") === "true";
  const isOrgUser = cookie.get("isOrgUser") === "true";


  console.log(resetToken)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changePassword({
        email: email,
        reset_password_token: resetToken,
        passwordA: inputData.passwordA,
        passwordB: inputData.passwordB,
      })
    ).then(() => {
      cookie.remove("orgId");
      cookie.remove("userId");
      cookie.remove("isAuthenticated");
      cookie.remove("firstName");
      cookie.remove("lastName");
      cookie.remove("userName");
      cookie.remove("email");
      cookie.remove("zipcode");
      cookie.remove("passwordResetRequired");
      cookie.remove("isApproved");
      cookie.remove("isActive");
      cookie.remove("isLoggedIn");
      cookie.remove("isMetaAdmin");
      cookie.remove("isBxdpAdmin");
      cookie.remove("isOrgAdmin");
      cookie.remove("isOrgManager");
      cookie.remove("isOrgUser");
      cookie.remove("isUser");
      cookie.remove("inviteToken");
      cookie.remove("wasInvited");
      navigate("/login")
    });
  };

  return (
    <div className="flex flex-col justify-between h-screen w-screen">
      <Navbar />

      <div className="flex flex-col justify-center items-center min-h-[60vh] ">
        <form
          className="flex flex-col justify-around items-center  gap-3 w-2/5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className=" flex flex-col mb-[40px]  text-center md:text-left">
            <h1 className="text-4xl font-bold">Reset Password:</h1>
          </div>

          <label className="w-3/5 text-3xl">New Password</label>
          <input
            className="h-12 w-3/5"
            type="password"
            placeholder="type here..."
            value={inputData.passwordA}
            onChange={(e) => {
              setInputData({ ...inputData, passwordA: e.target.value });
              console.log(e.target.value);
            }}
            required
          />
         
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

          <div className="flex flex-col mt-2 h-10 w-3/5">
            <button
              type="submit"
              className=" h-10 border-0 rounded-md bg-tkh-brand-tangerine-5 w-full
                drop-shadow-btn text-center text-tkh-grayscale-0 font-bold capitalize "
            >
              submit
            </button>
          </div>
          
        </form>
      </div>

      <Footer />
    </div>
  );
}
