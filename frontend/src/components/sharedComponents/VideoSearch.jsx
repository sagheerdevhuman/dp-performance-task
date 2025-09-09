import { useState } from "react";
import tempImg from "../../assets/login_image.png";
import sampleImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <VideoCard video={item}/>
        ))}
    </>
  );
}

export const VideoSearch = ({ videos  }) => {
  const upcoming = [];
  console.log(videos)
  const itemsPerPage = 6
  if ( videos && videos.length !== 0 ) {

    // const featuredVideos = videos
    //   .filter( video => video.is_featured )
    //   .map((video)=>{
    //     upcoming.push({
    //       data:video
    //     })
    //   })
    // console.log(upcoming)
    

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = videos.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(videos.length / itemsPerPage);


    const handlePageClick = (video) => {
      const newOffset = (video.selected * itemsPerPage) % videos.length;
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