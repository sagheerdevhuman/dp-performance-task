import { useState, useEffect } from "react";
import BxdpRequestsView from "./BxdpRequestsView";
import BxdpApprovedView from "./BxdpApprovedView";
import StaffList from "./StaffList";
import SkillList from "./SkillList";
import OrgStaffList from "../orgComponents/OrgStaffList";
import cookie from "js-cookie";
import BxdpReportsView from "./BxdpReportsView";
const RequestsManagementView = ({
  activeButton,
  handleOrgFormRendering,
  handleSkillFormRendering,
  handleStaffFormRendering,
  handleEditVideoFormRendering,
  setPrograms,
  setEvents,
  setOrgs,
  programs,
  events,
  orgs,
  members,
  skills,
  resources,
  setResources,
  reload,
  setSkills,
  selectedVideo,
  setSelectedVideo,
  handleRejectFormRendering,
  setRejectData,
  rejectData,
  videos,
  setVideos,
  handleVideoFormRendering,
  videoFormData,
  setVideoFormData,
  handleVideoFormSubmit,
  videoErrors,
  setVideoErrors,
  videoModalRendered,
  handleResourceFormRendering,
  editVideoModalRendered,
  isEditVideoModalRendered,
  
}) => {
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const [activeButton2, setActiveButton2] = useState("events");
  const types = ["events", "programs", "orgs", "resources", "videos"]

  
  return (
    <div class="flex flex-col lg:grid lg:grid-cols-7 gap-7">
      <div class="lg:col-span-5">
        <BxdpReportsView
          events={events}
          setEvents={setEvents}
          programs={programs}
          setPrograms={setPrograms}
          setOrgs={setOrgs}
          orgs={orgs}
          members={members}
        />
      </div>
      {isMetaAdmin == "true" && (
        <div class="lg:col-span-2">
          <StaffList handleStaffFormRendering={handleStaffFormRendering}/>
        </div>
      )}
      
      
        {types.map((type) => (
          <>
            <div class={`lg:col-span-${type === "videos" ? "4" : "7"} `}>
            <BxdpRequestsView
              handleOrgFormRendering={handleOrgFormRendering}
              handleSkillFormRendering={handleSkillFormRendering}
              handleRejectFormRendering={handleRejectFormRendering}
              setRejectData={setRejectData}
              approved={false}
              archived={false}
              rejected={false}
              setPrograms={setPrograms}
              setEvents={setEvents}
              setOrgs={setOrgs}
              programs={programs}
              events={events}
              orgs={orgs}
              rejectData={rejectData}
              members={members}
              skills={skills}
              setSkills={setSkills}
              activeButton={activeButton2}
              setActiveButton={setActiveButton2}
              type={type}                                                                                                                                                    
              resources={resources}
              setResources={setResources}
              videos={videos}
              setVideos={setVideos}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
              handleVideoFormRendering={handleVideoFormRendering}
              videoFormData={videoFormData}
              setVideoFormData={setVideoFormData}
              handleVideoFormSubmit={handleVideoFormSubmit}
              videoErrors={videoErrors}
              handleEditVideoFormRendering={handleEditVideoFormRendering}
              setVideoErrors={setVideoErrors}
              videoModalRendered={videoModalRendered}
              handleResourceFormRendering={handleResourceFormRendering}
              editVideoModalRendered={editVideoModalRendered}
              isEditVideoModalRendered={isEditVideoModalRendered}
            />
            </div>
          
          </>
        ))}
        
       <div class="lg:col-span-3"> 
        <SkillList  
          handleSkillFormRendering={handleSkillFormRendering}  
          skills={skills}
          setSkills={setSkills}
        /> 
      </div>
    </div>
  );
};

export default RequestsManagementView;
