import { AddEventDayForm } from "../../components/orgComponents/AddEventDayForm";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
export const AddEventDayModal = ({
  setDays,
  modalRendered,
  isModalRendered,
  handleClick,
  handleAddDay,
}) => {
  if (modalRendered) {
    return (
      <>
      
      <div className="flex flex-col justify-center items-center fixed top-0  z-10  h-screen w-full ">
        <div className="flex flex-col max-w-[350px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1 ">
          <button className="absolute top-3 right-4 bg-tkh-brand-tangerine-5
              transition ease-in-out transform scale-75 hover:scale-90 duration-300
              rounded-md p-3 inline-flex items-center justify-center 
              text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none"
              onClick={handleClick}>
              <span className="sr-only">Close menu</span>
              <XIcon className="h-7 w-7" aria-hidden="true" />
          </button>
          <h1 className="text-[40px] font-[700] mb-[16px]">Event Day</h1>
          <AddEventDayForm
            isModalRendered={isModalRendered}
            handleAddDay={handleAddDay}
          />
          
        </div>
      </div>
      </>
    );
  }
};
