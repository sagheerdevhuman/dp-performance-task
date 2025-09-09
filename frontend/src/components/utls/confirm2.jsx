import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";


export const Confirm = ({ modalRendered,handleConfirmRendering,title,text,btn_text,handleAction,data }) => {

  if (modalRendered) {
    return (
      <div className="flex flex-col justify-start items-center z-20  h-screen w-full absolute top-[20vh] right-4">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1 ">
          
          <h1 className="text-[40px] font-[700] mb-[16px] text-tkh-grayscale-10">{title}</h1>
          <button className="absolute top-3 right-4 bg-tkh-brand-tangerine-5
              transition ease-in-out transform scale-75 hover:scale-90 duration-300
              rounded-md p-3 inline-flex items-center justify-center 
              text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none"
              onClick={(e) => {
                handleConfirmRendering(e);
              }}
          >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-7 w-7" aria-hidden="true" />
          </button>



          <div className="flex flex-col gap-[24px] text-tkh-grayscale-7">

          <p>{text}</p>
            <button
                type="submit"
                className=" inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                onClick={(e) => handleAction(e, data)}
              >
                {btn_text}
              </button>
          </div>

        </div>
      </div>
    );
  }
};




