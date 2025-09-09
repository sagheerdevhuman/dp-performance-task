import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
import { Edit } from "./edit/virtual";

export const Virtual = ({ handleSubmit,text,formData,setFormData,admin}) => {
  const [modalRendered, isModalRendered] = useState(false);
  const [edit, setEdit] = useState(false);
  function handleConfirmRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }
  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);
  }

  if (edit==true){
    return(
      <form  onSubmit={(e) => handleSubmit(e,formData)} >
        <Edit handleClick={handleClick} text={text} formData={formData} setFormData={setFormData} />
      </form>
    )
  }
  return (
    <div className="flex gap-3 items-center justify-start">
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
        <svg className="fill-tkh-grayscale-9  h-[24px] min-w-[24px] w-[5%] hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  onClick={(e) => { handleClick(e);}}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V14.66C19 14.1077 19.4477 13.66 20 13.66C20.5523 13.66 21 14.1077 21 14.66V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7957 1 20V6C1 5.20435 1.31607 4.44129 1.87868 3.87868C2.44129 3.31607 3.20435 3 4 3H9.34C9.89228 3 10.34 3.44772 10.34 4C10.34 4.55228 9.89228 5 9.34 5H4Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2929 1.29289C17.6834 0.902369 18.3166 0.902369 18.7071 1.29289L22.7071 5.29289C23.0976 5.68342 23.0976 6.31658 22.7071 6.70711L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17H8C7.44772 17 7 16.5523 7 16V12C7 11.7348 7.10536 11.4804 7.29289 11.2929L17.2929 1.29289ZM9 12.4142V15H11.5858L20.5858 6L18 3.41421L9 12.4142Z" />
        </svg>
      )}
      <span class="bg-tkh-brand-tangerine-5  rounded text-[20px] h-[32px] font-medium  px-2.5 py-0.5 text-[#fff]">{text}</span>
     
    </div>
  );
};
