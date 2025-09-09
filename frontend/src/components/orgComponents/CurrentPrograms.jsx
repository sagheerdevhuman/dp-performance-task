import { Carousel, IconButton } from "@material-tailwind/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import ft from "format-time";
import { Description } from "../sharedComponents/Description";

export function CurrentPrograms({data}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  console.log("data",data)

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
      navigate(`/program_details/${event.program_id}`)
  };

  const CarouselItem = ({ event,description,index }) => {
    const link = `url('${event?.banner_url}')`
   

    if (!event) return <div className="h-[440px] w-full" />; 

    return (
      <div 
        className={`h-[440px] w-full flex flex-col p-6 rounded-lg  cursor-pointer transform transition-transform duration-200  hover:shadow-lg bg-[#fff] text-[#000]`}
       onClick={() => handleEventClick(event)}
      >
        <div className="flex gap-2 mb-3">
          <span className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
            {event.is_virtual=="true"? "Virtual":"In-Person"}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">{event.name}</h2>
        
        
        <Description description={description}/> 

      </div>
    );
  };

  
  return (
    <>
    <div className="bg-tkh-brand-tangerine-5 h-[130px] z-[-1] w-full bg-[#FF7000]"/> 
    <div className="relative px-6 py-12 bg-[#FF7000]   ">
      <h1 className="text-4xl font-bold text-center text-white mb-12">Current Programs</h1>
      <div className="max-w-7xl mx-auto relative ">
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
          className="rounded-xl overflow-hidden ] z-10" 
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
                  key={event?.program_id || `empty-${groupIndex}-${index}`} 
                  event={event}  description={event?.description}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
    </>
  );
}