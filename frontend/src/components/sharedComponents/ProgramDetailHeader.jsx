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
import EditRequirementsModal from "./EditRequirementsModal";





export const ProgramDetailHeader = ({program,setDays, setProgram, admin, handleSubmit, formData, setFormData, list, setList, setOptions,days, handleSkillFormRendering, onUpdateRequirements}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const user_id = cookie.get("userId");
  const handleEditRequirements = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  console.log("program.program_requirements", program.program_requirements);
  console.log("program.requirements", program.requirements);
  console.log("Full program object:", program);
  
  const formatRequirements = (requirements) => {
    if (!requirements || Object.keys(requirements).length === 0) {
      return "No requirements specified";
    }

    const formatted = [];
    
    if (requirements.past_experience) {
      formatted.push("Past experience required");
    }
    
    if (requirements.education_level) {
      const educationMap = {
        high_school: "High School",
        associates: "Associate's Degree",
        bachelors: "Bachelor's Degree",
        masters: "Master's Degree",
        doctorate: "Doctorate",
        other: "Other",
      };
      formatted.push(`Education: ${educationMap[requirements.education_level] || requirements.education_level}`);
    }
    
    if (requirements.min_age || requirements.max_age) {
      const ageRange = [];
      if (requirements.min_age) ageRange.push(`Min: ${requirements.min_age}`);
      if (requirements.max_age) ageRange.push(`Max: ${requirements.max_age}`);
      formatted.push(`Age: ${ageRange.join(" - ")}`);
    }
    
    if (requirements.min_income || requirements.max_income_level) {
      const incomeRange = [];
      if (requirements.min_income) incomeRange.push(`Min: $${requirements.min_income}`);
      if (requirements.max_income_level) incomeRange.push(`Max: $${requirements.max_income_level}`);
      formatted.push(`Income: ${incomeRange.join(" - ")}`);
    }
    
    if (requirements.gender) {
      const genderMap = {
        male: "Male",
        female: "Female",
        non_binary: "Non-binary",
        other: "Other",
      };
      formatted.push(`Gender: ${genderMap[requirements.gender] || requirements.gender}`);
    }
    
    if (requirements.experience_level) {
      const experienceMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        expert: "Expert",
      };
      formatted.push(`Experience: ${experienceMap[requirements.experience_level] || requirements.experience_level}`);
    }
    
    if (requirements.city || requirements.zipcode) {
      const location = [];
      if (requirements.city) location.push(requirements.city);
      if (requirements.zipcode) location.push(requirements.zipcode);
      if (requirements.radius) location.push(`${requirements.radius} miles`);
      formatted.push(`Location: ${location.join(", ")}`);
    }
    
    return formatted.length > 0 ? formatted.join(" • ") : "No specific requirements";
  };
  return (
    <>
    <div className=" grid md:grid-cols-2 grid-cols-1  bg-[#fff]   h-[830px] w-screen overflow-visible">
      <div className=" flex flex-col pl-6 pr-6 h-md pt-6 m-0 md:items-center md:pl-[72px] md:py-[72px] ">
        <div className="flex flex-col gap-[27px]">
          <div className="flex gap-3 items-center">
            {(program.is_virtual == true) && (
              <Virtual
                text="Virtual"
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                admin={admin}
              />
            )}
            {(program.is_virtual == false) && (
              <Virtual
                text="In-Person"
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                admin={admin}
              />
            )}
           </div>
            <h1 className="text-[40px] max-w-[550px] tracking-tight cursor-pointer font-[600]  mb-3">
              {program.name}
            </h1>
            {admin && (
              <div className="mt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Requirements</h3>
                  <button
                    onClick={handleEditRequirements}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit Requirements
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {program.program_requirements[0] ? (
                    <p className="text-sm text-gray-700">
                      {formatRequirements(program.program_requirements[0]||{})}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No requirements specified</p>
                  )}
                </div>
              </div>
            )}
            <Text 
              text={program.description} 
              setText={setProgram} 
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
              showtitle={false}
              rich={false}
              title="Description"
              noTitle={true}
              type="description"
            />
            <div className="flex gap-3 items-center justify-self-end"> 
              
              <h2 className=" capitalize font-[900]  ">enrollment deadline:</h2>
                
              <p>
                {moment(program.enrollment_deadline).format("MMM Do, YYYY")}{""}
              </p>
            </div>
            
            <div className="flex flex-row gap-[24px] items-center">
              <div className="flex flex-col w-fit h-[48px] gap-[24px]">
                <img src={program.organization.logo_url} alt="" className=" h-[48px] rounded-full" />
              </div>
              <div className="flex flex-col">
                <p className="text-[16px] font-[800]">Run by</p>
                <p className="text-[16px] font-[400]">{program.organization.name}</p>
              </div>
            </div>
            
        </div>
      </div>
      <div className="  overflow-visible items-end md:items-start md:pr-[72px] p-0  md:pt-[72px] md:min-h-[690px]">
        <div className="bg-tkh-brand-tangerine-5 h-[815px] z-[10] w-[100vw] md:w-full md:min-h-[670px] z-10 md:max-w=[636px] md:rounded-[8px] bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/image%402x.png')]"/> 
      </div>
      
      <EditRequirementsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        entityType="programs"
        entityId={program.program_id}
        currentRequirements={program.requirements || program.program_requirements || {}}
        entityName={program.name}
        userId={user_id}
      />
    </div>

    <div className=" flex flex-row px-[72px] p-[110px]">
    
      
      <div className="flex flex-col w-2/3">
      
          <h1 className="text-[40px] font-[700] mb-[52px]">Program Details</h1>
          <SkillsList program={program} skills={program.skills} admin={admin} list={list} setList={setList} setOptions={setOptions} handleSkillFormRendering={handleSkillFormRendering} />
      </div>
      <div className="flex grid-cols gap-4 w-1/3">
      
          <div className="flex flex-col p-[40px] gap-4 bg-[#fff] h-[416px] w-full shadow-md rounded-[8px]">
              <h1 className="text-[24px] font-[800]">Program Details</h1>
              
              <ProgramDate
                program={program} 
                formData={formData} 
                handleSubmit={handleSubmit} 
                setFormData={setFormData}
                admin={admin}
                setDays={setDays}
                days={days}
              />
              <Apply_link 
                program={program}
                formData= {formData} 
                handleSubmit={handleSubmit} 
                setFormData={setFormData}
                admin={admin}
              />

              {/* <Apply id={program.program_id} program={program} /> */}
            
          </div>
      </div>
    </div>
    </>

  );
  

};
