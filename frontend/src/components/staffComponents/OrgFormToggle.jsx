import moment from "moment";
import { useState, useEffect } from "react";
import ft from "format-time";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";

export const OrgFormToggle = ({checked,handleToggle}) => {
  const text = checked? "invite":"create"
  return (
    <>
      <div className="flex items-center mb-3 gap-3">
        
        <div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer transition ease-in-out"  checked={checked}  onChange={(e) => handleToggle(e)}/>
            <div className="w-11 h-6 bg-tkh-grayscale-5 peer-focus:outline-none peer-focus:ring-3 
            peer-focus:ring-tkh-brand-tangerine-3  rounded-full peer 
            peer-checked:after:translate-x-full peer-checked:after:border-[#fff] after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-[#fff] after:border-tkh-grayscale-3 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all peer-checked:bg-tkh-brand-tangerine-5">
            </div>
          </label> 
        </div>
        <h1 className="text-2xl font-bold capitalize text-tkh-brand-tangerine-4 transition ease-in-out" >{text}</h1>
      </div>
    </>
  );
};
