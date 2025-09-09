import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
import moment from "moment";
import ft from "format-time";
import { Edit } from "./edit/date/event";




export const EventDate = ({admin, handleSubmit,event,formData,setFormData,days,setDays}) => {
  const [modalRendered, isModalRendered] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleConfirmRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }

  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);

  }
  

  const navigate = useNavigate();

  if (edit==true){
    return(
      <form className="w-[579px] my-5" onSubmit={(e) => handleClick(handleSubmit(e,formData))} >
         <Edit 
            handleClick={handleClick} 
            days={days}
            setDays={setDays} 
            formData={formData} 
            setFormData={setFormData} 
          />
      </form>
   )
  }
  
  return (
    <div className="flex gap-3 items-center my-5">
      {/*<Confirm 
        handleConfirmRendering={handleConfirmRendering} 
        modalRendered={modalRendered} 
        title={title}
        text={text}
        btn_text={btn_text}
        handleSubmit={handleSubmit}
        formData={formData}
      />*/}
      {admin==true &&(
        <svg className="fill-tkh-grayscale-9 mt-1 h-[24px] min-w-[24px] w-[5%] hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  onClick={(e) => { handleClick(e);}}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V14.66C19 14.1077 19.4477 13.66 20 13.66C20.5523 13.66 21 14.1077 21 14.66V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7957 1 20V6C1 5.20435 1.31607 4.44129 1.87868 3.87868C2.44129 3.31607 3.20435 3 4 3H9.34C9.89228 3 10.34 3.44772 10.34 4C10.34 4.55228 9.89228 5 9.34 5H4Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2929 1.29289C17.6834 0.902369 18.3166 0.902369 18.7071 1.29289L22.7071 5.29289C23.0976 5.68342 23.0976 6.31658 22.7071 6.70711L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17H8C7.44772 17 7 16.5523 7 16V12C7 11.7348 7.10536 11.4804 7.29289 11.2929L17.2929 1.29289ZM9 12.4142V15H11.5858L20.5858 6L18 3.41421L9 12.4142Z" />
        </svg>
      )}
      {admin==false &&(
        <div>
          <svg width="20" height="20" className="mr-2 mt-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <path d="M10.0013 1.66669C5.4063 1.66669 1.66797 5.40502 1.66797 10C1.66797 14.595 5.4063 18.3334 10.0013 18.3334C14.5963 18.3334 18.3346 14.595 18.3346 10C18.3346 5.40502 14.5963 1.66669 10.0013 1.66669ZM10.0013 16.6667C6.32547 16.6667 3.33464 13.6759 3.33464 10C3.33464 6.32419 6.32547 3.33335 10.0013 3.33335C13.6771 3.33335 16.668 6.32419 16.668 10C16.668 13.6759 13.6771 16.6667 10.0013 16.6667Z" fill="black"/>
              <path d="M10.8346 5.83331H9.16797V10.345L11.9121 13.0891L13.0905 11.9108L10.8346 9.65498V5.83331Z" fill="black"/>
              </g>
          </svg>
        </div>
      )}
      <div>
      <div className="flex items-center">
        {admin==true &&(
          <>
            <h2  className="font-[900] text-[32px] my-[20px] mr-3">Date & Time</h2>
        

            <svg width="20" height="20" className="mr-4 mt-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
              <path d="M10.0013 1.66669C5.4063 1.66669 1.66797 5.40502 1.66797 10C1.66797 14.595 5.4063 18.3334 10.0013 18.3334C14.5963 18.3334 18.3346 14.595 18.3346 10C18.3346 5.40502 14.5963 1.66669 10.0013 1.66669ZM10.0013 16.6667C6.32547 16.6667 3.33464 13.6759 3.33464 10C3.33464 6.32419 6.32547 3.33335 10.0013 3.33335C13.6771 3.33335 16.668 6.32419 16.668 10C16.668 13.6759 13.6771 16.6667 10.0013 16.6667Z" fill="black"/>
              <path d="M10.8346 5.83331H9.16797V10.345L11.9121 13.0891L13.0905 11.9108L10.8346 9.65498V5.83331Z" fill="black"/>
              </g>
            </svg>
          </>
        )}
      </div>

    <ol className=" list-disc list-inside">
        {days.map((day, key) => {

          return <li key={key} >
            {moment(day.date).format("MMMM Do, YYYY")}{" "}|{" "}
            {ft.getFormattedTime(day.start_time.replace(/(:\d{2}| [AP]M)$/, ""))}{" "}-{" "}
            {ft.getFormattedTime(day.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}
          </li>
    
        })}
      </ol>
{/*      {admin==true &&(
        <div>
          <button className="
            text-[12px] ml-3 transition ease-in-out duration-200 border border-solid 
            border-tkh-grayscale-7 hover:border-tkh-brand-tangerine-5 rounded-full 
            text-center text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-5 
            hover:text-tkh-grayscale-0 pl-2 pr-2 font-[800]"  
            onClick={(e) => { handleClick(e)}}>        
              Update
          </button>
        </div>
      )}*/}
      
      </div>
    </div>
  );
};
