import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
import { Edit } from "./edit/email";

export const Email = ({ partner, handleSubmit,email,formData,setFormData,admin}) => {
  // const [modalRendered, isModalRendered] = useState(false);
  const [edit, setEdit] = useState(false);
  // function handleConfirmRendering(event) {
  //   event.preventDefault();
  //   modalRendered ? isModalRendered(false) : isModalRendered(true);
  // }
  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);
  }
  const markup = "mailto:" + email ;
 

  if (edit==true){
    return(
      <form  onSubmit={(e) => handleSubmit(e,formData)} >
        <Edit partner={partner} handleClick={handleClick} email={email} formData={formData} setFormData={setFormData}/>
      </form>
    )
  }
  return (
    <div className="flex gap-3 my-3 items-center w-full">
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
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.18076 5.42653C1.49748 4.97408 2.12101 4.86405 2.57346 5.18076L12 11.7793L21.4265 5.18076C21.879 4.86405 22.5025 4.97408 22.8192 5.42653C23.1359 5.87898 23.0259 6.50251 22.5735 6.81923L12.5735 13.8192C12.2291 14.0603 11.7709 14.0603 11.4265 13.8192L1.42653 6.81923C0.974083 6.50251 0.864048 5.87898 1.18076 5.42653Z" fill="black"/>
        </svg>

        <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 w-full md:w-2/3 xl:w-2/3">
          <h3 className="text-2xl xl:text-3xl font-semibold">
            Contact Information
          </h3>

          <a href={markup} className="text-md md:text-xl hover:text-tkh-brand-tangerine-5 transition ease-in-out duration-300">
            {email}
          </a>
        </div>
      </div>
        
    </div>
  );
};
