import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RequestedEventsList from "./OrgRequestedEventsList";
import RequestedProgramsList from "./OrgRequestedProgramsList";
import RequestedResourcesList from "./OrgRequestedResourcesList";
import RequestedVideosList from "./OrgRequestedVideosList";
import AddButton from "./AddButton";
import cookie from "js-cookie";

const BxdpRequestsView = ({  programs,height,height2,events,handleOrgFormRendering ,handleVideoFormRendering, resources, setResources, videos, setVideos, type, handleResourceFormRendering, handleEditVideoFormRendering }) => {
  const dispatch = useDispatch();

  const buttons = ["requests", "approved","rejected"];
  const [activeButton, setActiveButton] = useState("requests");
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);

  function handleActiveButton(button) {

    setActiveButton(button);

    if(button === "rejected"){
      setRejected(true);
      setApproved(false);
    }
    if(button === "approved"){
      setApproved(true);
      setRejected(false);
    }
    if(button === "requests"){
      setRejected(false);
      setApproved(false);
    }
    cookie.set("active", button);
  }


  return (
    <div className={`h-[${height}] pb-2 w-full  border-tkh-grayscale-7  rounded-md shadow-lg`}>
    <div className=" border-collapse px-[30px] pb-[60px] pt-[30px] ">
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
          handleVideoFormRendering={handleVideoFormRendering}
          handleResourceFormRendering={handleResourceFormRendering}
        />
      </div>
      {type !== "videos" && type !== "resources" && (
        <div className="flex flex-col lg:flex-row justify-start ">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3 lg:w-3/2">
              <div class="text-sm font-medium text-center">
                  <ul class="grid grid-cols-4 -mb-px d-inline">
                    {buttons.map((button, index) => (
                      <li key={index} className="mr-3 text-xl flex items-center">
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
       <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff] ">
         <thead className="text-xs md:text-m xl:text-l uppercase z-5 sticky top-0 bg-white border-b border-solid border-tkh-grayscale-5">  
           <tr className="border-b text-tkh-grayscale-5">
             <th scope="col"/>
             <th 
               scope="col"
               className="px-3 py-3 text-left "
             >
               Name
             </th>

             <th
               scope="col"
               className="px-3 py-3 text-left "
             >
                {type === "videos" ? "Upload Date" : "Request Date"}
             </th>
             {/* {type === "videos" && (
               <th 
                 scope="col"
                 className="px-3 py-3 text-left "
               >
                 Status
               </th>
             )} */}
             
               
             {(type !== "orgs")&&(rejected==false)&&(type !== "videos")  && (
                 <>
                   <th
                     scope="col"
                     className="px-3 py-3 text-left "
                   >
                     Sign-ups
                   </th>
                 </>
               )}
               {(rejected==true)  && (
                 <>
                   <th
                     scope="col"
                     className="px-3 py-3 text-left "
                   >
                     Reason
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
           </tr>
         </thead>

         {type === "events" && (
           <RequestedEventsList approved={approved} rejected={rejected} events={events}/>
         )}
         {type === "programs" && (
           <RequestedProgramsList approved={approved} rejected={rejected} programs={programs}/>
         )}
         {type === "resources" && (
          <RequestedResourcesList  resources={resources}/>
         )}
         {type === "videos" && (
           <RequestedVideosList approved={approved} rejected={rejected} videos={videos} handleEditVideoFormRendering={handleEditVideoFormRendering}/>
         )}
       </table>
     </div>
      )}
      { type === "resources" && (
       <div className="pt-0 pb-4 pl-0 w-full h-[40vh] overflow-auto">
       <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff] ">
         <thead className="text-xs md:text-m xl:text-l uppercase z-5 sticky top-0 bg-white border-b border-solid border-tkh-grayscale-5">  
           <tr className="border-b text-tkh-grayscale-5">
             <th 
               scope="col"
               className="px-3 py-3 text-left "
             >
               Name
             </th>

             <th
               scope="col"
               className="px-3 py-3 text-left "
             >
                Upload Date
             </th>

               <th 
                 scope="col"
                 className="px-3 py-3 text-left "
               >
                 Organization
               </th>
             
               
             
           </tr>
         </thead>

         {type === "events" && (
           <RequestedEventsList approved={approved} rejected={rejected} events={events}/>
         )}
         {type === "programs" && (
           <RequestedProgramsList approved={approved} rejected={rejected} programs={programs}/>
         )}
         {type === "resources" && (
          <RequestedResourcesList  resources={resources}/>
         )}
         {type === "videos" && (
           <RequestedVideosList approved={approved} rejected={rejected} videos={videos} handleEditVideoFormRendering={handleEditVideoFormRendering}/>
         )}
       </table>
     </div>
      )}
      {type !== "videos" && type !== "resources" && (
      <div className="pt-0 pb-4 pl-0 w-full h-[176px] overflow-auto">
        <table className="w-full border-collapse border-tkh-grayscale-5 bg-[#fff] ">
          <thead className="text-xs md:text-m xl:text-l uppercase z-5 sticky top-0 bg-white border-b border-solid border-tkh-grayscale-5">  
            <tr className="border-b text-tkh-grayscale-5">
              <th scope="col"/>
              <th 
                scope="col"
                className="px-3 py-3 text-left "
              >
                Name
              </th>

              <th
                scope="col"
                className="px-3 py-3 text-left "
              >
                 {type === "videos" ? "Upload Date" : "Request Date"}
              </th>
              {/* {type === "videos" && (
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                  Status
                </th>
              )} */}
              
                
              {(type !== "orgs")&&(rejected==false)&&(type !== "videos")  && (
                  <>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left "
                    >
                      Sign-ups
                    </th>
                  </>
                )}
                {(rejected==true)  && (
                  <>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left "
                    >
                      Reason
                    </th>
                  </>
                )}
                  {(type === "videos" || type === "resources") && (
                <th 
                  scope="col"
                  className="px-3 py-3 text-left "
                >
                
                </th>
              )}  
            </tr>
          </thead>

          {type === "events" && (
            <RequestedEventsList approved={approved} rejected={rejected} events={events}/>
          )}
          {type === "programs" && (
            <RequestedProgramsList approved={approved} rejected={rejected} programs={programs}/>
          )}
          {type === "resources" && (
           <RequestedProgramsList approved={approved} rejected={rejected} programs={programs}/>
          )}
          {type === "videos" && (
            <RequestedVideosList approved={approved} rejected={rejected} videos={videos} handleEditVideoFormRendering={handleEditVideoFormRendering}/>
          )}
        </table>
      </div>
      )}
    </div>
    </div>
  );
};

export default BxdpRequestsView;
