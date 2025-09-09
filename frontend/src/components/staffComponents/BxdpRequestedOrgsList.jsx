import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orgApprovalStatus } from "../../redux/org/approveOrgSlice";
import { orgRejectionStatus } from "../../redux/org/rejectOrgSlice";
import { orgFeatureStatus } from "../../redux/org/featureOrgSlice";
import { orgActiveStatus } from "../../redux/org/activateOrgSlice";
import { removeOrg } from "../../redux/org/deleteOrgSlice";
import {TableButton} from "./TableButton";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";
import {Delete} from "../utls/delete";
import cookie from "js-cookie";

function BxdpRequestedOrgsList({approved,orgs,setOrgs,archived, rejected, handleRejectFormRendering, setRejectData,rejectData } ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = cookie.get("userToken");
  const title ="Delete Organization"
  const text =`Are You sure you want to delete This organization. You cannot be undo this Action`
  const btn_text = "Confirm"

 
  const handleActivate = (e, org) => {
    e.preventDefault();
    var arr = []
    orgs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(orgActiveStatus({ org_id: org.org_id })).then(() => {
    arr.filter(x => x.org_id == org.org_id ).map((x)=>{
       if(x.is_active==true){
          return x.is_active = false
        }else if (x.is_active==false){
          return x.is_active = true
        }
    })
      setOrgs(arr)
      console.log(arr)
    });

  };

  const handleReject = (e,org) => {
    event.preventDefault();
    handleRejectFormRendering(e)
    setRejectData({
      ...rejectData,
      id:org.org_id,
      type:"org"
    })
  };

  const handleApproval = (e, org) => {
    event.preventDefault(e);
    var arr = []
    orgs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(orgApprovalStatus({ org_id: org.org_id })).then(() => {
      arr.filter(x => x.org_id == org.org_id ).map((x)=>{
        if(x.is_approved){
          return x.is_approved = false
        }else{
          return x.is_approved = true
        }
      })
      setOrgs(arr)
    });
  };

  const handleFeature = (e, org) => {
    event.preventDefault(e);
    var arr = []
    orgs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(orgFeatureStatus({ org_id: org.org_id })).then(() => {
      arr.filter(x => x.org_id == org.org_id ).map((x)=>{
        if(x.is_featured){
          return x.is_featured = false
        }else{
          return x.is_featured = true
        }
      })
      setOrgs(arr)
    });
  };
  const handleDelete = (e, org) => {
    e.preventDefault();
    var arr = []
    orgs.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    
    dispatch(removeOrg({ org_id: org.org_id })).then(() => {
      arr.filter((x)=>{( x.org_id == org.org_id) && (x.name == org.name)}).map((x)=>{
        arr.pop(x)
      })
      setOrgs(arr)
    });
  };

  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/partners_page/partnerProfile/${id}`
    navigate(link)
  };


  
  if ( approved==true ) return(
    <tbody className="">
      {orgs.filter(org => (org.is_approved==true && org.is_active==true)).length <= 0 &&(
        <>
        <p className="p-5">no organizations</p>
        </>
      )}
      {orgs.filter(org => (org.is_approved==true && org.is_active==true)).map((org) => (
        <tr
          key={org.id}
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
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap  px-3 py-3 text-sm font-light text-tkh-grayscale-10">
            {org.name}
          </td>
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(org.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td>
            <TableButton data={org} archived={archived} approved={approved} active={false} handleFeature={handleFeature}/>
          </td>
          <td>
            <TableButton data={org} archived={archived} approved={approved} active={true} handleActivate={handleActivate}/>
          </td>
        </tr>
      ))}
    </tbody>
  )
  if ( rejected==true ) return(
    <tbody className="">
      {orgs.filter(org => org.is_rejected==true && org.is_active==true ).length <= 0 &&(
        <>
        <p className="p-5">no organizations</p>
        </>
      )}
      {orgs.filter(org => org.is_rejected == true && org.is_active==true ).map((org) => (
        <tr
          key={org.id}
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
          
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {org.name}
          </td>
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(org.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td>
          <TableButton data={org} archived={archived} approved={approved} active={true} handleActivate={handleActivate}/>
          </td>
        </tr>

      ))}
    </tbody>

  )
  if ( archived == true ) return(
    <tbody className="">
      {orgs.filter(org => org.is_active == false ).length <= 0 &&(
        <>
        <p className="p-5">no organizations</p>
        </>
      )}
      {orgs.filter(org => org.is_active == false ).map((org) => (
        <tr
          key={org.id}
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
          <td className="flex p-2 justify-center items-center fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            <Delete 
              handleDelete={handleDelete} 
              data={org}
              title={title}
              text={text}
              btn_text={btn_text}

            />
          </td> 
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {org.name}
          </td>
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(org.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <TableButton data={org} archived={archived} approved={approved} active={true} handleActivate={handleActivate}/>
        </tr>
      ))}
    </tbody>

  )

  return (
    <tbody className="">
      {orgs.filter(org => org.is_approved == false ).length <= 0 &&(
        <>
        <p className="p-5">no organizations to approve</p>
        </>
      )}
      {orgs.filter(org => org.is_approved == false ).map((org) => (
        <tr
          key={org.id}
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
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {org.name}
          </td>
          <td onClick={(e) => handleNavigation(e,org.org_id)} className="whitespace-nowrap px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(org.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td>
              <TableButton data={org} approved={approved} rejected={false} handleApproval={handleApproval} handleFeature={handleFeature}/>
            </td>
            <td>
              <TableButton data={org} approved={false} rejected={true}  handleReject={handleReject} handleFeature={handleFeature}/>
            </td>
        </tr>
      ))}
    </tbody>
  );
}
export default BxdpRequestedOrgsList;
