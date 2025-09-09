import { useState } from "react";
import ResourceCard from './ResourceCard';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
  if (!currentItems || currentItems.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
      </div>
    );
  }

  return (
    <>
      {currentItems.map((item, index) => (
        <ResourceCard key={item?.id || index} resource={item}/>
      ))}
    </>
  );
}

export const ResourcesSearch = ({ resources }) => {
  // Validate resources prop
  if (!resources) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Unable to load resources</h3>
          <p className="mt-1 text-sm text-gray-500">There was an error loading the resources. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const upcoming = Array.isArray(resources) ? resources : [];
  console.log("resources", resources);
  
  if (upcoming.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No resources available</h3>
          <p className="mt-1 text-sm text-gray-500">There are currently no resources to display.</p>
        </div>
      </div>
    );
  }

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = upcoming.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(upcoming.length / itemsPerPage);

  const handlePageClick = (event) => {    
    console.log("event", event);
    const newOffset = (event.selected * itemsPerPage) % upcoming.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-row justify-center items-center pt-[50px] px-3 w-full ">
      <div className="flex flex-col justify-center items-center text-center">
      <div className="w-[100%] max-w-[1296px] mt-8 md:mt-[40px] grid md:grid-cols-2 grid-cols-1  w-[90vw] md:w-full max-w-[1296px] pb-10 gap-5 md:gap-[24px]  w-[80vw] ">
        <Items currentItems={currentItems} />
      </div>
      
      {pageCount > 1 && (
         <div className="flex flex-row mb-12 pb-[104px]">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="flex justify-center items-center space-x-2"
            pageClassName="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            activeClassName="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md"
            previousClassName="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            nextClassName="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabledClassName="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
          />
        </div>
      )}
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
              `}
              </style>  
    </div>
  );
};