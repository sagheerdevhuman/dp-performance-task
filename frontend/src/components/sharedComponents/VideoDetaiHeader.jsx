import React from "react";
import tempImage from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import {Text} from "../utls/text";
import {Image} from "../utls/image"
import {Virtual} from "../utls/virtual"
import {ProgramDate} from "../utls/program_date";
import {Apply_link} from "../utls/apply"
import { useState } from "react";
import moment from "moment";
import ft from "format-time";
import { ProgramTopics } from "./ProgramTopics";
import cookie from "js-cookie";
import { SkillsList } from "./SkillsList";
import { Apply } from "./Apply";
import ReactPlayer from 'react-player'
import { MoreVideos } from "./MoreVideos";





export const VideoDetailHeader = ({video, setVideo}) => {
  const navigate = useNavigate();
  const user_id = cookie.get("userId");
  console.log(video)
  return (
    <>
    <div className=" flex flex-col  bg-[#fff]   h-fit w-screen overflow-visible">
      <div className="flex flex-col pl-6 pr-6 h-md py-[87px] m-0 md:items-center md:pl-[100px] md:pr-[100px] ">
        <div className="flex flex-col gap-[27px] w-full">
            <div className="flex flex-col gap-3 justify-start items-start h-[698px] w-full">
              <ReactPlayer src={video.link} width="100%" height="100%" controls/>
            </div>
          <div className="grid grid-cols-7 gap-3 justify-start items-start">
            <div className="col-span-5 flex flex-col gap-3 justify-start items-start">
              <h1 className="text-[40px] font-[900]">{video.name}</h1>
              <p className="text-[16px] font-[400] text-[#585C7B]">{video.description}</p>
            </div>
            <div className="col-span-2 flex flex-col  justify-end items-end">
                <div className="flex flex-col  justify-start items-start">
                    <p className="text-[16px] font-[800] text-[#585C7B] mb-0">Uploaded by</p>
                    <p className="text-[16px] font-[600] underline text-[#585C7B] mt-0">{video.organization.name}</p>
                </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {video.tags.map((tag) => (
              <div key={tag.tag_id} className="bg-tkh-brand-tangerine-5 rounded-md px-2 py-1">
                <p className="text-sm text-tkh-grayscale-0">{tag.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <MoreVideos data={video} />
    </>

  );
  

};
