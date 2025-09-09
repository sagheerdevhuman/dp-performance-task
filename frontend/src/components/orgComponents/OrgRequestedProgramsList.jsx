import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ft from "format-time";
import { useLocation, useNavigate } from "react-router-dom";
import { removeProgram } from "../../redux/programs/deleteProgramSlice";
import {Delete} from "../utls/delete";




function RequestedProgramsList({approved,programs,meta,setPrograms,rejected} ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title ="Delete Program"
  const text =`Are You sure you want to delete This program. You cannot be undo this Action`
  const btn_text = "Confirm"

  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/program_details/${id}`
    navigate(link)
  };

  const handleDelete = (e, program) => {
    dispatch(removeProgram({ program_id: program.program_id })).then(() => {
      window.location.reload(true)
    });
  };


  
  if (approved==true) return(
    <tbody className="">
      {programs.filter(program => (program.is_rejected == false && program.is_approved == true)).length <= 0 &&(
        <>
        <p className="p-5">no programs </p>
        </>
      )}
      {programs.filter(program => (program.is_rejected == false && program.is_approved == true)).map((program) => (
        <tr
          key={program.id}
          onClick={(e) => handleNavigation(e,program.program_id)}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            rounded-md text-tkh-grayscale-10 
            
            hover:bg-tkh-brand-tangerine-1 
           
          "
        >
          <td className="flex justify-center items-center h-9 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            
          </td>  
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>  
          <td className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>

        </tr>
      ))}
    </tbody>
  )

  if (rejected==true) return(
    <tbody className="">
      {programs.filter(program => program.is_rejected==true).length <= 0 &&(
        <>
        <p className="p-5">no programs </p>
        </>
      )}
      {programs.filter(program => program.is_rejected == true ).map((program) => (
        <tr
          key={program.id}
          onClick={(e) => handleNavigation(e,program.program_id)}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            rounded-md text-tkh-grayscale-10 
            
            hover:bg-tkh-brand-tangerine-1 
           
          "
        >
          <td className="flex justify-center items-center h-9 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            
          </td>  
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>  
          <td className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
             {program.casses[0].reason? program.casses[0].reason:"no reason"}
          </td>

        </tr>
      ))}
    </tbody>
  )


  return (
    <tbody className="">
      {programs.filter(program =>  (program.is_rejected == false && program.is_approved == false)).length <= 0 &&(
        <>
        <p className="p-5">no programs </p>
        </>
      )}
      {programs.filter(program => (program.is_rejected == false && program.is_approved == false) ).map((program) => (
        <tr
          key={program.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            rounded-md text-tkh-grayscale-10 
            
            hover:bg-tkh-brand-tangerine-1 
           
          "
        >
          <td className="flex justify-center items-center h-9 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            <Delete 
              handleDelete={handleDelete} 
              data={program} 
              title={title}
              text={text}
              btn_text={btn_text}
            />
          </td>  
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
export default RequestedProgramsList;
