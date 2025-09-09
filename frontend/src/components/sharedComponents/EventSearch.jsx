import { useState } from "react";
import ReactPaginate from 'react-paginate';
import EventCard from "./EventCard";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          console.log( "item",item),
          <EventCard event={item.data}/>
        ))}
    </>
  );
}

export const EventSearch = ({ events  }) => {
  const upcoming = [];
  const itemsPerPage = 6
  if ( events && events.length !== 0 ) {

    const featuredEvents = events
      .map((event)=>{
        upcoming.push({
          data:event
        })
      })
    
    

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = upcoming.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(upcoming.length / itemsPerPage);


    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % upcoming.length;
      setItemOffset(newOffset);
    };

    return (
      <div className="flex flex-row justify-center items-center pt-[50px] px-3 w-full ">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="w-[100%] max-w-[1296px] mt-8 md:mt-[40px] grid md:grid-cols-3 grid-cols-1  w-[90vw] md:w-full max-w-[1296px] pb-10 gap-5 md:gap-[24px]  w-[80vw] ">
              <Items currentItems={currentItems} />
            </div>
            <div className="flex flex-row mb-12 pb-[104px]">
              <ReactPaginate
                className="flex flex-row gap-5 text-md "
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
          <style jsx>{`
              li:hover{
                  color:#FFB570;
                  transition: all 0.3s ease-out ;

              }
              .selected{
                color: #FF7000;
              }
              .disabled{
                color: #D2D2D6;
              }
              .disabled:hover{
                color: #D2D2D6;
              }
            
          `}</style>
          
      </div>

    );
  }
};