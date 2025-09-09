import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/sharedComponents/FooterAlt";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import OrgDashboardManagementView from "../../components/orgComponents/OrgDashboardManagementView";
import OrgReportsView from "../../components/orgComponents/OrgReportView";
import {AddStaffModal} from "../../components/orgComponents/AddStaffModal";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { getAllPrograms } from "../../redux/programs/fetchAllProgramsSlice";
import { getAllEvents } from "../../redux/events/fetchAllEventsSlice";
import { orgAdminInviteStatus } from "../../redux/org/inviteOrgAdminSlice";
import { orgManagerInviteStatus } from "../../redux/org/inviteOrgManagerSlice";
import { orgUserInviteStatus } from "../../redux/org/inviteOrgUserSlice";
import { getResourceList } from "../../redux/resources/fetchAllResourcesSlice";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import { changeVideo } from "../../redux/videos/updateVideoSlice";
import { createVideo } from "../../redux/videos/newVideoSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddVideoModal } from "../../components/orgComponents/AddVideoModal";
import { EditVideoModal } from "../../components/orgComponents/EditVideoModal";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import cookie from "js-cookie";



function BxdpDashboard() {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const user_id = cookie.get("userId");  
  const isOrgAdmin = cookie.get("isOrgAdmin");
  const programsList = useSelector((state) => state?.getAllPrograms);
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const eventsList = useSelector((state) => state?.getAllEvents);
  const [orgs, setOrgs] = useState([]);
  const orgId = cookie.get("orgId");
  const orgList = useSelector((state) => state?.getAllOrgs);
  const resourceList = useSelector((state) => state?.getResourceList);
  const videoList = useSelector((state) => state?.getAllVideos);
  const [resources, setResources] = useState([]);
  const [videos, setVideos] = useState([]);
  const [image, setImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const [tags, setTags] = useState(null);
  const [tag2, setTag2] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [modalTagRendered, isModalTagRendered] = useState(false);
  const buttons = ["requests", "approved"];
  const [activeButton, setActiveButton] = useState("requests");
  const [modalRendered, isModalRendered] = useState(false);
  const [videoModalRendered, isVideoModalRendered] = useState(false);
  const [editVideoModalRendered, isEditVideoModalRendered] = useState(false);
  const [resourceModalRendered, isResourceModalRendered] = useState(false);
  const [orgModalRendered, isOrgModalRendered] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    name: "",
    link: "",
    description: "",
  });
  const [editVideoFormData, setEditVideoFormData] = useState({
    name: "",
    org_id: "",
    description: "",
    link: "",
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isUpdatingVideo, setIsUpdatingVideo] = useState(false);
  const [updateVideoError, setUpdateVideoError] = useState(null);

  const [videoErrors, setVideoErrors] = useState({
    name: false,
    description: false,
    link: false,
    image: false,
    tags: false,
  });
  const [tagFormData, setTagFormData] = useState({
    name: "",
  });
  

  const [invitedUserData, setInvitedUserData] = useState({
    org_id: orgId,
    firstName: "",
    lastName: "",
    email: "",
    isOrgAdmin: false,
    isOrgUser: true,
  });


  function setOptions(allTags) {
    return allTags.map((tag) => ({
      value: tag.tag_id,
      label: tag.name,
    }));
  }
  function formatTags(tags) {
    return tags.map((tag) => ({
      tag_id: tag.value,
      name: tag.label,
    }));
  } 

  console.log("videos", videos);

  useEffect(() => {
    dispatch(getAllOrgs({ userToken }));
    dispatch(getAllPrograms({ user_id }));
    dispatch(getAllEvents({ user_id }));
    dispatch(getResourceList({ user_id }));
    dispatch(getVideoList({ userToken }));
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    if (programsList?.status == "success" && eventsList?.status == "success"  ) {
      setPrograms(programsList?.programs);
      setEvents(eventsList?.events);
      setOrgs(orgList?.orgs?.allOrgs);
      setResources(resourcesList?.resourceList);
      setVideos(videosList?.userList);
      setAllTags(tagList?.tags?.tags);
      setList(setOptions(tagList?.tags?.tags))
    }
  }, [programsList, eventsList, orgList, resourceList, videoList]);


  function handleActiveButton(button) {

    setActiveButton(button);
    cookie.set("active", button);
  }

  function handleStaffFormRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }
  
  function handleTagFormRendering(event) {
    event.preventDefault();
    modalTagRendered ? isModalTagRendered(false) : isModalTagRendered(true);
  }
  const handleVideoFormRendering = (event) => {
    event.preventDefault();
    videoModalRendered ? isVideoModalRendered(false) : isVideoModalRendered(true);
  };

  const handleEditVideoFormRendering = (event, video) => {
    event.preventDefault();
    editVideoModalRendered ? isEditVideoModalRendered(false) : isEditVideoModalRendered(true);
    if (editVideoModalRendered === false) {
      // Clear any previous errors
      setUpdateVideoError(null);
      setVideoErrors({
        name: false,
        org_id: false,
        description: false,
        link: false,
        tags: false,
        image: false,
      });
      
      // Set the selected video
      setSelectedVideo(video);
      
      // Initialize form data with video values
      setEditVideoFormData({
        name: video.name || "",
        org_id: video.org_id || "",
        link: video.link || "",
        description: video.description || "",
      });
      
      // Set the image if it exists
      if (video.image_url) {
        setImage(video.image_url);
      }
      
      // Set the tags if they exist
      if (video.tags && video.tags.length > 0) {
        const videoTags = video.tags.map(tag => ({
          value: tag.tag_id,
          label: tag.name
        }));
        setTags(videoTags);
        setTag2(videoTags);
      }
    }
  };
  function handleOrgFormRendering(event) {
    event.preventDefault();
    orgModalRendered ? isOrgModalRendered(false) : isOrgModalRendered(true);
  }
  function handleResourceFormRendering(event) {
    event.preventDefault();
    resourceModalRendered ? isResourceModalRendered(false) : isResourceModalRendered(true);
  }

  const inviteUser = (event) => {
    event.preventDefault();
    const {
      org_id,
      firstName,
      lastName,
      email,
      isOrgAdmin,
      isOrgUser,
    } = invitedUserData;
    if (isOrgAdmin) {
      dispatch(
        orgAdminInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    } else {
      dispatch(
        orgUserInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    }
  };

  const handleVideoFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      name: !videoFormData.name,
      description: !videoFormData.description,
      link: !videoFormData.link,
      tags: !tag2.length>=1,
      image: !image,
    };

    setVideoErrors(newErrors);  
    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid) {
      dispatch(createVideo({
        name: videoFormData.name,
        org_id: orgId,
        description: videoFormData.description,
        link: videoFormData.link,
        image: image,
        tags: tag2,
      })).then(() => {  
        return window.location.reload(true);
      });
    }
  };

  const handleEditVideoFormSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous errors
    setUpdateVideoError(null);
    
    // Validate form data
    const newErrors = {
      name: !editVideoFormData.name || editVideoFormData.name.trim() === "",
      org_id: !editVideoFormData.org_id,
      description: !editVideoFormData.description || editVideoFormData.description.trim() === "",
      link: !editVideoFormData.link || editVideoFormData.link.trim() === "",
      tags: !tag2 || tag2.length < 1,
      image: !image,
    };
    
    setVideoErrors(newErrors);  
    const isValid = !Object.values(newErrors).some(error => error);
    
    if (isValid) {
      setIsUpdatingVideo(true);
      
      try {
        // Format tags for API
        const formattedTags = tag2?.map(tag => ({
          tag_id: tag.value,
          name: tag.label,
        })) || [];

        const result = await dispatch(changeVideo({
          video_id: selectedVideo.video_id,
          name: editVideoFormData.name.trim(),
          org_id: editVideoFormData.org_id,
          description: editVideoFormData.description.trim(),
          link: editVideoFormData.link.trim(),
          image: image,
          tags: formattedTags,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
          alert("Video updated successfully");
          handleEditVideoFormRendering(event);
          // Refresh the page to show updated data
          window.location.reload(true);
        } else {
          setUpdateVideoError("Failed to update video. Please try again.");
        }
      } catch (error) {
        console.error("Error updating video:", error);
        setUpdateVideoError("An error occurred while updating the video. Please try again.");
      } finally {
        setIsUpdatingVideo(false);
      }
    } else {
      setUpdateVideoError("Please fill in all required fields correctly.");
    }
  };

  function handleTagFormSubmit(event) {
    event.preventDefault();
    dispatch(
      createTag({
        name: tagFormData.name,
      })
    ).then((data) => {
      let arr = []
      allTags.map((x)=>{
        arr.push(x)
      })
      arr.push(data.payload.tag)
      setTagFormData({
        ...tagFormData,
        name: "",
      });
      setAllTags(arr)
      handleTagFormRendering(event)
    });
    }  
    const handleChange = (value) => {
      try {
        setTags(value);
        setTag2(formatTags(value));
        if ( videoErrors.tags) {
          setVideoErrors(prev => ({
            ...videoErrors,
            tags: false
          }));
        }
      } catch (error) {
       alert(error.message) ;
      }
    };

  if (programsList?.status == "success" && eventsList?.status == "success") {
    return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <AddStaffModal
        firstName={invitedUserData.firstName}
        lastName={invitedUserData.lastName}
        email={invitedUserData.email}
        isOrgAdmin={invitedUserData.isOrgAdmin}
        isOrgManager={invitedUserData.isOrgManager}
        isOrgUser={invitedUserData.isOrgUser}
        invitedUserData={invitedUserData}
        setInvitedUserData={setInvitedUserData}
        inviteUser={inviteUser}
        modalRendered={modalRendered}
        handleStaffFormRendering={handleStaffFormRendering}
      />
      <main className="flex flex-col justify-center gap-7 h-full mx-3 md:mx-7 lg:mx-10 xl:mx-16 py-10">
         <header className="flex flex-col justify-center text-center lg:text-start gap-[24px]"> 
          <h1 className="text-5xl font-bold leading-tight ">
            Reports
          </h1>
          {/* <h3 className="text-2xl font-base text-tkh-grayscale-8 leading-tight ">
            {`Welcome ${cookie.get(
              "firstName"
            )} ${cookie.get("lastName")}`}
          </h3>
          <div className="flex flex-col lg:flex-row justify-start ">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3 lg:w-3/2">
              <div class="text-sm font-medium text-center">
                  <ul class="flex flex-wrap -mb-px">
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
          </div> */}
        </header>
        <AddVideoModal
          videoFormData={videoFormData}
          setVideoFormData={setVideoFormData}
          handleVideoFormSubmit={handleVideoFormSubmit}
          videoModalRendered={videoModalRendered}
          handleVideoFormRendering={handleVideoFormRendering}
          videoErrors={videoErrors}
          setVideoErrors={setVideoErrors}
          tags={tags}
          list={list}
          handleChange={handleChange}
          handleTagFormRendering={handleTagFormRendering}
          image={image}
          setImage={setImage}
        />
        <EditVideoModal
          videoFormData={editVideoFormData}
          handleEditVideoFormRendering={handleEditVideoFormRendering}
          setVideoFormData={setEditVideoFormData}
          handleVideoFormSubmit={handleEditVideoFormSubmit}
          videoErrors={videoErrors}
          setVideoErrors={setVideoErrors}
          videoModalRendered={editVideoModalRendered}
          tags={tags}
          list={list}
          handleChange={handleChange}
          handleTagFormRendering={handleTagFormRendering}
          image={image}
          setImage={setImage}
          isUpdatingVideo={isUpdatingVideo}
          updateVideoError={updateVideoError}
        />
        <OrgDashboardManagementView 
          programs={programs}
          events={events}
          resources={resources}
          setResources={setResources}
          handleStaffFormRendering={handleStaffFormRendering}
          videos={videos}
          setVideos={setVideos}
          handleOrgFormRendering={handleOrgFormRendering}
          handleVideoFormRendering={handleVideoFormRendering}
          handleEditVideoFormRendering={handleEditVideoFormRendering}
        />

        <OrgReportsView
          events={events}
          setEvents={setEvents}
          programs={programs}
          setPrograms={setPrograms}
        />
      </main>
      <Footer />
    </div>
  );
  }
}


export default BxdpDashboard;
