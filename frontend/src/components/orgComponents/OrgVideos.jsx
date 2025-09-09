import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import  VideoCard  from "../sharedComponents/VideoCard";

export const OrgVideos = ({ videos }) => {
  if (videos && videos.length !== 0) {
        console.log("videos",videos)

    return (
      <>
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        <div className="flex flex-col justify-center items-center px-0 pt-[80px] pb-0">
          <div className="flex flex-col w-[100vw] justify-center items-center mt-2 text-center">
            <h1 className="text-[40px] mb-[27px] font-[700] tracking-tight leading-tight text-[#000]">
              Videos
            </h1>
            
          </div>
        </div>
        <div className="flex flex-row w-[100vw] justify-center items-center mx-2 text-center overflow-x-auto no-scrollbar">
          <div className="flex flex-col justify-center items-center px-0 pt-0 pb-[104px]">
            <div className="mt-8 md:mt-[40px]  flex justify-center gap-4 w-fit overflow-x-auto no-scrollbar">
              {videos.map((video) => (
                <VideoCard video={video} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};
