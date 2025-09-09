import React from "react";
import { useNavigate } from "react-router-dom";

export const PartnersOfBxdp = ({ partnersList}) => {
  console.log(partnersList)
  if ( partnersList.length !== 0) {
    const navigate = useNavigate();

    return (
      <div className="flex flex-row justify-center items-center ">
        <div className="flex flex-col gap-[24px] justify-center items-center pt-[96px] pb-[156px]">
          <h1 className=" text-[40px] max-w-[550px] tracking-tight leading-tight text-center ">
            DigitalPipeline Partners
          </h1>
          <h3 className="text-[18px] max-w-[80vw] md:max-w-[550px] tracking-tight text-center text-tkh-grayscale-7  leading-tight">
            Working together to build a diverse and inclusive tech ecosystem.
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 justify-center gap-[24px]  ">
            {partnersList.map((partner, key) => {
              return (
                <div className="flex justify-center items-center rounded border border-[#E2E5F1] border-solid border-2 transition ease-in-out transform scale-75  hover:scale-90 duration-300 hover: drop-shadow-card-2"
                  onClick={() =>
                    navigate(`/partners_page/partnerProfile/${partner.org_id}`)
                  }
                >
                  <img
                    src={partner.logo_url}
                    alt="Logo"
                    className=" flex flex-col m-4 w-[10vw]  cursor-pointer"
                    
                  />
                </ div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
