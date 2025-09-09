import React from "react";
import { useNavigate } from "react-router-dom";


export const OrgPrev = (org) => {
  const navigate = useNavigate();
  const data = org
  const sliceAtLastWord = (str) => {
    if (!str || str.trim() === "") {
      return "";
    }

    const lastSpaceIndex = str.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      return str;
    }

    return str.slice(0, lastSpaceIndex);
  }

  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.replace(/<[>]+>/g, '').slice(3,num) 
  }
  const prev = sliceAtLastWord(shorten( data.org.description,500))+ '...';
  const markup = { __html: prev };


  console.log()
  return (
    <div className="flex justify-center py-[40px] items-center w-full h-[530px] bg-[#F3F6FF]">
     <div className="bg-[#fff] h-full px-[56px] py-[91px] text-[#fff] w-[520px] mr-[50px] text-[40px] font-[700] rounded bg-tkh-brand-tangerine-5">
      <p>Event Host</p>
     </div>
     <div className="bg-[#fff] h-full w-[40%] p-[40px] color-[black] drop-shadow bg-[#ffff] rounded items-start">
      <h3 className="text-[24p] font-[900] ">{data.org.name}</h3>
      <p className="text-[14px] text-[#9397AD] cursor-pointer mb-[40px]">{data.org.website}</p>
      <div className="break-word mb-[50px]" dangerouslySetInnerHTML={markup}/> 
      
      <div className="flex justify-end w-full">
       <button className="h-[52px] w-[155px] border-0 justify-self-end rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold"
            onClick={() =>
              navigate(
                `/partners_page/partnerProfile/${data.org.org_id} `
              )}>
        learn more
      </button>
      </div>
     </div>
    </div>
  );
};
