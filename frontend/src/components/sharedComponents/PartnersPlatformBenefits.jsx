import React from "react";
import tempImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";


export const PartnersPlatformBenefits = () => {
  const navigate = useNavigate();

  const handleNavigation = (event,page) => {
    event.preventDefault();
    navigate(page);
  };

  const benefits = [
    {
      benefitImage: tempImage,
      benefitTitle: "Platea lectus sit.",
      benefitDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus ipsum viverra etiam.",
    },
    {
      benefitImage: tempImage,
      benefitTitle: "Platea lectus sit.",
      benefitDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus ipsum viverra etiam.",
    },
    {
      benefitImage: tempImage,
      benefitTitle: "Platea lectus sit.",
      benefitDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus ipsum viverra etiam.",
    },
  ];
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 gap-[24px] bg-[#fff]  md:h-[380px] h-[388px] w-screenoverflow-visible">
      <div className=" flex flex-col pl-6 pr-6 h-md pt-6 md:items-center md:pl-[72px] md:py-[72px] ">
        <div className="flex flex-col gap-[27px]  ">
          <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight cursor-pointer">
            <span className="text-tkh-brand-tangerine-5">Access</span> and Opportunity
            </h1>
            <p className=" text-[18px] max-w-[526px]">
              We connect community members to life-changing technology skills training programs, local events that spark curiosity, and resources.
            </p>
            <button
              className="py-[13px] px-4  rounded h-[75px] md:h-[52px] max-w-[388px] drop-shadow-btn font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0 hover:bg-tkh-brand-tangerine-2 transition ease-in-out   duration-900"
              onClick={(e) => handleNavigation(e,"/org_registration")}
            >
              Discover a Technology Training Program Today!
            </button>
          </div>
      </div>
      <div className=" flex flex-col overflow-visible items-end md:items-start md:pr-[72px] pt-0px  md:pt-[72px]">
        <div className="bg-tkh-brand-tangerine-5 h-[300px] z-10 w-[100vw] md:w-full md:h-[350px]  md:max-w=[636px] md:rounded bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/image+(4).png')]"/> 
      </div>
    </div>
  );
};
