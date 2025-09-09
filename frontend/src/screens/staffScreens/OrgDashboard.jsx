import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/sharedComponents/FooterAlt";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import OrgBanner from "../../components/staffComponents/OrgBanner";
import OrgDashboardManagementView from "../../components/orgComponents/OrgDashboardManagementView";
import OrgReportsView from "../../components/orgComponents/OrgReportView";
import {AddStaffModal} from "../../components/orgComponents/AddStaffModal";
import { getOrgById } from "../../redux/org/fetchOrgByIdSlice";
import { getAllPrograms } from "../../redux/programs/fetchAllProgramsSlice";
import { getAllEvents } from "../../redux/events/fetchAllEventsSlice";
import { orgAdminInviteStatus } from "../../redux/org/inviteOrgAdminSlice";
import { orgManagerInviteStatus } from "../../redux/org/inviteOrgManagerSlice";
import { orgUserInviteStatus } from "../../redux/org/inviteOrgUserSlice";
import { getResourcesByOrgId } from "../../redux/resources/fetchResourcesByOrgIdSlice";
import { getVideoList } from "../../redux/videos/fetchAllVideosSlice";
import { changeVideo } from "../../redux/videos/updateVideoSlice";
import { createVideo } from "../../redux/videos/newVideoSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddVideoModal } from "../../components/orgComponents/AddVideoModal";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { getVideosByOrg } from '../../redux/videos/fetchVideosByOrgSlice';
import {fetchCategories} from "../../redux/categories/getCategoriesSlice";
import { AddCategoryModal } from "../../components/staffComponents/AddCategoryModal";
import { createCategory } from "../../redux/categories/addCategorySlice";
import { createResource } from "../../redux/resources/newResourceSlice";
import { AddRescourceModal } from "../../components/orgComponents/AddResourceModal";

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
  const videoList = useSelector((state) => state?.getAllVideos);
  const resourcesByOrgId = useSelector((state) => state?.getResourcesByOrgId);
  const [resources, setResources] = useState([]);
  const [videos, setVideos] = useState([]);
  const [image, setImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const [tags, setTags] = useState(null);
  const [tag2, setTag2] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categories2, setCategories2] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const categoryList = useSelector((state) => state?.getCategories);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const categoriesList = useSelector((state) => state?.fetchCategories);
  const [org, setOrg] = useState([]);
  const orgId = cookie.get("orgId");
  const orgList = useSelector((state) => state?.getOrgById);
  const buttons = ["requests", "approved","rejected"];
  const [activeButton, setActiveButton] = useState("requests");
  const [modalRendered, isModalRendered] = useState(false);
  const [videoModalRendered, isVideoModalRendered] = useState(false);
  const [resourceModalRendered, isResourceModalRendered] = useState(false);
  const [modalCategoryRendered, isModalCategoryRendered] = useState(false);
  const [orgModalRendered, isOrgModalRendered] = useState(false);
  const [modalTagRendered, isModalTagRendered] = useState(false);
  const [editVideoModalRendered, isEditVideoModalRendered] = useState(false);
  const { videosByOrg, status } = useSelector((state) => state.getVideosByOrg);
  const [videoFormData, setVideoFormData] = useState({
    name: "",
    link: "",
    description: "",
  });
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
  const [resourceFormData, setResourceFormData] = useState({
    title: "",
    description: "",
    location: "",
    link: "",
    provider: "",
    is_platform_wide: false,
    is_active: true,
  });
  const [resourceErrors, setResourceErrors] = useState({
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
  


  const [invitedUserData, setInvitedUserData] = useState({
    org_id: orgId,
    firstName: "",
    lastName: "",
    email: "",
    isOrgAdmin: false,
    isOrgUser: true,
  });
  const [invitedErrors, setInvitedErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  
  const inviteUser = (event) => {
    event.preventDefault();
     // Validate inputs
    const {
      org_id,
      firstName,
      lastName,
      email,
      isOrgAdmin,
      isOrgUser,
    } = invitedUserData;

    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      email: !email
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
          isOrgUser,
        })
      ).then((status) => {
        if (status.payload) {
          alert("Invite email has been sent!!!!");
          return window.location.reload(true);
        } else {
          alert("User already exists");
        }
       
      });
    } else if (isValid){
      dispatch(
        orgUserInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgUser,
        })
      ).then((status) => {
        if (status.payload) {
          alert("Invite email has been sent!!!!");
          return window.location.reload(true);
        } else {
          alert("User already exists");
        }
      });
    }else{    
        alert("errr with form!!!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name =="email"){
      setInvitedUserData({
        ...invitedUserData,
        [name]: value.toLowerCase(),
      });
      if (invitedErrors[name]) {
        setInvitedErrors({
          ...invitedErrors,
          [name]: false
        });
      }
    }else{
      setInvitedUserData({
        ...invitedUserData,
        [name]: 
          value.charAt(0).toUpperCase() +
          value.slice(1),
      });
      if (invitedErrors[name]) {
        setInvitedErrors({
          ...invitedErrors,
          [name]: false
        });
      }
    };  
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
  
  const handleResourceFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
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
        org_id: orgId,
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
  const handleTagChange = (value) => {
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

  useEffect(() => {
    dispatch(getOrgById({ orgId, userToken }));
    dispatch(getAllPrograms({ user_id }));
    dispatch(getAllEvents({ user_id }));
    dispatch(getVideoList({ userToken }));
    dispatch(getVideosByOrg({ org_id: orgId, userToken }));
    dispatch(getResourcesByOrgId({ org_id: orgId }));
    dispatch(getAllTags());
    dispatch(fetchCategories());
  }, []);


  useEffect(() => {
    if (programsList?.status == "success" && eventsList?.status == "success" ) {
      setPrograms(programsList?.programs);
      setEvents(eventsList?.events);
      setOrg(orgList?.org?.org);
      setResources(resourcesByOrgId?.resourcesByOrg?.resources);
      setVideos(videosByOrg);
      setAllTags(tagList?.tags?.tags);
      setList(setOptions(tagList?.tags?.tags))
      setAllCategories(categoryList?.categories);
      setCategoryOptions(setOptions2(categoryList?.categories));
    }
  }, [programsList, eventsList, orgList, videoList, resourcesByOrgId, categoryList]);


  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
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

  function handleStaffFormRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }

  function handleEditVideoFormRendering(event) {
    event.preventDefault();
    editVideoModalRendered ? isEditVideoModalRendered(false) : isEditVideoModalRendered(true);
  }

  function handleVideoFormRendering(event) {
    event.preventDefault();
    videoModalRendered ? isVideoModalRendered(false) : isVideoModalRendered(true);
  }

  function handleOrgFormRendering(event) {
    event.preventDefault();
    orgModalRendered ? isOrgModalRendered(false) : isOrgModalRendered(true);
  }

  function handleResourceFormRendering(event) {
    event.preventDefault();
    resourceModalRendered ? isResourceModalRendered(false) : isResourceModalRendered(true);
  }
  function handleCategoryFormRendering(event) {
    event.preventDefault();
    modalCategoryRendered ? isModalCategoryRendered(false) : isModalCategoryRendered(true);
  }
  function handleTagFormRendering(event) {
    event.preventDefault();
    modalTagRendered ? isModalTagRendered(false) : isModalTagRendered(true);
  }

  if (programsList?.status == "success" && eventsList?.status == "success" && resourcesByOrgId?.status == "success" && videoList?.status == "success" && tagList?.status == "success") {
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
        handleChange={handleChange}
        invitedErrors={invitedErrors}
      />
      
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
        handleChange={handleTagChange}
        handleTagFormRendering={handleTagFormRendering}
        image={image}
        setImage={setImage}
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
      />  
      <AddRescourceModal
        resourceFormData={resourceFormData}
        setResourceFormData={setResourceFormData}
        handleResourceFormSubmit={handleResourceFormSubmit}
        resourceModalRendered={resourceModalRendered}
        isResourceModalRendered={isResourceModalRendered}
        handleCategoryFormRendering={handleCategoryFormRendering}
        tags={tags}
        list={list}
        categories={categories}
        categoryOptions={categoryOptions}
        handleChange22={handleChange2}
        handleChange={handleTagChange}
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
      <OrgBanner/>
      <main className="flex flex-col justify-center gap-7 h-full mx-3 md:mx-7 lg:mx-10 xl:mx-16 py-10">

         <header className="flex flex-col justify-center text-center lg:text-start gap-[24px] mt-[20px]"> 
          <h1 className="text-5xl font-bold leading-tight ">
            Reports
          </h1>
        </header>

         {/* <OrgReportsView
          events={events}
          setEvents={setEvents}
          programs={programs}
          setPrograms={setPrograms}
        /> */}
        <OrgDashboardManagementView
          programs={programs}
          setPrograms={setPrograms}
          events={events}
          setEvents={setEvents}
          resources={resources}
          setResources={setResources}
          handleStaffFormRendering={handleStaffFormRendering}
          videos={videos}
          setVideos={setVideos}
          handleOrgFormRendering={handleOrgFormRendering}
          handleVideoFormRendering={handleVideoFormRendering}
          handleEditVideoFormRendering={handleEditVideoFormRendering}
          org={org}
          handleResourceFormRendering={handleResourceFormRendering}
        />
    

       
      </main>
      <Footer />
    </div>
  );
  }
}


export default BxdpDashboard;
