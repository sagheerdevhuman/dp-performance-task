import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/events/fetchAllEventsSlice";
import { eventApprovalStatus } from "../../redux/events/approveEventSlice";
import { eventRejectionStatus } from "../../redux/events/rejectEventSlice";
import { eventFeatureStatus } from "../../redux/events/featureEventSlice";
import { eventActiveStatus } from "../../redux/events/activateEventSlice"
import { removeEvent } from "../../redux/events/deleteEventSlice";
import {TableButton} from "./TableButton";
import moment from "moment";
import ft from "format-time";
import { useLocation, useNavigate } from "react-router-dom";
import {Delete} from "../utls/delete";
import cookie from "js-cookie";



function RequestedEventsList({approved,rejected,events,setEvents,archived, handleRejectFormRendering, setRejectData, rejectData} ) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const org_id = cookie.get("orgId");
  const title ="Delete Event"
  const text =`Are You sure you want to delete This event. You cannot be undo this Action`
  const btn_text = "Confirm"

  const handleApproval = (e, event) => {
    e.preventDefault();
      var arr=[]
      events.map((x)=>{
        var y = Object.assign({}, x, {writable:true})
        arr.push(y)
      })
    dispatch(eventApprovalStatus({ event_id: event.event_id })).then(() => {
     arr.filter(x => x.event_id == event.event_id ).map((x)=>{
        if(x.is_approved){
          return x.is_approved = false
        }else{
          return x.is_approved = true
        }
      })
      setEvents(arr)
    });
  };

  const handleReject = (e, event) => {
    event.preventDefault();
    handleRejectFormRendering(e)
    setRejectData({
      ...rejectData,
      id:event.event_id,
      type:"event"
    })
  };

  const handleFeature = (e, event) => {
    var arr=[]
    events.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    e.preventDefault();
    dispatch(eventFeatureStatus({ event_id: event.event_id })).then(() => {
      arr.filter(x => x.event_id == event.event_id ).map((x)=>{
        if(x.is_featured){
          return x.is_featured = false
        }else{
          return x.is_featured = true
        }
      })
      setEvents(arr)
    });
  };

  const navigate = useNavigate();

  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/event_details/${id}`
    navigate(link)
  };

  const handleDelete = (e, event) => {
    e.preventDefault();
    var arr = []
    events.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(removeEvent({ event_id: event.event_id })).then(() => {
      navigate("/dashboard")
    });
  };


  const handleActivate = (e, event) => {
    e.preventDefault();
    var arr = []
    events.map((x)=>{
      var y = Object.assign({}, x, {writable:true})
      arr.push(y)
    })
    dispatch(eventActiveStatus({ event_id: event.event_id })).then(() => {
    arr.filter(x => x.event_id == event.event_id ).map((x)=>{
       if(x.is_active==true){
          return x.is_active = false
        }else if (x.is_active==false){
          return x.is_active = true
        }
    })
      setEvents(arr)
      console.log(arr)
    });
  }


  if(approved==true ) return(
    <>
    <tbody className="">
      {events.filter(event => (event.is_approved==true && event.is_active==true)).length <= 0 &&(
        <>
        <p className="p-5">no events </p>
        </>
      )}
      {events.filter(event => (event.is_approved==true && event.is_active==true)).map((event) => (
        <tr
          key={event.id}
          className="
            cursor-pointer 
            transition ease-in-out
            border-y
            border-tkh-grayscale-3
            duration-900
            rounded-md text-tkh-grayscale-10
            hover:bg-tkh-brand-tangerine-1
            font-light
            text-m xl:text-l
          "
        >
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 py-3">
            {event.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {event.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap  px-3 ">
            {event.rsvps.length}
          </td>
          <td>
            <TableButton data={event} approved={approved} active={false} handleFeature={handleFeature}/>
          </td>
          <td>
            <TableButton data={event} approved={approved} active={true} handleActivate={handleActivate}/>
          </td>
        </tr>
      ))}
    </tbody>
    </>
  )

  if(rejected==true ) return(
    <>
    <tbody className="">
      {events.filter(event => (event.is_rejected==true && event.is_active==true)).length <= 0 &&(
        <>
        <p className="p-5">no events </p>
        </>
      )}
      {events.filter(event => (event.is_rejected==true && event.is_active==true)).map((event) => (
        <tr
          key={event.id}
          className="
            cursor-pointer 
            transition ease-in-out
            border-y
            border-tkh-grayscale-3
            duration-900
            rounded-md text-tkh-grayscale-10
            hover:bg-tkh-brand-tangerine-1
            font-light
            text-m xl:text-l
          "
        >
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 py-3">
            {event.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {event.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap  px-3 ">
            {event.rsvps.length}
          </td>
          <td>
            <TableButton data={event} approved={approved} active={true} handleActivate={handleActivate}/>
          </td>
        </tr>
      ))}
    </tbody>
    </> 
  )

  if(archived==true) return(
    <>
    <tbody className="">
      {events.filter(event => event.is_active==false).length <= 0 &&(
        <>
        <p className="p-5">no events</p>
        </>
      )}
      {events.filter(event => event.is_active==false).map((event) => (
        <tr
          key={event.id}
          className="
            cursor-pointer 
            transition ease-in-out
            border-y
            border-tkh-grayscale-3
            duration-900
            bg-tkh-grayscale-2
            rounded-md text-tkh-grayscale-10
            hover:bg-tkh-brand-tangerine-1
            font-light
            text-m xl:text-l
          "
        >
          <td className="flex py-2 pl-4 justify-center items-center fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            <Delete 
              handleDelete={handleDelete} 
              data={event}
              title={title}
              text={text}
              btn_text={btn_text}
            />
          </td> 
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 py-3">
            {event.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3 ">
            {event.organization.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap  px-3 ">
            {event.rsvps.length}
          </td>
          <TableButton data={event} archived={archived} approved={approved} active={true} handleActivate={handleActivate}/>
        </tr>
      ))}
    </tbody>
    </>
  )

  return (
    <>
      <tbody className="">
        {events.filter(event => ((event.is_approved==false) && (event.is_rejected==false) && (event.is_active == true) )).length <= 0 &&(
          <>
          <p className="p-5">no events to approve</p>
          </>
        )}
        {events.filter(event=> ( (event.is_approved==false) && (event.is_rejected==false) && (event.is_active == true) )).map((event) => (
          <tr
            key={event.id}
            className="
              cursor-pointer 
              transition ease-in-out 
              border-y
              border-tkh-grayscale-3
              duration-900
              rounded-md text-tkh-grayscale-10
              hover:bg-tkh-brand-tangerine-1
              font-light
              text-m xl:text-l
            "
          >
            <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap  px-3  py-3">
              {event.name}
            </td>
            <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap  px-3">
              {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
            </td>
            
            <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3">
              {event.organization.name}
            </td>
            <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap px-3">
              {event.rsvps.length}
            </td>
            <td>
              <TableButton data={event} approved={approved} rejected={false} handleApproval={handleApproval} handleFeature={handleFeature}/>
            </td>
            <td>
              <TableButton data={event} approved={false} rejected={true}  handleReject={handleReject} handleFeature={handleFeature}/>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default RequestedEventsList;
