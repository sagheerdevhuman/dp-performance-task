import { useState } from "react";
import tempImg from "../../assets/login_image.png";
import sampleImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <FeaturedCard data={item}/>
        ))}
    </>
  );
}

export const Upcomming = ({ events, programs,featuredContent  }) => {
  const upcoming = [];
  const itemsPerPage = 6
  if ( featuredContent && featuredContent.length !== 0 ) {

    // const featuredEvents = events
    //   .filter( event => event.is_featured )
    //   .map((event)=>{
    //     upcoming.push({
    //       data:event
    //     })
    //   })
    // const featuredPrograms = programs
    //   .filter( program => program.is_featured)
    //   .map((program)=>{
    //     upcoming.push({
    //       data:program
    //     })
    //   })
    const getContent = featuredContent?.qualified_featured_content
      .map((content)=>{
        upcoming.push({
          data:content
        })
      })
    // const shuffle = (array) => {
    //     for (let i = array.length - 1; i >= 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    // }
    // shuffle(upcoming);
    console.log("featuredContent",featuredContent)

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = upcoming.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(upcoming.length / itemsPerPage);


    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % upcoming.length;
      setItemOffset(newOffset);
    };

    return (
      <div className="flex flex-row justify-center items-center pt-[50px] px-3 w-full bg-tkh-grayscale-11">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-[40px] mb-[15px] font-semibold">
              Upcoming Events and Programs
            </h1>
            <h3 className="text-[18px] font-light text-tkh-grayscale-7 text-center">
              Check out opportunities happening near you
            </h3>
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