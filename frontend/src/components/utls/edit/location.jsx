import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Edit = ({ partner,formData,setFormData,handleClick}) => {

  const handleBack = (e) =>{
    handleClick()
  }

  return (
    <div className="flex pt-2 items-center gap-5">
        < svg className="fill-tkh-grayscale-5 mb-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 h-[24px] min-w-[24px] w-[5%]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleBack(e);}}>
          <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
        </svg>
        <div className="border-b border-tkh-grayscale-4">
        <div className="flex items-center gap-3 mb-5 ">
        <svg className="h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 13.0981 6.01574 16.1042 8.22595 18.4373C9.31061 19.5822 10.3987 20.5195 11.2167 21.1708C11.5211 21.4133 11.787 21.6152 12 21.7726C12.213 21.6152 12.4789 21.4133 12.7833 21.1708C13.6013 20.5195 14.6894 19.5822 15.774 18.4373C17.9843 16.1042 20 13.0981 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 23C11.4453 23.8321 11.445 23.8319 11.4448 23.8317L11.4419 23.8298L11.4352 23.8253L11.4123 23.8098C11.3928 23.7966 11.3651 23.7776 11.3296 23.753C11.2585 23.7038 11.1565 23.6321 11.0278 23.5392C10.7705 23.3534 10.4064 23.0822 9.97082 22.7354C9.10133 22.043 7.93939 21.0428 6.77405 19.8127C4.48426 17.3958 2 13.9019 2 10C2 7.34784 3.05357 4.8043 4.92893 2.92893C6.8043 1.05357 9.34784 0 12 0C14.6522 0 17.1957 1.05357 19.0711 2.92893C20.9464 4.8043 22 7.34784 22 10C22 13.9019 19.5157 17.3958 17.226 19.8127C16.0606 21.0428 14.8987 22.043 14.0292 22.7354C13.5936 23.0822 13.2295 23.3534 12.9722 23.5392C12.8435 23.6321 12.7415 23.7038 12.6704 23.753C12.6349 23.7776 12.6072 23.7966 12.5877 23.8098L12.5648 23.8253L12.5581 23.8298L12.556 23.8312C12.5557 23.8314 12.5547 23.8321 12 23ZM12 23L12.5547 23.8321C12.2188 24.056 11.7807 24.0556 11.4448 23.8317L12 23Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z" fill="black"/>
        </svg>
        <div className="flex flex-col w-full "  >  
        <input
          type="text"
          className="w-full mb-3 tracking-tight leading-tight cursor-pointer rounded text-tkh-grayscale-10"
          placeholder={ partner.address ? partner.address :"location"}
          name="address_a"
          value={formData.address_a}
          onChange={(e) => {
            setFormData({ ...formData, address_a: e.target.value })
          }}
          required
        />
        <input
          type="text"
          className="w-full tracking-tight leading-tight cursor-pointer rounded text-tkh-grayscale-10"
          placeholder={ partner.zipcode ? partner.zipcode :"zipcode"}
          name="zipcode"
          value={formData.zipcode}
          onChange={(e) => {
            setFormData({ ...formData, zipcode: e.target.value })
          }}
          required
        />
    </div>
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
