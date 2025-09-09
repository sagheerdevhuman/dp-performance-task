import React from "react";
import tempImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";


export const AboutPageMission = () => {
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
    <div className=" grid md:grid-cols-2 grid-cols-1 gap-[24px] bg-[#fff]  xl:h-[700px] md:h-[950px] h-[1400px] w-screenoverflow-visible">
      <div className=" flex flex-col pl-6 pr-6 h-md pt-6 md:items-center md:pl-[72px] md:py-[72px] ">
        <div className="flex flex-col gap-[27px] h-[40vh] ">
          <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight cursor-pointer">
            <span className="text-tkh-brand-tangerine-5" >Innovate & Elevate: </span>
            <br/>Empowering people through digital literacy.
          </h1>
          <p className=" text-[18px] max-w-[488px] text-[#585C7B]">
            The Knowledge House is a tech-enabled movement, solving the employment and income disparities 
            in our communities. As a way address the systemic inequality or rather lack of opportunity for 
            those in poorer situations, TKH proposed DigitalPipeline.
          </p>
          <div>
          <p className=" text-[18px] max-w-[526px] text-[#585C7B]" >With DigitalPipline, we want to:</p>
          <ul className="text-[#585C7B] max-w-[488px] list-disc ml-3">
            
            <li>provide the public with digital literacy training and support services</li>
            <li>offer credentialing in partnership with Bronx colleges through articulation agreements</li>
            <li>match participants on the platform to technical job training, upskilling, and job 
            placement in partnership with technical training nonprofits.</li>
          </ul>
          </div>

          <button
            className="py-[13px] px-4  rounded h-[80vh] md:min-h-[52px] max-w-[388px] drop-shadow-btn font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0"
            onClick={(e) => handleNavigation(e,"/org_registration")}
          >
            Become A Partner
          </button>
        </div>
      </div>
      <div className=" flex flex-col overflow-visible items-end md:items-start md:pr-[72px] pt-0px  md:pt-[72px]">
        <div className="bg-tkh-brand-tangerine-5 h-[100%] z-10 w-[100vw] md:w-full md:h-[670px]  md:max-w=[636px] md:rounded bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/895687a5abb188c5b04c1d52c8ec731f.png')]"/> 
      </div>
    </div>
  );
};
