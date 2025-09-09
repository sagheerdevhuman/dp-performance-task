import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Edit = ({ partner,formData,setFormData,handleClick}) => {

  const handleBack = (e) =>{
    handleClick()
  }

  return (
    <div className="flex pt-2 mb-5 w-full items-center gap-5 ">
        < svg className="fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 mb-5" width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleBack(e);}}>
          <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
        </svg> 
        <div className="border-b border-tkh-grayscale-4">
        <div className="flex items-center gap-3 mb-5 ">
          <svg className="h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.18076 5.42653C1.49748 4.97408 2.12101 4.86405 2.57346 5.18076L12 11.7793L21.4265 5.18076C21.879 4.86405 22.5025 4.97408 22.8192 5.42653C23.1359 5.87898 23.0259 6.50251 22.5735 6.81923L12.5735 13.8192C12.2291 14.0603 11.7709 14.0603 11.4265 13.8192L1.42653 6.81923C0.974083 6.50251 0.864048 5.87898 1.18076 5.42653Z" fill="black"/>
          </svg>
          <input
            type="text"
            className="w-full tracking-tight leading-tight cursor-pointer rounded text-tkh-grayscale-10"
            placeholder={ partner.info_email ? partner.info_email : "contact information" }
            name="email"
            value={formData.info_email}
            onChange={(e) => {
              setFormData({ ...formData, info_email: e.target.value })
            }}
            required
          />
     
          <button
            type="submit"
            className=" h-10 w-[150px] border-0 rounded-md bg-tkh-brand-tangerine-5 
            drop-shadow-btn text-center text-tkh-grayscale-0 font-bold "
          >
            Save
          </button>
          </div>
      </div> 
    </div>
  );
};
