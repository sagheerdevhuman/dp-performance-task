import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
 


const AddButton = ({
  activeButton,
  title,
  handleActiveButton,
  handleVideoFormRendering,
  handleResourceFormRendering,
}) => {
  const link = title.substring(0, title.length - 1);
  const navigate = useNavigate();

  return (
    <>
      {!(title ==="skills" || title ==="videos" || title ==="resources") && (  
          <div className="md:ml-2 flex  m-0 w-[163px] h-[36px] bg-tkh-brand-tangerine-5 rounded-md justify-center items-center">
            <a className={
                "inline-flex font-[600] capitalize items-center p-4 text-sm md:rounded-t-lg m-0  text-white" 
              }
              onClick={(e) => navigate(`/create_${link}`)}
              
            >
                  <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path d="M8.2793 12H9.7793V5.25H12.0293L9.0293 1.5L6.0293 5.25H8.2793V12Z" fill="white"/>
                  <path d="M3.7793 16.5H14.2793C15.1065 16.5 15.7793 15.8273 15.7793 15V8.25C15.7793 7.42275 15.1065 6.75 14.2793 6.75H11.2793V8.25H14.2793V15H3.7793V8.25H6.7793V6.75H3.7793C2.95205 6.75 2.2793 7.42275 2.2793 8.25V15C2.2793 15.8273 2.95205 16.5 3.7793 16.5Z" fill="white"/>
                  </svg>
                  {/* <PlusSmIconSolid className="h-6 w-6 transition ease-in-out text-grayscale-9 transform scale-75 hover:scale-100 duration-300  text-xs md:text-sm font-bold sm:font-semibold  hover:text-tkh-brand-tangerine-5" aria-hidden="true" /> */}
              add {title}
            </a>
          </div>
     
        )}       
        {title === "videos" && ( 
          <div className="md:ml-2 flex  m-0 w-[163px] h-[36px] bg-tkh-brand-tangerine-5 rounded-md justify-center items-center">
            <a className={
                "inline-flex font-[600] capitalize items-center p-4 text-sm md:rounded-t-lg m-0  text-white" 
              }
              onClick={handleVideoFormRendering} 
              
            >
                  <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path d="M8.2793 12H9.7793V5.25H12.0293L9.0293 1.5L6.0293 5.25H8.2793V12Z" fill="white"/>
                  <path d="M3.7793 16.5H14.2793C15.1065 16.5 15.7793 15.8273 15.7793 15V8.25C15.7793 7.42275 15.1065 6.75 14.2793 6.75H11.2793V8.25H14.2793V15H3.7793V8.25H6.7793V6.75H3.7793C2.95205 6.75 2.2793 7.42275 2.2793 8.25V15C2.2793 15.8273 2.95205 16.5 3.7793 16.5Z" fill="white"/>
                  </svg>
                  {/* <PlusSmIconSolid className="h-6 w-6 transition ease-in-out text-grayscale-9 transform scale-75 hover:scale-100 duration-300  text-xs md:text-sm font-bold sm:font-semibold  hover:text-tkh-brand-tangerine-5" aria-hidden="true" /> */}
              add {title}
            </a>
          </div> 

          
        )}
        {title === "resources" && (
          <div className="md:ml-2 flex  m-0 w-[163px] h-[36px] bg-tkh-brand-tangerine-5 rounded-md justify-center items-center">
          <a className={
              "inline-flex font-[600] capitalize items-center p-4 text-sm md:rounded-t-lg m-0  text-white" 
            }
            onClick={handleResourceFormRendering} 
            
          >
                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M8.2793 12H9.7793V5.25H12.0293L9.0293 1.5L6.0293 5.25H8.2793V12Z" fill="white"/>
                <path d="M3.7793 16.5H14.2793C15.1065 16.5 15.7793 15.8273 15.7793 15V8.25C15.7793 7.42275 15.1065 6.75 14.2793 6.75H11.2793V8.25H14.2793V15H3.7793V8.25H6.7793V6.75H3.7793C2.95205 6.75 2.2793 7.42275 2.2793 8.25V15C2.2793 15.8273 2.95205 16.5 3.7793 16.5Z" fill="white"/>
                </svg>
                {/* <PlusSmIconSolid className="h-6 w-6 transition ease-in-out text-grayscale-9 transform scale-75 hover:scale-100 duration-300  text-xs md:text-sm font-bold sm:font-semibold  hover:text-tkh-brand-tangerine-5" aria-hidden="true" /> */}
            add {title}
          </a>
        </div> 
        )}
    </>
 
  );
};

export default AddButton;
