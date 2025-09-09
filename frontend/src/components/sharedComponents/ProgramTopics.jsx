import tempImg from "../../assets/login_image.png";
import { useState } from "react";
import { removeTopic } from "../../redux/programs/deleteTopicSlice";
import { useDispatch, useSelector } from "react-redux";
import {Edit} from "../utls/edit/topic"

export const ProgramTopics = ({ program,admin, list, setList, setOptions, handleSkillFormRendering}) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  console.log(admin)
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

  if (program && (admin==true)) {
    return (
      <>
        <div className="w-full pt-[20px]">
          <h2 className="font-[900] text-[32px] mt-[20px] ">Skills</h2>
          {program.skills.map((skill, key) => {
            return (
              <div
                className=" columns-1 mb-3"
                key={key}
              >
                <div className="flex justify-start items-center">
                  { program.skills.length>1&&(
                    <svg  className="h-[25px] w-[10%] fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { deleteSkill(skill)}}>
                      <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
                    </svg>
                  )} 
                  <div className="text-start mt-4 p-3 w-[90%]">
                    <p className="font-bold text-xl mb-3">{skill.name}</p>
                    <p className="font-light text-tkh-grayscale-7">
                      {skill.default}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className=" flex flex-row  flex-wrap justify-center items-center h-full w-full pb-[72px]">
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
        </div>
        
      </>
    );
  }
  if (program && (admin==false)) {
    return (
      <>
        <div className="w-full pt-[20px]">
          <h2 className="font-[900] text-[32px] mt-[20px] mb-2">Skills</h2>
          {program.skills.map((skill, key) => {
            return (
              <div
                className=" columns-1 mb-3"
                key={key}
              >
                <div className="flex justify-start items-center">
                  <div className="text-start mt-4  w-[90%]">
                    <p className="font-bold text-xl mb-1">{skill.name}</p>
                    <p className="font-light text-tkh-grayscale-7">
                      {skill.default}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </>
    );
  }
};
