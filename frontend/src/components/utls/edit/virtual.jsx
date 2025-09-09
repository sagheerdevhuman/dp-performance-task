import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Edit = ({ text,formData,setFormData,handleClick,}) => {
  const [checked, setChecked] = useState(formData.is_virtual);
  
  const handleToggle = (e, event) => {
    if(checked==true){
      setChecked((prev) => !prev)
      setFormData({ ...formData, is_virtual: false })
    }
    if(checked==false){
      setChecked((prev) => !prev)
      setFormData({ ...formData, is_virtual: true })
    }
  };

  
  return (
    <div className="flex items-center gap-3  ">
      < svg className="fill-tkh-grayscale-5 h-[24px] w-[5%] hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleClick(e);}}>
        <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
      </svg> 
      
        <p className="text-tkh-grayscale-7">
          Virtual:
        </p>

       <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer transition ease-in-out"  checked={checked}  onChange={(e) => handleToggle(e, formData)}/>
        <div className="w-11 h-6 bg-tkh-grayscale-5 peer-focus:outline-none peer-focus:ring-3 
        peer-focus:ring-tkh-brand-tangerine-3  rounded-full peer 
        peer-checked:after:translate-x-full peer-checked:after:border-[#fff] after:content-[''] after:absolute 
        after:top-[2px] after:left-[2px] after:bg-[#fff] after:border-tkh-grayscale-3 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all peer-checked:bg-tkh-brand-tangerine-5"></div>
      </label> 
        
        <button
          type="submit"
          className=" h-10 w-[100px] border-0 rounded-md bg-tkh-brand-tangerine-5 
          drop-shadow-btn text-center text-tkh-grayscale-0 font-bold "
        >
          Save
        </button>
      
    </div>
  );
};
