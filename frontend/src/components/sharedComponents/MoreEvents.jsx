import { useDispatch, useSelector } from "react-redux"; 
import React from "react";
import EventCard from "./EventCard";
import { getAllActiveEvents } from "../../redux/events/fetchAllActiveEventsSlice";
import { useState, useEffect } from "react";


export const  MoreEvents = ({ data }) => {
  const activeEvents = useSelector((state) => state?.getAllActiveEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActiveEvents());
  }, []);

  if (activeEvents?.status == "success" && activeEvents?.event?.length !== 0) {
    
    const tags = data.tags.map(e=> e.name).toString()

    
    
    const events = activeEvents?.event
      .filter((event) => !!event.tags
      .map( e=> e.name).toString()
      .includes(tags) && event.event_id!==data.event_id
    )
    
 

    if(events.length >= 1){
      return (
          <div className="flex flex-row justify-center items-center pt-20 w-full bg-tkh-brand-tangerine-5 ">
            <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
              <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
               More Events Like This
              </h1>
              <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] gap-[24px] pb-[104px] w-[80vw] place-content-center">
              {events.map((event, key) => {
                if (key < 3) {
                  return <EventCard event={event} />;
                }
              })}
            </div>
             
            </div>
          </div>
      );
    }
    return <></>
  }
  return <></>
};


