import React from "react";
import tempImage from "../../assets/login_image.png";
import cookie from "js-cookie";


export const PartnersHeader = () => {
  const loginStatus = cookie.get("isLoggedIn");
  const renderButtons = () => {
    if (!loginStatus) {
      return (
        <div className="flex flex-col-reverse xl:flex-row justify-evenly items-center xl:pt-3 h-20 xl:h-1/5 w-full xl:w-3/4">
          <a
            href="/sign_up"
            className="py-2 px-4 rounded-md font-semibold bg-tkh-brand-tangerine-3 text-tkh-solid-0"
          >
            Join as an organization
          </a>
          <a
            href="/login"
            className="py-2 px-3 rounded-md font-semibold text-tkh-grayscale-8"
          >
            Log in as org
          </a>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-3 xl:py-4 h-full">
      <div className="flex flex-col justify-center items-center gap-5 pb-5 md:pb-10 xl:pb-0 xl:px-56 w-9/12 sm:w-8/12 md:w-3/5 lg:w-5/12 xl:w-2/3 2xl:w-1/2 xl:h-52 text-center">
        <h1 className="text-4xl xl:text-6xl font-bold">Partners</h1>
        <p className="text-md md:text-xl text-tkh-grayscale-9">
          A little sumn sumn about how being a DigitalPipline partner is real nice and why
          the should join us. In two lines or less
        </p>

        {renderButtons()}
      </div>
      <div className="flex justify-center items-center px-7 sm:px-24 lg:px-0 xl:pt-10 lg:h-[57vh] lg:w-7/12 2xl:h-[60vh] 2xl:w-6/12">
        <img
          src="https://images.unsplash.com/photo-1588020062154-ba525721b248?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          alt="Partner Building"
          className="object-fit h-60 w-96 sm:w-screen sm:h-80 md:h-96 lg:h-full rounded-sm"
        />
      </div>
    </div>
  );
};
