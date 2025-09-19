import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/sharedComponents/FooterAlt";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import LoginForm from "../../components/sharedComponents/LoginForm";
import ResetForm from "../../components/sharedComponents/ResetPasswordForm"
import LoginImage from "../../assets/login_image.png";
import { fetchUser } from "../../redux/user/userLoginSlice";
import { getLink } from "../../redux/user/recoverPasswordSlice";
import cookie from "js-cookie";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [form, setForm] = useState("login");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginStatus = useSelector((state) => state?.userLogin);
  const isAuthenticated = loginStatus?.isAuthenticated;
  const userInfo = loginStatus?.user;
  const userId = userInfo?.user_id;
  const orgId = userInfo?.org_id;
  const firstName = userInfo?.first_name;
  const lastName = userInfo?.last_name;
  const email = userInfo?.user_email;
  const zipcode = userInfo?.zipcode;
  const passwordResetRequired = userInfo?.password_reset_required;
  const isApproved = userInfo?.is_approved;
  const isActive = userInfo?.is_active;
  const isLoggedIn = userInfo?.is_logged_in;
  const isMetaAdmin = userInfo?.is_meta_admin;
  const isBxdpAdmin = userInfo?.is_bxdp_admin;
  const isOrgAdmin = userInfo?.is_org_admin;
  const isOrgManager = userInfo?.is_org_manager;
  const isOrgUser = userInfo?.is_org_user;
  const isUser = userInfo?.is_user;
  const inviteToken = userInfo?.invite_token;
  const wasInvited = userInfo?.was_invited;
  const userName = `${firstName} ${lastName}`;
  const emailCofirmed = userInfo?.email_cofirmed;
  const profile = userInfo?.profile;

  const loginUser = (e) => {
    e.preventDefault();
    if (userEmail.length > 0 && userPassword.length > 0) {
      dispatch(fetchUser({ userEmail, userPassword }));
    }
  };
  const recoverUser = (e) => {
    e.preventDefault();
    if (userEmail.length > 0) {
      dispatch(getLink({ email:userEmail}));
    }
  };

  useEffect(() => {
    if (!!isAuthenticated) {
      if (!isApproved && !!userInfo && !!isActive) {
        navigate("/approval_page");
      } else if (!isActive && !!isApproved) {
        navigate("/inactive_page");
      } else if (emailCofirmed==="false") {
        navigate("/confirm_email");
      } else if (!!passwordResetRequired || (wasInvited && inviteToken)) {
        navigate("/reset_password_page");
      } else if (
        (!!isMetaAdmin || !!isBxdpAdmin) &&
        !!isActive &&
        !passwordResetRequired
      ) {
        navigate("/dashboard", { replace: true });
      } else if (
        (!!isOrgAdmin || !!isOrgManager || !!isOrgUser) &&
        !!isActive &&
        !passwordResetRequired
      ) {
        navigate("/org_dashboard", { replace: true });
      } else if (
        !isMetaAdmin &&
        !isBxdpAdmin &&
        !isOrgAdmin &&
        !isOrgManager &&
        !isOrgUser &&
        isUser &&
        isActive &&
        isApproved &&
        !passwordResetRequired &&
        !profile
      ) {
        navigate("/create_profile", { replace: true });
      } else if (
        !isMetaAdmin &&
        !isBxdpAdmin &&
        !isOrgAdmin &&
        !isOrgManager &&
        !isOrgUser &&
        isUser &&
        isActive &&
        isApproved &&
        !passwordResetRequired &&
        profile
      ) {
        navigate("/", { replace: true });
      } else {
      }
    }
  }, [loginUser]);

  useEffect(() => {
    setUserEmail("");
    setUserPassword();
  }, []);


  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
       {/* <Navbar /> the Navbar has to be added in global main layout  */} 
      <div className="flex flex-col lg:flex-row h-[80vh] mt-[50px]">
        <div className="flex flex-col justify-center items-center w-1/2 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/bg.png')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        <div className="h-full flex-col w-full h-[80vh]">
          {form == "login" && (
            <LoginForm setUserEmail={setUserEmail} 
              setUserPassword={setUserPassword} 
              loginUser={loginUser} 
              setForm ={setForm}
            />
          )}
          {form == "reset" && (
            <ResetForm setUserEmail={setUserEmail} 
              setUserPassword={setUserPassword} 
              recoverUser={recoverUser} 
              setForm ={setForm}
            />
          )}
        </div>
      </div>
       {/* <Footer /> the footer has to be added in global main layout  */}
    </div>
  );
}

export default LoginPage;
