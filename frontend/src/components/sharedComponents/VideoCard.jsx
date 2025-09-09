import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const shorten = (str,num) => {
    
    return str.slice(0,num) + '...'
}
const prev = shorten(video?.description,150);
  console.log(video)
  const link = video?.image_url ? `url('${video?.image_url}')` : `url('${tempImg}')`
 
  return (
    <a href={`/video_details/${video?.video_id}`}>         
    <div
      className="flex flex-col text-start w-full min-w-[300px] drop-shadow bg-[#ffff] rounded items-start h-full  cursor-pointer"
      key={video.video_id}
    >
      

      <div className=" drop-shadow-card-2 bg-[#ffff] h-[100%] w-[100%] rounded">
        <div className=" h-[240px]  w-full " style={{"background":link,"backgroundRepeat":"no-repeat","backgroundPosition":"center","backgroundSize":"cover" }} />   
        <div className="flex flex-col gap-[8px] p-5 ">
          <h3
            className="text-2xl lg:text-2xl tracking-tight font-semibold leading-tight cursor-pointer text-tkh-grayscale-9"
          >
            {video?.name}
          </h3>
          
          <div className=" break-word lg:text-md font-light tracking-tight  h-[88px] leading-tight text-tkh-grayscale-7">
            {prev}
          </div>
          <div>
            <p className="text-[14px] font-[400] text-tkh-grayscale-9">by {video?.organization?.name}</p>
            <img src={video?.organization?.logo_url} alt="" className="w-auto h-[30px] " />
          </div>
          
          
        </div>
      </div>
    </div>  
    </a>      
  );
};


export default VideoCard;
