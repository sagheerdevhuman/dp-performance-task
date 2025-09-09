import React from "react";
import tempImage from "../../assets/login_image.png";
import {Text} from "../utls/text";
import {Image} from "../utls/image";
import {EventDate} from "../utls/event_date";
import {RSVP_link} from "../utls/rsvp"
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";
import ft from "format-time";
import { EventTags } from "./EventTags";
import {Virtual} from "../utls/virtual"
import EditRequirementsModal from "./EditRequirementsModal";
import cookie from "js-cookie";


 export const EventDetailHeader = ({ event, setEvent, admin, handleSubmit, days, setDays, formData, setFormData, handleTagFormRendering,list,setList,setOptions, onUpdateRequirements}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const user_id = cookie.get("userId");
  const handleEditRequirements = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  console.log("event.event_requirements",event.event_requirements)
  console.log("event.requirements",event.requirements)
  console.log("Full event object:", event)
  
  const formatRequirements = (requirements) => {
    if (!requirements || Object.keys(requirements).length === 0) {
      return "No requirements specified";
    }

    const formatted = [];
    
    if (requirements[0].past_experience) {
      formatted.push("Past experience required");
    }
 
    if (requirements[0].education_level) {
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
    
    if (requirements[0].min_age || requirements[0]  .max_age) {
      const ageRange = [];
      if (requirements[0].min_age) ageRange.push(`Min: ${requirements[0].min_age}`);
      if (requirements[0].max_age) ageRange.push(`Max: ${requirements[0].max_age}`);
      formatted.push(`Age: ${ageRange.join(" - ")}`);
    }
    
    if (requirements[0].min_income || requirements[0].max_income_level) {
      const incomeRange = [];
      if (requirements[0].min_income) incomeRange.push(`Min: $${requirements[0].min_income}`);
      if (requirements[0].max_income_level) incomeRange.push(`Max: $${requirements[0].max_income_level}`);
      formatted.push(`Income: ${incomeRange.join(" - ")}`);
    }
    
    if (requirements[0].gender) {
      const genderMap = {
        male: "Male",
        female: "Female",
        non_binary: "Non-binary",
        other: "Other",
      };
      formatted.push(`Gender: ${genderMap[requirements[0].gender] || requirements[0].gender}`);
    }
    
    if (requirements[0].experience_level) {
      const experienceMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        expert: "Expert",
      };
      formatted.push(`Experience: ${experienceMap[requirements[0].experience_level] || requirements[0].experience_level}`);
    }
    
    if (requirements[0].city || requirements[0].zipcode) {
      const location = [];
      if (requirements[0].city) location.push(requirements[0].city);
      if (requirements[0].zipcode) location.push(requirements[0].zipcode);
      if (requirements[0].radius) location.push(`${requirements[0].radius} miles`);
      formatted.push(`Location: ${location.join(", ")}`);
    }
    
    return formatted.length > 0 ? formatted.join(" • ") : "No specific requirements";
  };
   
  return (
    <div className="flex flex-col justify-center items-center bg-[#fff] min-h-[400px] p-5">
      <div className="flex flex-row  px-[80px] pt-[60px] w-full">
          <div className="flex items-center gap-3 px-[20px]">
            {(event.is_virtual == true) && (
              <Virtual
                text="Virtual"
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                admin={admin}
              />
            )}
            {(event.is_virtual == false) && (
              <Virtual
                text="In-Person"
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                admin={admin}
              />
            )}
            <EventTags 
              event={event}
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
              list={list}
              setList={setList}
              setOptions={setOptions}
              handleTagFormRendering={handleTagFormRendering}
            />    
          </div>
      </div>
      <div className="flex frex-row px-[80px] gap-[60px] pb-[50px]">
        <div className="flex flex-col w-1/2 px-[20px]">
          
          <Text 
            text={event.description}
            setText={setEvent}  
            formData={formData} 
            handleSubmit={handleSubmit} 
            setFormData={setFormData} 
            admin={admin}
            rich={true}
            title={ admin==true ? "Description" : event.name}
            type="description"
          />
          {admin && (
            <div className="mt-6">
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
                { event.event_requirements ? (
                  <p className="text-sm text-gray-700">
                    {formatRequirements(event.event_requirements)}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No requirements specified</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-1/2 px-[20px]">
          {(event.is_virtual == false) && (
            <Text 
              text={event.location} 
              setText={setEvent} 
              formData={formData} 
              handleSubmit={handleSubmit} 
              setFormData={setFormData} 
              admin={admin}
              rich={false}
              title="Location"
              type="location"
            />
          )}
          <EventDate
            event={event} 
            formData={formData} 
            handleSubmit={handleSubmit} 
            setFormData={setFormData}
            days={days}
            setDays={setDays} 
            admin={admin}
          />
          <div className="flex flex-row gap-[20px]">
            <div className="flex flex-col w-fit">
              <img src={event.organization.logo_url} alt="" className="h-[10vh] " />
            </div>
            <div className="flex flex-col h-[100%] justify-center">
              <p className="text-[16px] font-[800] ">Run by</p>
              <p className="text-[16px]">{event.organization.name}</p>
            </div>
          </div>
         
        </div>
        
      </div>
      <div className="flex flex-row justify-center pb-[60px]">
          <RSVP_link 
            event={event}
            formData= {formData} 
            handleSubmit={handleSubmit} 
            setFormData={setFormData}
            admin={admin}
          />
      </div>
      <EditRequirementsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        entityType="events"
        entityId={event.event_id}
        currentRequirements={ event.event_requirements[0] || {} }
        entityName={event.name}
        userId={user_id}
      />
    </div>
  );
};
