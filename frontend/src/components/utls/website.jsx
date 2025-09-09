import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
import { Edit } from "./edit/website";

export const Website = ({ partner, handleSubmit,website,formData,setFormData,admin}) => {
  // const [modalRendered, isModalRendered] = useState(false);
  const [edit, setEdit] = useState(false);
  // function handleConfirmRendering(event) {
  //   event.preventDefault();
  //   modalRendered ? isModalRendered(false) : isModalRendered(true);
  // }
  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);
  }

  if (edit==true){
    return(
      <form  onSubmit={(e) => handleSubmit(e,formData)} >
        <Edit partner={partner} handleClick={handleClick} website={website} formData={formData} setFormData={setFormData}/>
      </form>
    )
  }
  return (
    <div className="flex gap-3 items-center w-full ">
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
        <svg className="fill-tkh-grayscale-9 h-[24px] min-w-[24px] w-[5%] hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  onClick={(e) => { handleClick(e);}}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V14.66C19 14.1077 19.4477 13.66 20 13.66C20.5523 13.66 21 14.1077 21 14.66V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7957 1 20V6C1 5.20435 1.31607 4.44129 1.87868 3.87868C2.44129 3.31607 3.20435 3 4 3H9.34C9.89228 3 10.34 3.44772 10.34 4C10.34 4.55228 9.89228 5 9.34 5H4Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2929 1.29289C17.6834 0.902369 18.3166 0.902369 18.7071 1.29289L22.7071 5.29289C23.0976 5.68342 23.0976 6.31658 22.7071 6.70711L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17H8C7.44772 17 7 16.5523 7 16V12C7 11.7348 7.10536 11.4804 7.29289 11.2929L17.2929 1.29289ZM9 12.4142V15H11.5858L20.5858 6L18 3.41421L9 12.4142Z" />
        </svg>
      )}
      <div
        className="flex flex-row justify-start md:justify-center items-center xl:gap-3 2xl:gap-10 w-10/12 lg:w-full xl:w-4/5 border-b border-tkh-grayscale-4"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00023 12C9.06877 15.0748 10.1263 18.0352 12 20.4492C13.8737 18.0352 14.9312 15.0748 14.9998 12C14.9312 8.92516 13.8737 5.96485 12 3.5508C10.1263 5.96485 9.06877 8.92516 9.00023 12ZM12 2L11.2617 1.32558C8.59689 4.24291 7.08251 8.02885 7.00022 11.9792C6.99993 11.9931 6.99993 12.0069 7.00022 12.0208C7.08251 15.9711 8.59689 19.7571 11.2617 22.6744C11.4511 22.8818 11.7191 23 12 23C12.2809 23 12.5489 22.8818 12.7383 22.6744C15.4031 19.7571 16.9175 15.9711 16.9998 12.0208C17.0001 12.0069 17.0001 11.9931 16.9998 11.9792C16.9175 8.02885 15.4031 4.24291 12.7383 1.32558L12 2Z" fill="black"/>
        </svg>
        <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 w-full md:w-2/3 xl:w-2/3">
          <h3 className="text-2xl xl:text-3xl font-semibold">
            Official Webiste
          </h3>
          <a href={website} className="text-md md:text-xl  hover:text-tkh-brand-tangerine-5 transition ease-in-out duration-300" target="_blank">
            {website}
          </a>
        </div>
      </div>
    </div>
  );
};
