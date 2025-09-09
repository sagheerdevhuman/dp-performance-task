import { useSelector } from "react-redux"; 
import React from "react";
import ProgramCard  from "./ProgamCard";


export const  MorePrograms = ({ data }) => {
  const activePrograms = useSelector(
    (state) => state?.getAllActivePrograms?.program
  );
  if (activePrograms && activePrograms.length !== 0) {
    const skills = data.skills.map(e=> e.name).toString()
      
    const programs = activePrograms
      .filter((program) => !!program.skills
      .map( e=> e.name).toString()
      .includes(skills) && program.program_id!==data.program_id
    )
    if(programs.length >= 1){
      return (
        <a>
        <div className="flex flex-row justify-center items-center pt-20 w-full bg-tkh-brand-tangerine-5 ">
          <div className="flex flex-col justify-center gap-[24px] text-tkh-grayscale-0 items-center text-center">
            <h1 className="text-[40px] max-w-[550px] tracking-tight leading-tight ">
             More Programs Like This
            </h1>
            <div className=" grid grid-cols-1 md:grid-cols-3 mt-[40px] gap-[24px] pb-[104px] w-[80vw]">
            {programs.map((program, key) => {
              if (key < 3) {
                return <ProgramCard program={program} />;
              }
            })}
          </div>
           
          </div>
        </div>
        </a>
      );
    } 
    return <></> 
    
  }
};


