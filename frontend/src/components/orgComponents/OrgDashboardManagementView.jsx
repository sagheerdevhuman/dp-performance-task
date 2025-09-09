import OrgRequestsListView from "./OrgRequestsListView";
import OrgStaffList from "../orgComponents/OrgStaffList";
import OrgProfile from "./OrgProfile";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import OrgReportsView from "./OrgReportView";

const RequestsManagementView = ({
  programs,
  events,
  handleStaffFormRendering,
  videos,
  setVideos,
  handleVideoFormRendering,
  resources,
  setResources,
  handleOrgFormRendering,
  handleEditVideoFormRendering,
  org,
  setPrograms,
  setEvents,
  handleResourceFormRendering
}) => {
  const isOrgAdmin = cookie.get("isOrgAdmin");
  const types = ["events", "programs", "resources"]

 
  return (
    <div class="flex flex-col lg:grid lg:grid-cols-7 gap-7">
      <div class="lg:col-span-5">
        <OrgReportsView
          events={events}
          setEvents={setEvents}
          programs={programs}
          setPrograms={setPrograms}
        />
      </div>
      {isOrgAdmin === "true" && (
        <div class="lg:col-span-2">
          <OrgStaffList handleStaffFormRendering={handleStaffFormRendering}/>
        </div>
      )}
        {types.map((type, index) => (
          <div key={index} class="lg:col-span-7">
            <OrgRequestsListView
              programs={programs}
              events={events}
              resources={resources}
              setResources={setResources}
              videos={videos}
              setVideos={setVideos}
              type={type}
              height="40vh"
              height2="176px"
              handleVideoFormRendering={handleVideoFormRendering}
              handleOrgFormRendering={handleOrgFormRendering}
              handleEditVideoFormRendering={handleEditVideoFormRendering}
              handleResourceFormRendering={handleResourceFormRendering}
            />
          </div>
        ))}
        <div class="lg:col-span-4">
          <OrgRequestsListView
              programs={programs}
              events={events}
              resources={resources}
              setResources={setResources}
              videos={videos}
              setVideos={setVideos}
              height="55vh"
              height2="40vh"
              type="videos"
              handleVideoFormRendering={handleVideoFormRendering}
              handleOrgFormRendering={handleOrgFormRendering}
              handleEditVideoFormRendering={handleEditVideoFormRendering}
            />
        </div>

        <div class="lg:col-span-3">
        <OrgProfile org={org}/>
        </div>
       
    </div>
  );
};

export default RequestsManagementView;
