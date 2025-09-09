import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import timeSvg from "../../assets/noun-time-1015020.svg";
import moment from "moment";
import ft from "format-time";

const ResourceCard = ({ resource,id }) => {

  const navigate = useNavigate();
  const link = `url('${resource?.banner_url}')`
  const shorten = (str,num) => {
      if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
      }
      return str.slice(0,num) + '...'
  }
  const prev = shorten(resource?.description,150);
  const markup = { __html: prev };
  const handleClick = () => {
    window.open(resource?.link, '_blank');  
    navigate(`/resource_details/${id?id:resource?.resource_id}`)
  }


  return (
    <a href={`/resource_details/${id?id:resource?.resource_id}`} target="_blank" rel="noopener noreferrer">
    <div
      className="flex flex-col text-start  drop-shadow bg-[#ffff] rounded items-start h-full max-w-[649px]  w-[45vw] cursor-pointer"
      key={id?id:resource?.resource_id}
    >
      <div className=" drop-shadow-card-2 bg-[#ffff] h-[100%] w-[100%] rounded">
        <div className={`h-[240px]  w-full resource-card `} style={{backgroundImage: `url(${resource?.photo?resource?.photo:tempImg})`}}/>   
        <div className="flex flex-col gap-[8px] p-5 ">
            <div className="flex flex-row gap-2 justify-between items-center">
          <h3   
            className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
          >
            {resource?.title}
          </h3>
          
            <p className="text-[16px] font-[600] t-[#000000] tracking-tight text-tkh-grayscale-7 underline">
              {resource?.provider}
            </p>
        
        </div>
          
          <div className=" break-word lg:text-md font-light tracking-tight  h-[88px] leading-tight text-tkh-grayscale-7">
            <div className="break-word" dangerouslySetInnerHTML={markup}/> 
            
          </div>
          <div className="divider"></div>
          <div className="flex flex-row gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.99935 1.66669C5.40435 1.66669 1.66602 5.40502 1.66602 10C1.66602 14.595 5.40435 18.3334 9.99935 18.3334C14.5943 18.3334 18.3327 14.595 18.3327 10C18.3327 5.40502 14.5943 1.66669 9.99935 1.66669ZM9.99935 16.6667C6.32352 16.6667 3.33268 13.6759 3.33268 10C3.33268 6.32419 6.32352 3.33335 9.99935 3.33335C13.6752 3.33335 16.666 6.32419 16.666 10C16.666 13.6759 13.6752 16.6667 9.99935 16.6667Z" fill="#9397AD"/>
                <path d="M10.8327 5.83331H9.16602V10.345L11.9102 13.0891L13.0885 11.9108L10.8327 9.65498V5.83331Z" fill="#9397AD"/>
            </svg>
            <p className="text-sm font-light tracking-tight text-tkh-grayscale-7">
              {resource?.location}
            </p>
          </div>
          
          
        </div>
      </div>
    </div> 
    <style jsx>{`
      .resource-card {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      }
      .divider {
        max-width: 601px;
        width: 100%;
        height: 1px;
        background-color: #E0E0E0;
      }
    `}</style>
    </a>    
    )
  
  
};

export default ResourceCard;
