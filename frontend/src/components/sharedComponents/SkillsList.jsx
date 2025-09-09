import tempImg from "../../assets/login_image.png";
import { useState } from "react";
import { removeTopic } from "../../redux/programs/deleteTopicSlice";
import { useDispatch, useSelector } from "react-redux";
import {Edit} from "../utls/edit/topic"


export const SkillsList = ({ program, skills ,admin, list, setList, setOptions, handleSkillFormRendering  }) => {
  const upcoming = [];
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  function handleClick(event) {
    edit ? setEdit(false) : setEdit(true);
  }
  const deleteSkill = (skill) => {
    console.log(skill.skill_id)
    dispatch(
      removeTopic({
        program_id: skill.Topic.program_id,
        skill_id: skill.skill_id,
      })
    ).then(() => {
      return window.location.reload(true);
    });
  }

  console.log(skills)

  if(admin==true){
    return (
      <div className="flex flex-row w-full ">
          <div className="flex flex-col text-center gap-[48px]">
            {skills.map((skill, index) => (
            <div className="flex flex-row justify-start items-center gap-2">
              <svg  className="h-[25px] w-[10%] fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { deleteSkill(skill)}}>
                        <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
                      </svg>
                <div className="svg-wrapper">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 78 79" fill="none" className="z-[20]">
                        <g filter="url(#filter0_dd_306_2950)">
                        <circle cx="39" cy="35" r="28" fill="white"/>
                        </g>
                        <defs>
                        <filter id="filter0_dd_306_2950" x="0" y="0.4" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_306_2950"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="3.2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0627451 0 0 0 0 0.133333 0 0 0 0.03 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_306_2950"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow_306_2950"/>
                        <feOffset dy="4.4"/>
                        <feGaussianBlur stdDeviation="6"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0627451 0 0 0 0 0.133333 0 0 0 0.06 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_306_2950" result="effect2_dropShadow_306_2950"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_306_2950" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                    <span className="number font-bold text-tkh-grayscale-7 ">{index + 1}</span>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <p className="text-[#131022] text-[24px] font-bold">{skill.name}</p>
                    <p className="text-[#585C7B] text-[16px] max-w-[80%] text-left">
                        {skill.Topic.description}
                    </p>
                </div>
            </div>
            ))}
          </div>
          <div className=" flex flex-col  flex-wrap justify-center items-center h-[100px] w-full pb-[72px]">
              <Edit 
                edit={edit}
                program_id={program.program_id}
                handleClick={handleClick}
                list={list}
                setList={setList}
                setOptions={setOptions}
                handleSkillFormRendering={handleSkillFormRendering}
              />
            </div>
          <style jsx>{`
              li:hover{
                  color:#FFB570;
                  transition: all 0.3s ease-out ;

              }
                  .svg-wrapper {
                position: relative;
                width: 100px;
                height: 100px;
                }

                .svg-wrapper svg {
                display: block;
                }

                .svg-wrapper .number {
                position: absolute;
                top: 46%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 25px;
                font-weight: 900;
                }

              .selected{
                color: #FF7000;
              }
              .disabled{
                color: #D2D2D6;
              }
              .disabled:hover{
                color: #D2D2D6;
              }
            
          `}</style>
          
      </div>

    );
  }
  if(admin==false){
    return (
      <div className="flex flex-row w-full ">
          <div className="flex flex-col text-center gap-[48px]">
            {skills.map((skill, index) => (
            <div className="flex flex-row justify-start items-center gap-2">
                <div className="svg-wrapper">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 78 79" fill="none" className="z-[20]">
                        <g filter="url(#filter0_dd_306_2950)">
                        <circle cx="39" cy="35" r="28" fill="white"/>
                        </g>
                        <defs>
                        <filter id="filter0_dd_306_2950" x="0" y="0.4" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_306_2950"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="3.2"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0627451 0 0 0 0 0.133333 0 0 0 0.03 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_306_2950"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow_306_2950"/>
                        <feOffset dy="4.4"/>
                        <feGaussianBlur stdDeviation="6"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0627451 0 0 0 0 0.133333 0 0 0 0.06 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_306_2950" result="effect2_dropShadow_306_2950"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_306_2950" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                    <span className="number font-bold text-tkh-grayscale-7 ">{index + 1}</span>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <p className="text-[#131022] text-[24px] font-bold">{skill.name}</p>
                    <p className="text-[#585C7B] text-[16px] max-w-[80%] text-left">
                        {skill.Topic.description}
                    </p>
                </div>
            </div>
            ))}
          </div>
          <style jsx>{`
              li:hover{
                  color:#FFB570;
                  transition: all 0.3s ease-out ;

              }
                  .svg-wrapper {
                position: relative;
                width: 100px;
                height: 100px;
                }

                .svg-wrapper svg {
                display: block;
                }

                .svg-wrapper .number {
                position: absolute;
                top: 46%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 25px;
                font-weight: 900;
                }
    
              .selected{
                color: #FF7000;
              }
              .disabled{
                color: #D2D2D6;
              }
              .disabled:hover{
                color: #D2D2D6;
              }
            
          `}</style>
          
      </div>

    );
  }
  
};
