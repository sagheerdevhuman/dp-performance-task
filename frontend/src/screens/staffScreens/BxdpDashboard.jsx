import Footer from "../../components/sharedComponents/FooterAlt";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import BxdpDashboardManagementView from "../../components/staffComponents/BxdpDashboardManagementView";
import BxdpReportsView from "../../components/staffComponents/BxdpReportsView";
import { AddSkillModal } from "../../components/orgComponents/AddSkillModal";
import { AddVideoModal } from "../../components/staffComponents/addVideoModal";
import { EditVideoModal } from "../../components/staffComponents/editVideoModal";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { getResourceList } from "../../redux/resources/fetchAllResourcesSlice";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import { orgInviteStatus } from "../../redux/org/inviteOrgSlice";
import { createSkill } from "../../redux/skills/newSkillSlice";
import { AddStaffModal } from "../../components/staffComponents/AddStaffModal";
import { RejectModal } from "../../components/staffComponents/RejectModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { programRejectionStatus } from "../../redux/programs/rejectProgramSlice";
import { orgRejectionStatus } from "../../redux/org/rejectOrgSlice";
import { eventRejectionStatus } from "../../redux/events/rejectEventSlice";
import { getAllPrograms } from "../../redux/programs/fetchAllProgramsSlice";
import { programApprovalStatus } from "../../redux/programs/approveProgramSlice";
import { getAllEvents } from "../../redux/events/fetchAllEventsSlice";
import { eventApprovalStatus } from "../../redux/events/approveEventSlice";
import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { orgAdminInviteStatus } from "../../redux/org/inviteOrgAdminSlice";
import { orgManagerInviteStatus } from "../../redux/org/inviteOrgManagerSlice";
import { orgUserInviteStatus } from "../../redux/org/inviteOrgUserSlice";
import { bxdpAdminInviteStatus } from"../../redux/bxdp/inviteBxdpAdminSlice";
import { changeVideo } from "../../redux/videos/updateVideoSlice";
import { createVideo } from "../../redux/videos/newVideoSlice";
import { createResource } from "../../redux/resources/newResourceSlice";
import { changeResource } from "../../redux/resources/updateResourceSlice";
import { AddRescourceModal } from "../../components/staffComponents/AddResourceModal";
import { metaAdminInviteStatus } from"../../redux/bxdp/inviteMetaAdminSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { removeVideo } from "../../redux/videos/deleteVideoSlice";
import { removeResource } from "../../redux/resources/deleteResourceSlice";
import {fetchCategories} from "../../redux/categories/getCategoriesSlice";
import { AddCategoryModal } from "../../components/staffComponents/AddCategoryModal";
import { createCategory } from "../../redux/categories/addCategorySlice";
import cookie from "js-cookie";




function BxdpDashboard() {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const user_id = cookie.get("userId");  
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const orgId = cookie.get("orgId");
  const programsList = useSelector((state) => state?.getAllPrograms);
  const resourcesList = useSelector((state) => state?.getAllResources);
  const videosList = useSelector((state) => state?.getAllVideos);
  const categoriesList = useSelector((state) => state?.getAllCategories);
  const [image, setImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [id, setId] = useState(null);
  const [resources, setResources] = useState([]);
  const [videos, setVideos] = useState([]);
  const eventsList = useSelector((state) => state?.getAllEvents);
  const [orgs, setOrgs] = useState([]);
  const orgList = useSelector((state) => state?.getAllOrgs);
  const [members, setMembers] = useState([]);
  const userList = useSelector((state) => state?.getUserList);
  const [ skills, setSkills ] = useState([]);
  const [rejectData, setRejectData] = useState({
    id:"",
    reason: "",
    type: "",
  });
  const [rejectErrors, setRejectErrors] = useState({  
    reason: false,
  });
  const skillList = useSelector((state) => state?.getAllSkills);
  const [invitedUserData, setInvitedUserData] = useState({
    org_id: orgId,
    firstName: "",
    lastName: "",
    email: "",
    isOrgAdmin: false,
    isOrgManager: false,
    isOrgUser: false,
    isMetaAdmin: false,
    isBxdpAdmin: true,
  });

  const [editVideoFormData, setEditVideoFormData] = useState({
    name: "",
    org_id: "",
    description: "",
    link: "",
  });
  const [isUpdatingVideo, setIsUpdatingVideo] = useState(false);
  const [updateVideoError, setUpdateVideoError] = useState(null);
  
  const [invitedErrors, setInvitedErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [videoFormData, setVideoFormData] = useState({
    name: "",
    org_id: "",
    link: "",
    description: "",
  });
  const [videoErrors, setVideoErrors] = useState({
    name: false,
    orgId: false,
    description: false,
    link: false,
    image: false,
    tags: false,
  });
  

  const [tagFormData, setTagFormData] = useState({
    name: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
    const [resourceFormData, setResourceFormData] = useState({
    org_id: "",
    title: "",
    description: "",
    location: "",
    link: "",
    provider: "",
    is_platform_wide: false,
    is_active: true,
  });
  const [resourceErrors, setResourceErrors] = useState({
    org_id: false,
    title: false, 
    description: false,
    location: false,
    link: false,
    tags: false,
    provider: false,
    is_platform_wide: false,
    is_active: false,
    categories: false,
  }); 
  

  const buttons = ["requests", "approved","rejected","archived"];
  const [activeButton, setActiveButton] = useState("requests");
  const [modalRendered, isModalRendered] = useState(false);
  const [modalSkillRendered, isModalSkillRendered] = useState(false);
  const [staffModalRendered, isStaffModalRendered] = useState(false);
  const [rejectModalRendered, isRejectModalRendered] = useState(false);
  const [videoModalRendered, isVideoModalRendered] = useState(false);
  const [resourceModalRendered, isResourceModalRendered] = useState(false);
  const [editVideoModalRendered, isEditVideoModalRendered] = useState(false);
  const [modalCategoryRendered, isModalCategoryRendered] = useState(false);
  const [tags, setTags] = useState(null);
  const [tag2, setTag2] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [modalTagRendered, isModalTagRendered] = useState(false);
  const [categories, setCategories] = useState(null);
  const [categories2, setCategories2] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const categoryList = useSelector((state) => state?.getCategories);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const options=[ {txt:"Org Staff"},{txt:"Org Manager"},{txt:"Org Admin"},{txt:"Meta Admin"},{txt:"DP Admin"}]

  console.log("categoryList",categoryList)   
  const [formData, setFormData] = useState({
    orgName: "",
    orgAdminFirstName: "",
    orgAdminLastName: "",
    orgAdminEmail: "",
  });

  const [skillFormData, setSkillFormData] = useState({
    name: "",
    discription: "",
  });
  const [skillErrors, setSkillErrors] = useState({
    name: false,
    discription: false,
  });


  const inviteUser = (event) => {
    event.preventDefault(event);
    const {
      org_id,
      firstName,
      lastName,
      email,
      isOrgAdmin,
      isOrgManager,
      isOrgUser,
      isMetaAdmin,
      isBxdpAdmin,
    } = invitedUserData;

    const newErrors = {
      firstName: !lastName,
      lastName: !email,
      email: !email,
    };

    setInvitedErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);
    
    if (isOrgAdmin && isValid) {
      dispatch(
        orgAdminInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgManager,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    } else if (isOrgManager && isValid) {
      dispatch(
        orgManagerInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgManager,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    } else if(isOrgUser && isValid){
      dispatch(
        orgUserInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgManager,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    }else if(isMetaAdmin && isValid){
      dispatch(
         metaAdminInviteStatus({
          firstName: firstName,
          lastName: lastName,
          email: email,
          isMetaAdmin: isMetaAdmin,
          isBxdpAdmin: isBxdpAdmin,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    }else if (isValid){
      dispatch(
         bxdpAdminInviteStatus({
          firstName: firstName,
          lastName: lastName,
          email: email,
          isMetaAdmin: isMetaAdmin,
          isBxdpAdmin: isBxdpAdmin,
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
      org_id: !videoFormData.org_id,
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
        org_id: videoFormData.org_id,
        description: videoFormData.description,
        link: videoFormData.link,
        image: image,
        tags: tag2,
      })).then(() => {  
        alert("Video added successfully");
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

  const handleResourceFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      org_id: !resourceFormData.org_id,
      title: !resourceFormData.title,
      description: !resourceFormData.description,
      location: !resourceFormData.location,
      link: !resourceFormData.link,
      categories: !categories2,
    };
    setResourceErrors(newErrors);
    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid) {
      dispatch(createResource({
        user_id: user_id,
        org_id: resourceFormData.org_id,
        title: resourceFormData.title,
        description: resourceFormData.description,
        location: resourceFormData.location,
        link: resourceFormData.link,
        tags: tag2,
        photo: image,
        categories: categories2,
        provider: resourceFormData.provider,  
        is_platform_wide: resourceFormData.is_platform_wide,
        is_active: resourceFormData.is_active,
      })).then(() => {
        alert("Resource added successfully");
        return window.location.reload(true);
      });
    }
  };

  const handleRejectFormSubmit = (event) => {
    event.preventDefault(event);
    var {
      id,
      reason,
      type
    } = rejectData;

    const newErrors = {
      reason: !reason,
    };

    setRejectErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);

    
    if (type=="org" && isValid) {
      dispatch(
        orgRejectionStatus({
          org_id:id,
          user_id,
          reason,
        })
      ).then(() => {
        alert("Org rejected!!!!");
        return window.location.reload(true);
      });
    } else if (type=="program"&& isValid) {
      dispatch(
        programRejectionStatus({
          program_id:id,
          user_id,
          reason,
        })
      ).then(() => {
        alert("Progam rejected!!!!");
        return window.location.reload(true);
      });
    } else if(type=="event" && isValid){
      dispatch(
        eventRejectionStatus({
          event_id:id,
          user_id,
          reason,
        })
      ).then(() => {
        alert("Event rejected!!!!");
        return window.location.reload(true);
      });
    }else {
        alert("no Type selected!!!");
    }
  };

  useEffect(() => {
    dispatch(getAllOrgs({ userToken }));
    dispatch(getAllPrograms({ user_id }));
    dispatch(getAllEvents({ user_id }));
    dispatch(getAllSkills({ userToken }));
    dispatch(getResourceList({ user_id }));
    dispatch(getVideoList({ userToken }));
    dispatch(getAllTags());
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (programsList?.status == "success" && eventsList?.status == "success" && resourcesList?.status == "success") {
      setPrograms(programsList?.programs);
      setEvents(eventsList?.events);
      setOrgs(orgList?.orgs?.allOrgs);
      setMembers(userList?.users);
      setSkills(skillList?.skills?.skills);
      setResources(resourcesList?.resourceList);
      setVideos(videosList?.userList);
      setAllTags(tagList?.tags?.tags);
      setList(setOptions(tagList?.tags?.tags))
      setAllCategories(categoryList?.categories);
      setCategoryOptions(setOptions2(categoryList?.categories));
    }
  }, [programsList, eventsList, orgList, skillList, resourcesList]);  
  async function reload(){
      await dispatch(getAllOrgs({ userToken }));
      await dispatch(getAllPrograms({ user_id }));
      await dispatch(getAllEvents({ user_id }));
      await dispatch(getResourceList({ user_id }));
      await dispatch(getVideoList({ userToken }));
      await dispatch(getAllTags());
      await dispatch(fetchCategories());
      if (programsList?.status == "success" && eventsList?.status == "success" ) {
        setPrograms(programsList?.programs);
        setEvents(eventsList?.events);
        setOrgs(orgList?.orgs?.allOrgs);
        setResources(resourcesList?.resources);
        setVideos(videosList?.videos);
        setAllTags(tagList?.tags?.tags);
        setList(setOptions(tagList?.tags?.tags))
      }
  } 
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
      // // const new_list = arr.push(data.payload.skill)
      setTagFormData({
        ...tagFormData,
        name: "",

      });
      setList(setOptions(arr))
      handleTagFormRendering(event)
    });
  }

  const handleChange = (value) => {
    try {
      if(value){
        setTags(value);
        setTag2(formatTags(value));
        if ( videoErrors.tags) {
          setVideoErrors(prev => ({
            ...videoErrors,
            tags: false
          }));
        }
      }
      else{
        setTags(null);
        setTag2(null);
      }
    } catch (error) {
      alert(error.message) ;
    }
  };

  function handleTagFormRendering(event) {
    event.preventDefault();
    modalTagRendered ? isModalTagRendered(false) : isModalTagRendered(true);
  }


  function setOptions2(allCategories) {
    console.log("allCategories",allCategories)
    if(allCategories){
    return allCategories.categories.map((category) => ({
      value: category.category_id,
      label: category.title,
    }));
  }else{
    return [];
  }
  }

  function formatCategories(category) {
    return {
      category_id: category.value,
      name: category.label,
    };
  } 

  function handleCategoryFormSubmit(event) {
    event.preventDefault();
    dispatch(
      createCategory({
        name: categoryFormData.name,
      })
    ).then((data) => {  
      let arr = []
      arr.push(data.payload.category)
      setCategoryFormData({
        ...categoryFormData,
        name: "",
      });
      setAllCategories(arr)
      handleCategoryFormRendering(event)
    }); 
  }
  
 
  const handleChange2 = (value) => {
    try {
      if(value){
        setCategories(value);
        setCategories2(formatCategories(value));
        if ( resourceErrors.categories) {
          setResourceErrors(prev => ({
            ...resourceErrors,
            categories: false
          }));
        }
      }
      else{
        setCategories(null);
        setCategories2(null);
      }
    } catch (error) {
      alert(error.message) ;
    }
  };
  
  function handleCategoryFormRendering(event) {
    event.preventDefault();
    modalCategoryRendered ? isModalCategoryRendered(false) : isModalCategoryRendered(true);
  }
 
  




  function handleActiveButton(button) {

    setActiveButton(button);
    cookie.set("active", button);
  }

  function handleOrgFormRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }
  // function handleEditVideoFormRendering(event) {
  //   event.preventDefault();

  //   editVideoModalRendered ? isEditVideoModalRendered(false) : isEditVideoModalRendered(true);
  //   if (editVideoModalRendered==false) {
  //     setEditVideoFormData({
  //       name: selectedVideo?.name || "",
  //       org_id: selectedVideo?.organization?.org_id || "",
  //       link: selectedVideo?.link || "",
  //       description: selectedVideo?.description || "",
  //     });
  //     // Set the organization dropdown value
  //     if (selectedVideo?.organization?.org_id) {
  //       const orgOption = orgs.find(org => org.org_id === selectedVideo.organization.org_id);
  //       if (orgOption) {
  //         setId({ value: orgOption.org_id, label: orgOption.name });
  //       }
  //     }
  //     // Set the image if it exists
  //     if (selectedVideo?.image_url) {
  //       setImage(selectedVideo.image_url);
  //     }
  //     // Set the tags if they exist
  //     if (selectedVideo?.tags && selectedVideo.tags.length > 0) {
  //       const videoTags = selectedVideo.tags.map(tag => ({
  //         value: tag.tag_id,
  //         label: tag.name
  //       }));
  //       setTags(videoTags);
  //       setTag2(videoTags);
  //     }
  //   }
  // }


  function handleStaffFormRendering(event) {
    event.preventDefault();
    staffModalRendered ? isStaffModalRendered(false) : isStaffModalRendered(true);
  }
  function handleStaffFormRendering(event) {
    event.preventDefault();
    staffModalRendered ? isStaffModalRendered(false) : isStaffModalRendered(true);
  }
  function handleRejectFormRendering(event){
    event.preventDefault();
    rejectModalRendered ? isRejectModalRendered(false) : isRejectModalRendered(true);
  }
  function handleSkillFormRendering(event) {
    event.preventDefault();
    modalSkillRendered ? isModalSkillRendered(false) : isModalSkillRendered(true);
  }
  const handleVideoFormRendering = (event) => {
    event.preventDefault();
    videoModalRendered ? isVideoModalRendered(false) : isVideoModalRendered(true);
  }
  const handleEditVideoFormRendering = (event,video) => {
    event.preventDefault();
    editVideoModalRendered ? isEditVideoModalRendered(false) : isEditVideoModalRendered(true);
    if (editVideoModalRendered==false) {
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
      
      setEditVideoFormData({
        name: video.name || "",
        org_id: video.org_id || "",
        link: video.link || "",
        description: video.description || "",
      });
      
      if (video.image_url) {
        setImage(video.image_url);
      }
      
      if (video.tags && video.tags.length > 0) {
        const videoTags = video.tags.map(tag => ({
          value: tag.tag_id,
          label: tag.name
        }));
        setTags(videoTags);
        setTag2(videoTags);
      }
    }
  }

  const handleResourceFormRendering = (event) => {
    event.preventDefault();
    resourceModalRendered ? isResourceModalRendered(false) : isResourceModalRendered(true);
  } 

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(
      orgInviteStatus({
        userToken,
        name: formData.orgName,
        firstName: formData.orgAdminFirstName,
        lastName: formData.orgAdminLastName,
        infoEmail: formData.orgAdminEmail,
      })
    ).then((data) => {
      console.log(data)
      if(!data.payload.invitedOrg){
        alert(data.payload.message);
      }else{
        setFormData({
          ...formData,
          orgName: "",
          orgAdminFirstName: "",
          orgAdminLastName: "",
          orgAdminEmail: "",
        });
        let arr = []
        orgs.map((x)=>{
          arr.push(x)
        })
        
        arr.push(data.payload.invitedOrg)
        setOrgs(arr)
        handleOrgFormRendering(event)
        alert("Organization has been invited");
      }
    });
  }

  function handleSkillFormSubmit(event) {
    event.preventDefault();

    const newErrors = {
      name: !skillFormData.name,
      description: !skillFormData.description
    };
    setSkillErrors(newErrors);
    const isValid = !Object.values(newErrors).some(error => error);
    
    if (isValid) {
      dispatch(
        createSkill({
          name: skillFormData.name,
          description: skillFormData.description,
        })
      ).then((data) => {
        let arr = []
        skills.map((x)=>{
          arr.push(x)
        })
        arr.push(data.payload.skill)
        // const new_list = arr.push(data.payload.skill)
        setSkillFormData({
          ...skillFormData,
          name: "",
          description: "",

        });
        setSkills(arr)
        handleStaffFormRendering(false)
      });
    }
  }
 
  if (programsList?.status == "success" && eventsList?.status == "success" && orgList?.status == "success" && resourcesList?.status == "success" ) {
    return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <main className="flex flex-col justify-center gap-7 h-full mx-3 md:mx-7 lg:mx-10 xl:mx-16 py-10">
        <header className="flex flex-col justify-center text-center lg:text-start gap-[24px] mt-[20px]"> 
          <h1 className="text-5xl font-bold leading-tight ">
            Reports
          </h1>
          {/* <div className="flex flex-col lg:flex-row justify-start ">
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
          </div> */}
        </header>

        {/*<InviteOrgForm
          modalRendered={modalRendered}
          handleOrgFormRendering={handleOrgFormRendering}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          formData={formData}
          setFormData={setFormData}
          handleFormSubmit={handleFormSubmit}
        />*/}
        <EditVideoModal
          videoFormData={editVideoFormData}
          handleVideoFormRendering={handleEditVideoFormRendering}
          setVideoFormData={setVideoFormData}
          handleVideoFormSubmit={handleEditVideoFormSubmit}
          videoErrors={videoErrors}
          setVideoErrors={setVideoErrors}
          videoModalRendered={editVideoModalRendered}
          isVideoModalRendered={isEditVideoModalRendered}
          setEditVideoFormData={setEditVideoFormData}
          selectedVideo={selectedVideo}
          id={id}
          setId={setId}
          orgs={orgs}
          tags={tags}
          list={list}
          handleChange={handleChange}
          handleTagFormRendering={handleTagFormRendering}
          image={image}
          setImage={setImage}
          isUpdatingVideo={isUpdatingVideo}
          updateVideoError={updateVideoError}
        />
        <AddVideoModal
          videoFormData={videoFormData}
          handleVideoFormRendering={handleVideoFormRendering}
          setVideoFormData={setVideoFormData}
          handleVideoFormSubmit={handleVideoFormSubmit}
          videoErrors={videoErrors}
          setVideoErrors={setVideoErrors}
          videoModalRendered={videoModalRendered}
          isVideoModalRendered={isVideoModalRendered}
          id={id}
          setId={setId}
          orgs={orgs}
          tags={tags}
          list={list}
          handleChange={handleChange}
          handleTagFormRendering={handleTagFormRendering}
          image={image}
          setImage={setImage}
        />
        <AddTagModal
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        handleTagFormRendering={handleTagFormRendering}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
      />
      {/* <AddCategoryModal
        categoryFormData={categoryFormData}
        setCategoryFormData={setCategoryFormData}
        handleCategoryFormSubmit={handleCategoryFormSubmit}
        handleCategoryFormRendering={handleCategoryFormRendering}
        modalCategoryRendered={modalCategoryRendered}
        isModalCategoryRendered={isModalCategoryRendered}
      />  */}
      <AddRescourceModal
        resourceFormData={resourceFormData}
        setResourceFormData={setResourceFormData}
        handleResourceFormSubmit={handleResourceFormSubmit}
        resourceModalRendered={resourceModalRendered}
        isResourceModalRendered={isResourceModalRendered}
        handleCategoryFormRendering={handleCategoryFormRendering}
        id={id}
        orgs={orgs}
        tags={tags}
        list={list}
        setId={setId}
        categories={categories}
        categoryOptions={categoryOptions}
        handleChange22={handleChange2}
        handleChange={handleChange}
        handleTagFormRendering={handleTagFormRendering}
        image={image}
        setImage={setImage}
        handleResourceFormRendering={handleResourceFormRendering}   
        resourceErrors={resourceErrors}
        setResourceErrors={setResourceErrors}
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
        categoryFormData={categoryFormData}
        setCategoryFormData={setCategoryFormData}
        handleCategoryFormSubmit={handleCategoryFormSubmit}
        modalCategoryRendered={modalCategoryRendered}
        isModalCategoryRendered={isModalCategoryRendered}
      />
    
        <AddSkillModal
          skillFormData={skillFormData}
          handleSkillFormRendering={handleSkillFormRendering}
          setSkillFormData={setSkillFormData}
          handleSkillFormSubmit={handleSkillFormSubmit}
          modalSkillRendered={modalSkillRendered}
          isModalSkillRendered={isModalSkillRendered}
          skillErrors={skillErrors}
          setSkillErrors={setSkillErrors}
        />
        <RejectModal
          rejectData={rejectData}
          setRejectData={setRejectData}
          handleRejectFormSubmit={handleRejectFormSubmit}
          handleRejectFormRendering={handleRejectFormRendering}
          rejectModalRendered={rejectModalRendered}
          rejectErrors={rejectErrors}
          setRejectErrors={setRejectErrors}
        />

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
          modalRendered={staffModalRendered}
          handleStaffFormRendering={handleStaffFormRendering}
          options={options}
          invitedErrors={invitedErrors}
          setInvitedErrors={setInvitedErrors}
        />


        <BxdpDashboardManagementView
          activeButton={activeButton}
          handleOrgFormRendering={handleOrgFormRendering}
          handleSkillFormRendering={handleSkillFormRendering}
          handleStaffFormRendering={handleStaffFormRendering}
          handleRejectFormRendering={handleRejectFormRendering}
          handleVideoFormRendering={handleVideoFormRendering}
          handleResourceFormRendering={handleResourceFormRendering}
          handleEditVideoFormRendering={handleEditVideoFormRendering}
          setEvents={setEvents}
          setOrgs={setOrgs}
          setPrograms={setPrograms}
          setSkills={setSkills}
          programs={programs}
          events={events}
          orgs={orgs}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          members={members}
          skills={skills}
          reload={reload}
          resources={resources}
          setResources={setResources}
          setRejectData={setRejectData}
          rejectData={rejectData}
          videos={videos}
          setVideos={setVideos}
          videoFormData={videoFormData}
          setVideoFormData={setVideoFormData}
          handleVideoFormSubmit={handleVideoFormSubmit}
          videoErrors={videoErrors}
          setVideoErrors={setVideoErrors}
          videoModalRendered={videoModalRendered}
          isVideoModalRendered={isVideoModalRendered}
          resourceModalRendered={resourceModalRendered}
          isResourceModalRendered={isResourceModalRendered}
          resourceErrors={resourceErrors}
          setResourceErrors={setResourceErrors}
          editVideoModalRendered={editVideoModalRendered}
          isEditVideoModalRendered={isEditVideoModalRendered}
        />
      </main>
      <Footer />
    </div>
  );
  }
}


export default BxdpDashboard;
