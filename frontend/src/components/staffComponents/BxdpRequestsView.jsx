import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BxdpRequestedEventsList from "./BxdpRequestedEventsList";
import BxdpRequestedProgramsList from "./BxdpRequestedProgramsList";
import BxdpRequestedOrgsList from "./BxdpRequestedOrgsList";
import BxdpRequestedResourceList from "./BxdpRequestedResourceList";
import BxdpRequestedSkillsList from "./BxdpRequestedSkillsList";
import BxdpRequestedVideosList from "./BxdpRequestedVideosList";
import { getUserList } from "../../redux/user/fetchAllUsers";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { getAllPrograms } from "../../redux/programs/fetchAllProgramsSlice";
import AddButton from "./AddButton";
import cookie from "js-cookie";

const BxdpRequestsView = ({ type,setPrograms,setSkills,handleOrgFormRendering,handleSkillFormRendering, programs, events,setEvents, orgs, setOrgs, members, skills ,handleRejectFormRendering ,setRejectData,rejectData, resources, setResources, videos, setVideos, handleVideoFormRendering, videoFormData,handleEditVideoFormRendering, setVideoFormData, handleVideoFormSubmit, videoErrors, setVideoErrors, videoModalRendered, handleResourceFormRendering, selectedVideo, setSelectedVideo, editVideoModalRendered, isEditVideoModalRendered   }) => {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const buttons = ["requests", "approved","rejected","archived"];
  const [activeButton, setActiveButton] = useState("requests");
  const [archived, setArchived] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);
  
  function handleActiveButton(button) {

    setActiveButton(button);
    if(button === "archived"){
      setArchived(true);
      setRejected(false);
      setApproved(false);
    }
    if(button === "rejected"){
      setRejected(true);
      setArchived(false);
      setApproved(false);
    }
    if(button === "approved"){
      setApproved(true);
      setArchived(false);
      setRejected(false);
    }
    if(button === "requests"){
      setArchived(false);
      setRejected(false);
      setApproved(false);
    }
    cookie.set("active", button);
  }


  return (

    <div className={`h-[${type === "videos" ? "55vh" : "40vh"}] pb-2 w-full  border-tkh-grayscale-7  rounded-md shadow-lg `}>
    <div className=" border-collapse px-[30px] pb-[60px] pt-[30px]">
      <div className="p-6 flex flex-row justify-between items-center">
        {type === "events" &&(
            <h1 className="h-9 text-[25px] font-bold text-tkh-brand-tangerine-5">
              Events
            </h1>
        )}
        {type === "programs" &&(
            <h1 className="h-9 text-[25px] font-bold text-tkh-brand-tangerine-5">
              Programs
            </h1>
        )}
        {type === "orgs" &&(
            <h1 className="h-9 text-[25px] font-bold text-tkh-brand-tangerine-5">
              Organizations
            </h1>
        )}
        {type === "resources" &&(
          <h1 className="h-9 text-[25px] font-bold text-tkh-brand-tangerine-5">
            Resources
          </h1>
        )}
          {type === "videos" &&(
          <h1 className="h-9 text-[25px] font-bold text-tkh-brand-tangerine-5">
            Videos
          </h1>
        )}
        <AddButton
          title={type}
          handleOrgFormRendering={handleOrgFormRendering}
          handleSkillFormRendering={handleSkillFormRendering}
          handleVideoFormRendering={handleVideoFormRendering}
          handleResourceFormRendering={handleResourceFormRendering}
        />
      </div>
      {(type !== "videos") && (type !== "resources") && (
        <div className="flex flex-col lg:flex-row justify-start ">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3 lg:w-3/2">
              <div class="text-sm font-medium text-center">
                  <ul class="grid grid-cols-4 -mb-px d-inline">
                    {buttons.map((button, index) => (
                      <li className="mr-3 text-xl flex items-center">
                        <a className={
                            "inline-flex font-[700] capitalize items-center p-4  rounded-t-lg " +
                            (activeButton == button
                              ? " border-b-2 text-tkh-brand-tangerine-5 shadow-sm bg-grayscale-6 border-tkh-brand-tangerine-5"
                              : "border-transparent  hover:border-b-2 text-tkh-grayscale-10 hover:text-tkh-brand-tangerine-5 ")
                          }
                          onClick={(e) => handleActiveButton(button)}
                        >
                          {button}
                          
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
      )}
      {type === "videos" && (
        <div className="pt-0 pb-4 pl-0 w-full h-[40vh] overflow-auto">
        <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff]">
          <thead className="text-xs md:text-m xl:text-l uppercase z-5 sticky top-0 bg-white">
            <tr className="border-b text-tkh-grayscale-5">
              {(archived === true )&&(
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                  Delete
                </th>
              )}
              {type === "videos" && (
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                
                </th>
              )}
              <th 
                scope="col"
                className="px-3 py-3 text-left "
              >
                Name
              </th>
                <th
                  scope="col"
                  className="m-auto w-1/5 text-left font-bold  px-3"
                >
                {type === "videos" ? "Upload Date" : "Request Date"}
                </th>
            
              
              {type !== "orgs" && (
                <>
                  
                  <th
                    scope="col"
                    className="m-auto w-1/5 text-left font-bold  px-3"
                  >
                    Org
                  </th>
                  {type !== "videos" && (type !== "resources") && (
                  <th
                    scope="col"
                    className="m-auto w-1/5 text-left font-bold  px-3"
                  >
                    Sign-ups
                  </th>
                  )}
                </>
              
              )}{approved === true && (
                <>
                <th
                  scope="col"
                  className="m-auto w-1/12 text-left  px-3"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="m-auto w-1/12 text-left  font-bold px-3"
                >
                  Archive
                </th>
                </>
              )}
              {type === "videos" && (
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                
                </th>
              )}
              { (approved === false) &&( archived === false)&& (rejected==false) && (type !== "videos" )&& (type !== "resources") && (
              <>
                <th
                  scope="col"
                  className="m-auto w-1/12 text-left  font-bold px-3"
                >
                  Approve
                </th>
                < th
                  scope="col"
                  className="m-auto w-1/12 text-left  font-bold  px-3"
                >
                  Reject
                </th>
                </>
              )}{ archived === true && (

                <th
                  scope="col"
                  className="m-auto w-1/12 text-left  font-bold  px-3"
                >
                  Unarchive
                </th>
              )}{rejected === true && (
                <>
          
                <th
                  scope="col"
                  className="m-auto w-1/12 text-left  font-bold px-3"
                >
                  Archive
                </th>
                </>
              )}
              
            </tr>
          </thead>

          {(type === "events") && (
            <BxdpRequestedEventsList archived={archived} rejected={rejected} setEvents={setEvents} approved={approved}  events={events} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} />
          )}
          {type === "programs" && (
            <BxdpRequestedProgramsList archived={archived} rejected={rejected} setPrograms={setPrograms} approved={approved} programs={programs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
          )}
          {type === "orgs" && (
            <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
          )}
          {type === "resources" && (
            <BxdpRequestedResourceList archived={archived} rejected={rejected} setResources={setResources} approved={approved} resources={resources} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            // <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
          )}
          {type === "videos" && (
              <BxdpRequestedVideosList handleEditVideoFormRendering={handleEditVideoFormRendering}  archived={archived} rejected={rejected} setVideos={setVideos} approved={approved} videos={videos} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} editVideoModalRendered={editVideoModalRendered} isEditVideoModalRendered={isEditVideoModalRendered}/>
          )}
        </table>
      </div>
      )}
      {type === "resources" && (
        <div className="pt-0 pb-4 pl-0 w-full h-[176px] overflow-auto">
          <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff] ">
            <thead className="text-xs md:text-m xl:text-l uppercase z-5 sticky top-0 bg-white">
              <tr className="border-b text-tkh-grayscale-5">
                {(archived === true )&&(
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                    Delete
                  </th>
                )}
                {type === "videos" && (
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                  
                  </th>
                )}
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                  Name
                </th>
                  <th
                    scope="col"
                    className="m-auto w-1/5 text-left font-bold  px-3"
                  >
                  Upload Date
                  </th>
                  <th
                    scope="col"
                    className="m-auto w-1/5 text-left font-bold  px-3"
                  >
                  Organization
                  </th>
              
                
                
                
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                  
                  </th>
     
              
                  
                
                
              </tr>
            </thead>

            {(type === "events") && (
              <BxdpRequestedEventsList archived={archived} rejected={rejected} setEvents={setEvents} approved={approved}  events={events} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} />
            )}
            {type === "programs" && (
              <BxdpRequestedProgramsList archived={archived} rejected={rejected} setPrograms={setPrograms} approved={approved} programs={programs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "orgs" && (
              <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "resources" && (
              <BxdpRequestedResourceList archived={archived} rejected={rejected} setResources={setResources} approved={approved} resources={resources} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
              // <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "videos" && (
                <BxdpRequestedVideosList archived={archived} rejected={rejected} setVideos={setVideos} approved={approved} videos={videos} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} editVideoModalRendered={editVideoModalRendered} isEditVideoModalRendered={isEditVideoModalRendered}/>
            )}
          </table>
        </div>
      )}
      {type !== "videos" && (type !== "resources") && (
        <div className="pt-0 pb-4 pl-0 w-full h-[176px] overflow-auto">
          <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff] ">
            <thead className="text-xs md:text-m xl:text-l uppercase z-10 sticky top-0 bg-white">
              <tr className="border-b text-tkh-grayscale-5">
                {(archived === true )&&(
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                    Delete
                  </th>
                )}
                {type === "videos" && (
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                  
                  </th>
                )}
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                  Name
                </th>
                  <th
                    scope="col"
                    className="m-auto w-1/5 text-left font-bold  px-3"
                  >
                  {type === "videos" ? "Upload Date" : "Request Date"}
                  </th>
              
                
                {type !== "orgs" && (
                  <>
                    
                    <th
                      scope="col"
                      className="m-auto w-1/5 text-left font-bold  px-3"
                    >
                      Org
                    </th>
                    {type !== "videos" && (type !== "resources") && (
                    <th
                      scope="col"
                      className="m-auto w-1/5 text-left font-bold  px-3"
                    >
                      Sign-ups
                    </th>
                    )}
                  </>
                
                )}{approved === true && (
                  <>
                  <th
                    scope="col"
                    className="m-auto w-1/12 text-left  px-3"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="m-auto w-1/12 text-left  font-bold px-3"
                  >
                    Archive
                  </th>
                  </>
                )}
                {type === "videos" && (
                  <th 
                    scope="col"
                    className="px-3 py-3 text-left "
                  >
                  
                  </th>
                )}
                { (approved === false) &&( archived === false)&& (rejected==false) && (type !== "videos" )&& (type !== "resources") && (
                <>
                  <th
                    scope="col"
                    className="m-auto w-1/12 text-left  font-bold px-3"
                  >
                    Approve
                  </th>
                  < th
                    scope="col"
                    className="m-auto w-1/12 text-left  font-bold  px-3"
                  >
                    Reject
                  </th>
                  </>
                )}{ archived === true && (

                  <th
                    scope="col"
                    className="m-auto w-1/12 text-left  font-bold  px-3"
                  >
                    Unarchive
                  </th>
                )}{rejected === true && (
                  <>
            
                  <th
                    scope="col"
                    className="m-auto w-1/12 text-left  font-bold px-3"
                  >
                    Archive
                  </th>
                  </>
                )}
                
              </tr>
            </thead>

            {(type === "events") && (
              <BxdpRequestedEventsList archived={archived} rejected={rejected} setEvents={setEvents} approved={approved}  events={events} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} />
            )}
            {type === "programs" && (
              <BxdpRequestedProgramsList archived={archived} rejected={rejected} setPrograms={setPrograms} approved={approved} programs={programs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "orgs" && (
              <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "resources" && (
              <BxdpRequestedResourceList archived={archived} rejected={rejected} setResources={setResources} approved={approved} resources={resources} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
              // <BxdpRequestedOrgsList archived={archived} rejected={rejected} setOrgs={setOrgs} approved={approved} orgs={orgs} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData}/>
            )}
            {type === "videos" && (
                <BxdpRequestedVideosList archived={archived} rejected={rejected} setVideos={setVideos} approved={approved} videos={videos} handleRejectFormRendering={handleRejectFormRendering} setRejectData={setRejectData} rejectData={rejectData} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} editVideoModalRendered={editVideoModalRendered} isEditVideoModalRendered={isEditVideoModalRendered}/>
            )}
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default BxdpRequestsView;
