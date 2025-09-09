import AddSkillButton from "./AddSkillButton";
import BxdpRequestedSkillsList from "./BxdpRequestedSkillsList";

const SkillList = ({ handleSkillFormRendering,skills,setSkills }) => {
  
  return (
    <div className="h-[55vh] w-full p-0 rounded-md shadow-lg  p-[30px]">
      <div className="flex flex-row justify-between px-4 py-4 mb-2">
        <div className="sm:flex-auto">
          <h1 className="h-9 justify-center text-2xl font-bold text-tkh-brand-tangerine-5">
            Skills
          </h1>
        </div>
        
      <div className="md:ml-2 flex  m-0 w-[163px] h-[36px] bg-tkh-brand-tangerine-5 rounded-md justify-center items-center">
          <a className={
              "inline-flex font-[600] capitalize items-center p-4 text-sm md:rounded-t-lg m-0  text-white" 
            }
            onClick={handleSkillFormRendering}
            
          >
                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                <path d="M8.2793 12H9.7793V5.25H12.0293L9.0293 1.5L6.0293 5.25H8.2793V12Z" fill="white"/>
                <path d="M3.7793 16.5H14.2793C15.1065 16.5 15.7793 15.8273 15.7793 15V8.25C15.7793 7.42275 15.1065 6.75 14.2793 6.75H11.2793V8.25H14.2793V15H3.7793V8.25H6.7793V6.75H3.7793C2.95205 6.75 2.2793 7.42275 2.2793 8.25V15C2.2793 15.8273 2.95205 16.5 3.7793 16.5Z" fill="white"/>
                </svg>

            add skills
          </a>
      </div> 
      </div>
      <div className="flex w-full flex-row justify-between h-[40vh] overflow-auto">
        <table className="w-full  bg-[#fff] ">
          <thead className="text-xs md:text-m xl:text-l uppercase z-10 sticky top-0 bg-white">
            <tr className="border-b text-tkh-grayscale-5">
              <th/>
              <th className="px-3 py-3 text-left ">
                Name
              </th>
              <th className="px-3 py-3 text-left">
                Description
              </th>
            </tr>
          </thead>
          <BxdpRequestedSkillsList skills={skills} setSkills={setSkills}/>
        </table>
      </div>

    </div>
  );
};

export default SkillList;
