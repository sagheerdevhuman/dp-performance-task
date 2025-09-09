import React from "react";
import CompanyCard from "./CompanyCard";

export const PartnersHightlights = ({
  partnerHighlightsContent,
  partnersList,
  tempImage,
}) => {
  if (partnersList && partnersList.length !== 0) {
    const highlightList = partnersList.filter(partner => partner.banner_url).slice(
      partnersList.length !== 2 ? 0 : partnersList.length - 3
    ); 
    // const navigate = useNavigate();
    return (
      <div className="flex flex-row justify-center items-center md:pt-20 w-full bg-tkh-brand-tangerine-5 pt-[320px]">
        <div className="flex   flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
          <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
            Partner Highlights
          </h1>
          <h3 className="text-[18px] max-w-[80vw] md:max-w-[550px] tracking-tight leading-tight">
            Learn more and sign up for our featured programs here!
          </h3>
          <div className=" grid grid-cols-1 md:grid-cols-3  w-[90vw] md:w-full max-w-[1296px]  gap-5 md:gap-[24px] pb-[104px] w-[80vw] pb-[104px] ">
          {highlightList.map((highlight, key) => {
            return (
              <>
              { highlight.description && highlight.banner_url && highlight.logo_url &&(<CompanyCard partner={highlight}/>)}
              </>
            );
          })}
        </div>
         
        </div>
      </div>
    );
  }
};
