import { useState, useEffect } from "react";


export function TableButton({data,approved,handleReject,rejected,archived,active,meta,handleApproval,handleFeature,handleActivate} ) {
  const [checked, setChecked] = useState(data.is_featured);
  const [checked2, setChecked2] = useState(data.is_active);


  const handleToggle = (e, data) => {
    handleFeature(e, data)
    setChecked((prev) => !prev)
   
  };
  const handleToggle2 = (e, data) => {
    handleActivate(e, data)
    setChecked2((prev) => !prev)
   
  };

  if( approved==true && active==false) return(
    <td className="flex justify-center sm:text-sm xl:text-md font-light text-tkh-grayscale-10 "> 
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer transition ease-in-out"  checked={checked}  onChange={(e) => handleToggle(e, data)}/>
        <div className="w-11 h-6 bg-tkh-grayscale-5 peer-focus:outline-none peer-focus:ring-3 
        peer-focus:ring-tkh-brand-tangerine-3  rounded-full peer 
        peer-checked:after:translate-x-full peer-checked:after:border-[#fff] after:content-[''] after:absolute 
        after:top-[2px] after:left-[2px] after:bg-[#fff] after:border-tkh-grayscale-3 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all peer-checked:bg-tkh-brand-tangerine-5"></div>
      </label> 
    </td>
  )
  if( active==true) return(
    <td className="whitespace-nowrap h-8 px-3 z-5 pr-3 sm:text-sm xl:text-md font-light text-tkh-grayscale-10 ">
        <button className="flex transition ease-in-out transform scale-75 hover:scale-90 duration-900 items-center justify-center border border-tkh-grayscale-10 rounded-md w-20 h-9  text-xs md:text-sm font-bold sm:font-semibold text-tkh-grayscale-7 shadow-sm hover:bg-tkh-brand-tangerine-5 hover:border-tkh-brand-tangerine-5 hover:text-tkh-grayscale-0"
        onClick={(e) => handleActivate(e, data)}>
        { archived == true ? ("Unarchive") : ("Archive") }</button>
    </td>
  )
  if((rejected==false)&&(approved==false) ) return(
    <td className="whitespace-nowrap h-8 px-3 pr-3  z-5 sm:text-sm xl:text-md font-light text-tkh-grayscale-10 ">
        <button className="flex transition ease-in-out transform scale-75 hover:scale-90 duration-900 items-center justify-center border border-tkh-grayscale-10 rounded-md w-20 h-9  text-xs md:text-sm font-bold sm:font-semibold text-tkh-grayscale-7 shadow-sm hover:bg-tkh-brand-tangerine-5 hover:border-tkh-brand-tangerine-5 hover:text-tkh-grayscale-0"
        onClick={(e) => handleApproval(e, data)}>Approve</button>
    </td>
  )
  if((rejected==true)&&(approved==false)) return(
    <td className="whitespace-nowrap h-8 px-3 z-5 pr-3 sm:text-sm xl:text-md font-light text-tkh-grayscale-10 ">
        <button className="flex transition ease-in-out transform scale-75 hover:scale-90 duration-900 items-center justify-center border border-tkh-grayscale-10 rounded-md w-20 h-9  text-xs md:text-sm font-bold sm:font-semibold text-tkh-grayscale-7 shadow-sm hover:bg-tkh-brand-tangerine-5 hover:border-tkh-brand-tangerine-5 hover:text-tkh-grayscale-0"
        onClick={(e) => handleReject(e, data)}>Reject</button>
    </td>
  )


  return (
    <>
    </>
  );
}
