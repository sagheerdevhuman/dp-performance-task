import { useDispatch, useSelector } from "react-redux"; 
import React from "react";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";


export const  MoreVideos = ({ data }) => {
  const activeVideos = useSelector((state) => state?.getAllVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoList());
  }, []);

  if (activeVideos?.status == "success" && activeVideos?.userList?.length !== 0) {
    
    const tags = data.tags.map(e=> e.name).toString()

    
    
    const videos = activeVideos?.userList
      .filter((video) => !!video.tags
      .map( e=> e.name).toString()
      .includes(tags) && video.video_id!==data.video_id
    )
    
 

    if(videos.length >= 1){
      return (
          <div className="flex flex-row justify-center items-center pt-20 w-full bg-tkh-brand-tangerine-5 ">
            <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
              <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
               More Videos Like This
              </h1>
              <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] gap-[24px] pb-[104px] w-[80vw] place-content-center">
              {videos.map((video, key) => {
                if (key < 3) {
                  return <VideoCard video={video} />;
                }
              })}
            </div>
             
            </div>
          </div>
      );
    }
    return (
      <div className="flex flex-row justify-center items-center pt-20 w-full bg-tkh-brand-tangerine-5 ">
        <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
          <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
            More Videos Like This
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] gap-[24px] pb-[104px] w-[80vw] place-content-center">
         
        </div>
          
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-center items-center pt-20 w-full bg-tkh-brand-tangerine-5 ">
      <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
        <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
          More Videos Like This
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] gap-[24px] pb-[104px] w-[80vw] place-content-center">
       
      </div>
        
      </div>
    </div>
  )
};


