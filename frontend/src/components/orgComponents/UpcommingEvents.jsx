import { Carousel, IconButton } from "@material-tailwind/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import ft from "format-time";
import { Description } from "../sharedComponents/Description";

export function UpcommingEvents({data,partner}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Group events into sets of 3
  const groupedEvents = data?.reduce((acc, event, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(event);
    // Pad the last group with empty items if needed
      if (index === data.length - 1 && acc[groupIndex].length < 3) {
      while (acc[groupIndex].length < 3) {
        acc[groupIndex].push(null);
      }
    }
    return acc;
  }, []) || [];

  const handleEventClick = (event) => {
   
      navigate(`/event_details/${event.event_id}`);
  
  };

  const CarouselItem = ({ event,description,index }) => {
    const link = `url('${event?.banner_url}')`
   
    console.log("event",event)
    if (!event) return <div className="h-[440px] w-full" />; 
console.log("index",index === 1  ? "bg-[#FF7000]" : "bg-[#fff]")
    return (
      <div 
        className={`h-[440px] w-full flex flex-col p-6 rounded-lg  cursor-pointer transform transition-transform duration-200  hover:shadow-lg ${index === 1 ? "bg-[#FF7000] text-white" : "bg-[#fff] text-[#000]"}`}
       onClick={() => handleEventClick(event)}
      >
        <div className="flex gap-2 mb-3">
          <span className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
            { "Event"}
          </span>
          |
          <span className={`px-3 ${index === 1 ? "text-white" : "text-gray-800"}`}>
             {event.is_virtual=="true"? "Virtual":"In-Person"}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">{event.name || event.title}</h2>
        
        
        <Description description={description}/> 

  
        <div className="mt-auto">
        
          <p className="text-sm]">
          {moment(event.event_days?.[0]?.date).format("MMMM D, YYYY")}{" "}|{" "}
          </p>
          <p className="text-sm mb-4">
          {ft.getFormattedTime(event.event_days?.[0]?.start_time.replace(/(:\d{2}| [AP]M)$/, ""))}{" "}-{" "}{ft.getFormattedTime(event.event_days?.[0]?.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}
          </p>     
          {partner?.logo_url && (
            <img src={partner?.logo_url} 
                 alt="Organization Logo" 
                 className="h-8" />
          )}
        </div>
      </div>
    );
  };

  
  return (
    <div className="relative px-6 py-12 bg-[url('https://d1yh21d3dzz97r.cloudfront.net/slider.png')]">
      <h1 className="text-4xl font-bold text-center text-white mb-12">Upcoming Events</h1>
      <div className="max-w-7xl mx-auto relative">
        <style>
          {`
            .carousel-container::-webkit-scrollbar {
              display: none;
            }
            .carousel-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        <Carousel
          className="rounded-xl overflow-hidden ]"
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-2 w-2 cursor-pointer rounded-full transition-all content-[''] ${
                    activeIndex === i ? "bg-white scale-110" : "bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-1/2 left-4 -translate-y-2/4"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19L8 12L15 5" stroke="#3E4265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-1/2 right-4 -translate-y-2/4"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L16 12L9 19" stroke="#3E4265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </IconButton>
          )}
        >
          {groupedEvents.map((group, groupIndex) => (
            <div key={groupIndex} className="grid grid-cols-3 gap-6 px-6 carousel-container">
              {group.map((event, index) => (
                <CarouselItem 
                  index={index}
                  key={event?.event_id || `empty-${groupIndex}-${index}`} 
                  event={event}  description={event?.description}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}