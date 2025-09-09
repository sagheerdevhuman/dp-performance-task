import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReportBugForm } from "./ReportBugForm";
import { createReport } from "../../redux/user/reportBugSlice";
import { ScrollToTop } from "./ScrollToTop";
import cookie from "js-cookie";


export const ReportBug = () => {
  const [modalRendered, isModalRendered] = useState(false);
  const userId = cookie.get('userId');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });


 function handleSubmit(event) {
  console.log(formData)
  dispatch(
    createReport({
      user_id: userId,
      subject: formData.subject,
      description: formData.description,
    })).then(() => {
      handleFormRendering(event)
    });
    
  }

  function handleFormRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }



  return (
    <> 
      {/* Support button on the left */}
      <div className="fixed bottom-12 left-12 z-20">
        <button className="flex h-[52px] w-[155px] border-0 rounded-md bg-tkh-brand-black-1 hover:bg-tkh-grayscale-7
           text-center text-tkh-grayscale-0 font-bold justify-center items-center"
           onClick={handleFormRendering}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M14.9849 7.90005C15.6249 8.62005 15.9249 9.60004 15.7849 10.64C15.5449 12.56 14.1449 13.24 12.9049 13.24C12.8449 13.24 12.8049 13.24 12.8049 13.24V13.72C12.8049 14.16 12.4449 14.52 12.0049 14.52C11.5649 14.52 11.2049 14.16 11.2049 13.72V13.0801C11.2049 12.4201 11.4849 11.64 12.9049 11.64C13.6849 11.64 14.0849 11.24 14.1849 10.44C14.2249 10.18 14.2449 9.48006 13.7649 8.96006C13.3849 8.54006 12.7649 8.32004 11.9249 8.32004C10.1249 8.32004 10.0649 9.50004 10.0649 9.62004C10.0649 10.06 9.70494 10.42 9.26494 10.42C8.82494 10.42 8.46494 10.06 8.46494 9.62004C8.46494 8.82004 9.08493 6.72004 11.9249 6.72004C13.5849 6.72004 14.5049 7.36005 14.9849 7.90005ZM11.9449 15.2001C11.6849 15.2001 11.4249 15.3 11.2449 15.5C11.0649 15.68 10.9449 15.9401 10.9449 16.2001C10.9449 16.46 11.0449 16.72 11.2449 16.9001C11.4249 17.0801 11.6849 17.2001 11.9449 17.2001C12.2049 17.2001 12.4649 17.1 12.6449 16.9001C12.8249 16.72 12.9449 16.46 12.9449 16.2001C12.9449 15.9401 12.8449 15.68 12.6449 15.5C12.4849 15.3201 12.2249 15.2001 11.9449 15.2001ZM21.2049 12C21.2049 17.0801 17.0849 21.2001 12.0049 21.2001C6.92493 21.2001 2.80493 17.0801 2.80493 12C2.80493 6.92005 6.92493 2.80005 12.0049 2.80005C17.0849 2.80005 21.2049 6.92005 21.2049 12ZM19.6049 12C19.6049 7.80005 16.2049 4.40005 12.0049 4.40005C7.80493 4.40005 4.40493 7.80005 4.40493 12C4.40493 16.2001 7.80493 19.6 12.0049 19.6C16.2049 19.6 19.6049 16.2001 19.6049 12Z" fill="#fff"/>
          </svg>
          Support
        </button>
      </div>
      
      {/* Scroll to top button on the right */}
      <div className="fixed bottom-12 right-12 z-20">
        <ScrollToTop />
      </div>
      
      <ReportBugForm handleFormRendering={handleFormRendering} modalRendered={modalRendered} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
    </>
  );
};
