import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const ReportBugForm = ({
  handleFormRendering,
  modalRendered,
  formData,
  setFormData,
  handleSubmit
}) => {
  if (modalRendered) {
    return (
      <div className="flex fixed flex-col justify-center items-center top-0 z-10  h-screen w-full ">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1 ">
          <button className="absolute top-3 right-4 bg-tkh-brand-tangerine-5
              transition ease-in-out transform scale-75 hover:scale-90 duration-300
              rounded-md p-3 inline-flex items-center justify-center 
              text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none"
              onClick={(e) => {
                handleFormRendering(e);
              }}
          >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-7 w-7" aria-hidden="true" />
          </button>
          <h1 className="text-[35px] font-[700] mb-[16px]">Support</h1>

          <form className="flex flex-col"  onSubmit={(e) => handleSubmit(e)}>
            <label className="flex flex-col  w-full text-tkh-grayscale-7 mb-5">
              Subject
              <input
                className="text-[18px] rounded text-pink-500 w-full text-tkh-grayscale-10"
                type="text"
                placeholder="Type here..."
                name="name"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                }}
              />
            </label>

            <label className="flex flex-col w-full text-tkh-grayscale-7">
              Description: <br/>
              <span className="text-tkh-grayscale-8 text-[14px] font-bold mb-2">
                Please enter the details of your request. A member of our support staff will respond as soon as possible.
              </span>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                placeholder="Type here..."
                className="text-[18px] rounded text-pink-500 w-full text-tkh-grayscale-10"
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
            </label>

            
            <div className="py-4">
              <button
                type="submit"
                className=" inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
              >
               Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};


