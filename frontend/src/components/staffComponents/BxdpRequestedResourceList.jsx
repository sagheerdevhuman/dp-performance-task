import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {TableButton} from "./TableButton";
import { removeResource } from "../../redux/resources/deleteResourceSlice";
import moment from "moment";
import ft from "format-time";
import { useLocation, useNavigate } from "react-router-dom";
import {Confirm} from "../utls/confirm";
import cookie from "js-cookie";



function RequestedResourcesList({approved,rejected,resources,setResources,meta,reload,archived,featured,active       } ) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const org_id = cookie.get("orgId");
  const [modalRendered, setModalRendered] = useState(false);
  const [data, setData] = useState(null);
  const title ="Delete Resource"
  const text =`Are You sure you want to delete This resource. You cannot be undo this Action`
  const btn_text = "Confirm"
console.log(resources)



 
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeResource({ resource_id: data.resource_id })).then(() => {
      window.location.reload()
    });
  };

  const handleConfirmRendering = (e,resource) => {
    e.preventDefault();
    setData(resource)
    modalRendered? setModalRendered(false) : setModalRendered(true)
  };



  const navigate = useNavigate();
  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/resource_details/${id}`
    navigate(link)
  };

  
  console.log("resources",resources) 

  return (
    <>
    <Confirm modalRendered={modalRendered} handleAction={handleDelete} handleConfirmRendering={handleConfirmRendering} title={title} text={text} btn_text={btn_text} data={data}/>
    <tbody className="">
      {resources.length <= 0 &&(
        <>
        <p className="p-5">no resources</p>
        </>
      )}
      {resources.map((resource) => (
        <tr
          key={resource.id}
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

          <td onClick={(e) => handleNavigation(e,resource.resource_id)} className="whitespace-nowrap h-8 px-3 py-3  text-sm font-light text-tkh-grayscale-10">
            {resource.title}
          </td>
          <td onClick={(e) => handleNavigation(e,resource.resource_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(resource.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,resource.resource_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {resource.orgs.length > 0 ? resource.orgs[0].name : "N/A"}
          </td>
          <td  className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            <a className="hover:underline hover:text-tkh-brand-tangerine-5">Edit</a> / <a className="hover:underline hover:text-tkh-brand-tangerine-5" onClick={(e) =>handleConfirmRendering(e,resource)}>Delete</a>
          </td>
          {/* <td>
            <TableButton data={resource} archived={archived} active={false} approved={approved} meta={meta} handleFeature={handleFeature}/>
          </td>
          <td>
            <TableButton data={resource} archived={archived} active={true} approved={approved} meta={meta} handleActivate={handleActivate}/>
          </td> */}
        </tr>
      ))}
    </tbody>
    </>
  );
}
export default RequestedResourcesList;
