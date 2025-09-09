import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ft from "format-time";
import { useLocation, useNavigate } from "react-router-dom";
import { removeEvent } from "../../redux/events/deleteEventSlice";
import {Delete} from "../utls/delete";


function RequestedEventsList({approved,events,setEvents,rejected} ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title ="Delete Event"
  const text =`Are You sure you want to delete This event. You cannot be undo this Action`
  const btn_text = "Confirm"

  console.log(event)
  const handleNavigation = (event,id) => {
    event.preventDefault();
    const link = `/event_details/${id}`
    navigate(link)
  };
  const handleDelete = (e, event) => {
    dispatch(removeEvent({ event_id: event.event_id })).then(() => {
      window.location.reload(true)
    });
  };
  console.log(events.filter(event => event.is_rejected==true))

  if(approved==true) return(
    <>
    <tbody className="">
      {events.filter(event => event.is_approved==true).length <= 0 &&(
        <>
        <p className="p-5">no events </p>
        </>
      )}
      {events.filter(event => event.is_approved==true).map((event) => (
        <tr
          key={event.event_id}
          onClick={(e) => handleNavigation(e,event.event_id)}
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
          <td className="flex justify-center items-center h-9 fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5">
            
          </td> 
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {event.name}
          </td>
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {event.rsvps.length}
          </td>
        </tr>
      ))}
    </tbody>
    </>

  )
  if (rejected==true) return(
    <>
    <tbody className="">
      {events.filter(event => event.is_rejected ==true).length <= 0 &&(
        <>
        <p className="p-5">no events </p>
        </>
      )}
      {events.filter(event => event.is_rejected == true).map((event) => (
        <tr
          key={event.event_id}
          onClick={(e) => handleNavigation(e,event.event_id)}
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
            {event.name}
          </td>
          <td className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {event.casses[0].reason? event.casses[0].reason:"no reason"}
          </td>
        </tr>
      ))}
    </tbody>
    </>

  )

  return (
    <>
    <tbody className="">
      {events.filter(event => (event.is_approved==false && event.is_rejected==false)).length <= 0 &&(
        <>
        <p className="p-5">no events </p>
        </>
      )}
      {events.filter(event=> (event.is_approved==false && event.is_rejected==false)).map((event) => (
        <tr
          key={event.event_id}
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
              data={event}
              title={title}
              text={text}
              btn_text={btn_text}
            />
          </td> 
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {event.name}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap h-8 px-3 text-sm font-light text-tkh-grayscale-10">
            {moment(event.createdAt).format("MMMM Do YYYY")}{" "}
          </td>
          <td onClick={(e) => handleNavigation(e,event.event_id)} className="whitespace-nowrap h-8 px-3 pr-3 text-sm font-light text-tkh-grayscale-10">
            {event.rsvps.length}
          </td>
        </tr>
      ))}
    </tbody>
    </>
  );
}

export default RequestedEventsList;
