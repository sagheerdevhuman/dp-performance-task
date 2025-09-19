import React from "react";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import tempImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (event.target.name == "organization") {
      navigate("/org_user_registration");
    } else if (event.target.name == "user") {
      navigate("/user_registration");
    }
  };

  return (
    <div className="flex flex-col justify-between m-h-screen h-screen">
      {/* <Navbar /> the Navbar has to be added in global main layout  */}
      <div className="flex flex-col p-8 flex-wrap lg:flex-row justify-center items-center my-10 text-center">
        <h1 className="lg:w-full text-4xl mb-8 xl:text-6xl font-semibold">
          Please Select A Sign Up Option
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:mt-10 2xl:w-full">
          <div className="flex flex-col justify-center items-center gap-10 mx-5 my-8 lg:mx-0 lg:mr-5 lg:my-0 lg:w-3/5 xl:w-auto 2xl:w-1/2">
            <img
              src="https://d1yh21d3dzz97r.cloudfront.net/pexels-mikhail-nilov-9301297.jpg"
              alt="Organization"
              className="w-4/5 lg:w-9/12 2xl:w-7/12"
            />
            <button
              name="organization"
              onClick={(e) => handleClick(e)}
              className="h-12 w-8/12 md:w-1/4 lg:w-2/4 xl:w-1/4 border-0 rounded-md bg-tkh-brand-tangerine-5 drop-shadow-btn text-center text-tkh-grayscale-0 font-bold"
            >
              Organization
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-10 mx-5 my-8 lg:mx-0 lg:mr-5 lg:my-0 lg:w-3/5 xl:w-auto 2xl:w-1/2">
            <img
              src="https://d1yh21d3dzz97r.cloudfront.net/pexels-keira-burton-6147053.jpg"
              alt="Community Member"
              className="w-4/5 lg:w-9/12 2xl:w-7/12"
            />
            <button
              name="user"
              onClick={(e) => handleClick(e)}
              className="h-12 w-8/12 md:w-1/4 lg:w-2/4 xl:w-1/4 border-0 rounded-md bg-tkh-brand-tangerine-5 drop-shadow-btn text-center text-tkh-grayscale-0 font-bold"
            >
              Community Member
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> the footer has to be added in global main layout  */}
    </div>
  );
}
