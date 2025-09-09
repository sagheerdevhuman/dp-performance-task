import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirm } from "./confirm";
// import {title} from"./title";
 import {Edit} from "./edit/banner";
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

export const Banner = ({ handleSubmit,image,setImage,formData,setFormData,setPreview}) => {
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
      <form className="w-[579px]" onSubmit={(e) => handleSubmit(e,formData)} >
        <Edit handleClick={handleClick} image={image} setImage={setImage} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} setPreview={setPreview}/>
      </form>
    )
  }
  
  
  return (
   <div >
      <svg className="fill-[#fff] m-3 h-[24px] hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleClick(e);}}>
        <path d="M20.6048 14.56V20C20.6048 20.56 20.1648 21 19.6048 21H4.40479C3.84479 21 3.40479 20.56 3.40479 20V14.56C3.40479 14 3.84479 13.56 4.40479 13.56C4.96479 13.56 5.40479 14 5.40479 14.56V19H18.6048V14.56C18.6048 14 19.0448 13.56 19.6048 13.56C20.1648 13.56 20.6048 14 20.6048 14.56ZM8.72478 8.77998L11.0048 6.46001V15.12C11.0048 15.68 11.4448 16.12 12.0048 16.12C12.5648 16.12 13.0048 15.68 13.0048 15.12V6.46001L15.2848 8.77998C15.4848 8.97998 15.7448 9.07998 16.0048 9.07998C16.2648 9.07998 16.5048 8.98 16.7048 8.8C17.1048 8.42 17.1048 7.77998 16.7248 7.37998L12.7448 3.3C12.5648 3.1 12.3048 3 12.0248 3C11.7648 3 11.5048 3.1 11.3048 3.3L7.32478 7.37998C6.94478 7.77998 6.94478 8.4 7.34478 8.8C7.70478 9.18 8.34478 9.15998 8.72478 8.77998Z"/>
      </svg>
    </div>
  );
};






















