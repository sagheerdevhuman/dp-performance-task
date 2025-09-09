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

export const FilterdContent = ({ qualifiedUserContent  }) => {
  const navigate = useNavigate();
  const upcoming = [];
  const itemsPerPage = 6
  if ( qualifiedUserContent && qualifiedUserContent.length !== 0 ) {

   
    
    const getContent = qualifiedUserContent?.qualified_content
      .map((content)=>{
        upcoming.push({
          data:content
        })
      })
    const shuffle = (array) => {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(upcoming);


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
            <div className="flex flex-row justify-end items-center w-full">
                  <button
                    onClick={() => navigate("/set_preferences")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Update Preferences
                  </button>
            </div>
            <div className="w-[100%] max-w-[1296px] mt-8 md:mt-[40px] grid md:grid-cols-2 grid-cols-1  w-[90vw] md:w-full max-w-[1296px] pb-10 gap-5 md:gap-[24px]  w-[80vw] ">
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