import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { programApprovalStatus } from "../../redux/programs/approveProgramSlice";
import { programRejectionStatus } from "../../redux/programs/rejectProgramSlice";
import { programFeatureStatus } from "../../redux/programs/featureProgramSlice";
import { programActiveStatus } from "../../redux/programs/activateProgramSlice";
import {TableButton} from "./TableButton";
import { removeProgram } from "../../redux/programs/deleteProgramSlice";
import moment from "moment";
import ft from "format-time";
import { useLocation, useNavigate } from "react-router-dom";
import {Delete} from "../utls/delete";
import cookie from "js-cookie";



function RequestedProgramsList({approved,rejected,programs,setPrograms,meta,reload,archived, handleRejectFormRendering, setRejectData, rejectData} ) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const org_id = cookie.get("orgId");
  const title ="Delete Program"
  const text =`Are You sure you want to delete This program. You cannot be undo this Action`
  const btn_text = "Confirm"


  const handleApproval = (e, program) => {
    event.preventDefault(e);
    var arr = []
    programs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(programApprovalStatus({ program_id: program.program_id })).then(() => {
      arr.filter(x => x.program_id == program.program_id ).map((x)=>{
        if(x.is_approved){
          return x.is_approved = false
        }else{
          return x.is_approved = true
        }
      })
      setPrograms(arr)
    })
  
    
  };

  const handleReject = (e, program) => {
    event.preventDefault();
    handleRejectFormRendering(e)
    alert(rejectData.type)
    setRejectData({
      ...rejectData,
      id:program.program_id,
      type:"program"
    })
  };


  const handleFeature = (e, program) => {
    var arr=[]
    programs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    e.preventDefault();
    dispatch(programFeatureStatus({ program_id: program.program_id })).then(() => {
      arr.filter(x => x.program_id == program.program_id ).map((x)=>{
        if(x.is_featured){
          return x.is_featured = false
        }else{
          return x.is_featured = true
        }
      })
      setPrograms(arr)
    });
  };

  const handleDelete = (e, program) => {
    e.preventDefault();
    var arr = []
    programs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(removeProgram({ program_id: program.program_id })).then(() => {
      navigate("/dashboard")
    });
  };


   const handleActivate = (e, program) => {
    e.preventDefault();
    var arr = []
    programs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(programActiveStatus({ program_id: program.program_id })).then(() => {
    arr.filter(x => x.program_id == program.program_id ).map((x)=>{
       if(x.is_active==true){
          return x.is_active = false
        }else if (x.is_active==false){
          return x.is_active = true
        }
    })
      setPrograms(arr)
      console.log(arr)
    });
  };


  const navigate = useNavigate();
  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/program_details/${id}`
    navigate(link)
  };

  
  if (approved==true) return(
    <tbody className="">
      {programs.filter(program => (program.is_approved == true && program.is_active == true) ).length <= 0 &&(
        <>
        <p className="p-5">no programs</p>
        </>
      )}
      {programs.filter(program => (program.is_approved == true && program.is_active == true) ).map((program) => (
        <tr
          key={program.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            border-y
            border-tkh-grayscale-3
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1 
          "
        >

          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 py-3  text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>
          <td>
            <TableButton data={program} archived={archived} active={false} approved={approved} meta={meta} handleFeature={handleFeature}/>
          </td>
          <td>
            <TableButton data={program} archived={archived} active={true} approved={approved} meta={meta} handleActivate={handleActivate}/>
          </td>
        </tr>
      ))}
    </tbody>
  )
  if( archived == true) return (

    <tbody className="">
      {programs.filter(program => program.is_active == false ).length <= 0 &&(
        <>
        <p className="p-5">no programs</p>
        </>
      )}
      {programs.filter(program => program.is_active == false ).map((program) => (
        <tr
          key={program.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            border-y
            bg-tkh-grayscale-2
            border-tkh-grayscale-3
            duration-900
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1
          "
        >
          <td className="flex pl-6 pr-2 justify-center items-center h-9 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
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
           {program.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>
          <TableButton data={program} archived={archived} active={true} approved={approved} meta={meta} handleActivate={handleActivate}/>
          
        </tr>
      ))}
    </tbody>
  )
  if(rejected==true ) return(
    <tbody className="">
      {programs.filter(program => (program.is_rejected == true && program.is_active == true) ).length <= 0 &&(
        <>
        <p className="p-5">no programs</p>
        </>
      )}
      {programs.filter(program => (program.is_rejected == true && program.is_active == true) ).map((program) => (
        <tr
          key={program.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            duration-900
            border-y
            border-tkh-grayscale-3
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1 
          "
        >

          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 py-3  text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>
          <td>
            <TableButton data={program} archived={archived} active={true} approved={approved} meta={meta} handleActivate={handleActivate}/>
          </td>
        </tr>
      ))}
    </tbody>

  )

  return (
    <tbody className="">
      {programs.filter(program => (program.is_approved == false && program.is_rejected == false) ).length <= 0 &&(
        <>
        <p className="p-5">no programs to approve</p>
        </>
      )}
      {programs.filter(program => (program.is_approved == false && program.is_rejected == false) ).map((program) => (
        <tr
          key={program.id}
          className="
            cursor-pointer 
            transition ease-in-out 
            p-6
            border-y
            border-tkh-grayscale-3
            duration-900
            rounded-md text-tkh-grayscale-10 
            hover:bg-tkh-brand-tangerine-1
          "
        >
          
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {program.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(program.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
           {program.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,program.program_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {program.applicants.length}
          </td>
          <TableButton data={program} active={false} approved={approved} rejected={false} meta={meta} handleApproval={handleApproval}/>
          <TableButton data={program}  approved={false} rejected={true}  handleReject={handleReject} meta={meta} />
          
        </tr>
      ))}
    </tbody>
  );
}
export default RequestedProgramsList;
