import React from "react";
import EventCard from "./EventCard";

export const FeaturedEvents = ({
  activeEvents,
}) => {
  if (activeEvents && activeEvents.length !== 0) {
    const highlightList = activeEvents.slice(
      activeEvents.length !== 2 ? 2 : activeEvents.length - 3
    ); 
    // const navigate = useNavigate();
    return (
      <div className="flex flex-row justify-center items-center pt-20 w-full bg-[#FF7000] ">
        <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-10 items-center text-center">
          <h1 className="text-[40px] max-w-[550px] text-[#fff] tracking-tight leading-tight ">
          Event Recommendations
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] w-[90vw] md:w-full max-w-[1296px]  gap-5 md:gap-[24px] pb-[104px] w-[80vw] pb-[104px] ">
          {highlightList.slice(0, 3).map((highlight, key) => {
            return (
              <EventCard event={highlight} />
            );
          })}
        </div>
         
        </div>
      </div>
    );
  }
};
