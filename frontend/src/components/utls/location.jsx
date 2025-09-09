import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
import { Edit } from "./edit/location";

export const Location = ({ handleSubmit,location,partner,formData,setFormData,admin}) => {
  // const [modalRendered, isModalRendered] = useState(false);
  const [edit, setEdit] = useState(false);
  // function handleConfirmRendering(event) {
  //   event.preventDefault();
  //   modalRendered ? isModalRendered(false) : isModalRendered(true);
  // }
  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);
  }
  const local = "https://www.google.com/maps/search/?api=1&query=" + location

  if (edit==true){
    return(
      <form  onSubmit={(e) => handleSubmit(e,formData)} >
        <Edit handleClick={handleClick} partner={partner} formData={formData} setFormData={setFormData}/>
      </form>
    )
  }
  return (
    <div className="flex gap-3 items-center w-full">
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
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 13.0981 6.01574 16.1042 8.22595 18.4373C9.31061 19.5822 10.3987 20.5195 11.2167 21.1708C11.5211 21.4133 11.787 21.6152 12 21.7726C12.213 21.6152 12.4789 21.4133 12.7833 21.1708C13.6013 20.5195 14.6894 19.5822 15.774 18.4373C17.9843 16.1042 20 13.0981 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 23C11.4453 23.8321 11.445 23.8319 11.4448 23.8317L11.4419 23.8298L11.4352 23.8253L11.4123 23.8098C11.3928 23.7966 11.3651 23.7776 11.3296 23.753C11.2585 23.7038 11.1565 23.6321 11.0278 23.5392C10.7705 23.3534 10.4064 23.0822 9.97082 22.7354C9.10133 22.043 7.93939 21.0428 6.77405 19.8127C4.48426 17.3958 2 13.9019 2 10C2 7.34784 3.05357 4.8043 4.92893 2.92893C6.8043 1.05357 9.34784 0 12 0C14.6522 0 17.1957 1.05357 19.0711 2.92893C20.9464 4.8043 22 7.34784 22 10C22 13.9019 19.5157 17.3958 17.226 19.8127C16.0606 21.0428 14.8987 22.043 14.0292 22.7354C13.5936 23.0822 13.2295 23.3534 12.9722 23.5392C12.8435 23.6321 12.7415 23.7038 12.6704 23.753C12.6349 23.7776 12.6072 23.7966 12.5877 23.8098L12.5648 23.8253L12.5581 23.8298L12.556 23.8312C12.5557 23.8314 12.5547 23.8321 12 23ZM12 23L12.5547 23.8321C12.2188 24.056 11.7807 24.0556 11.4448 23.8317L12 23Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z" fill="black"/>
</svg>

       {/* <img
          src={section.sectionImage}
          alt=""
          className="h-12 w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-full"
        />*/}
        <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 w-full md:w-2/3 xl:w-2/3">
          {admin==true &&(
            <h3 className="text-2xl xl:text-3xl font-semibold">
              Location
            </h3>
          )}
          <a className="text-md md:text-xl hover:text-tkh-brand-tangerine-5 transition ease-in-out duration-300" href={local} target="_blank">
              {location}
          </a>
        </div>
      </div>
    </div>
  );
};
