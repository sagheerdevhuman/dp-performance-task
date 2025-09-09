import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Edit = ({ partner,formData,setFormData,handleClick}) => {

  const handleBack = (e) =>{
    handleClick()
  }

  return (
    <div className="flex pt-2 mb-5 items-center gap-5">
        < svg className="fill-tkh-grayscale-5 mb-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleBack(e);}}>
          <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
        </svg>
         <div className="border-b border-tkh-grayscale-4">
        <div className="flex items-center gap-3 mb-5 ">
        <svg className="h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96485 12 3.5508C10.1263 5.96485 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z" fill="black"/>
        </svg>    
        <input
          type="text"
          className="w-full  tracking-tight leading-tight cursor-pointer rounded text-tkh-grayscale-10"
          placeholder={partner.website? partner.website: "official website"}
          name="name"
          value={formData.website}
          onChange={(e) => {
            setFormData({ ...formData, website: e.target.value })
            console.log(formData.website)
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
