import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import sampleImg from "../../assets/login_image.png";
import { createEvent } from "../../redux/events/newEventSlice";
import { NewEventForm } from "../../components/orgComponents/AddEventForm";
import { AddEventDayModal } from "../../components/orgComponents/AddEventDayModal";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { uploadFile } from "../../redux/image/fileUploadSlice";
import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { getAllTags } from "../../redux/events/fetchAllTaggsSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";
import { AddSkillModal } from "../../components/orgComponents/AddSkillModal";
import { createSkill } from "../../redux/skills/newSkillSlice";
import cookie from "js-cookie";


function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orgId = cookie.get("orgId");
  const userToken = cookie.get("userToken");
  const userId = cookie.get('userId');
  const newEvent = useSelector((state) => state?.newEvent);
  const [id, setId] = useState(orgId);
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin")
  const [days, setDays] = useState([]);
  const [modalRendered, isModalRendered] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const orgsList = useSelector((state) => state?.getAllOrgs);
  const [virtual, setVirtual] = useState("false");
  const [selectedImage, setSelectedImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const success = newEvent?.status;
  const [tags, setTags] = useState([]);
  const [tag2, setTag2] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [modalTagRendered, isModalTagRendered] = useState(false);


  useEffect(() => {
    dispatch(getAllOrgs({ userToken }));
    dispatch(getAllTags());
  }, []);


  useEffect(() => {
    if (orgsList?.status == "success" && tagList?.status == "success") {
      setOrgs(orgsList?.orgs?.allOrgs);
      setAllTags(tagList?.tags?.tags);
      setList(setOptions(tagList?.tags?.tags))
    }
  }, [orgsList,tagList]);



  const [formData, setFormData] = useState({
    org_id: id,
    name:"",
    description: "",
    location: "",
    rsvp_link: "",
    past_experience:"",
    education_level:"",
    max_income_level:"",
    min_income:"",
    max_age:"",
    min_age:"", 
    gender:"",
    experience:"",
    city:"",
    zipcode:"",
    radius:"",
  });

  const handleSubmit = (event, days) => {
    event.preventDefault();
    
    // Validate that start time and end time are not the same for single day events
    if (days.length === 1 && days[0].start_time === days[0].end_time) {
      alert("Start time and end time cannot be the same. Please select different times.");
      return;
    }
    
    if (id==="null"){
      dispatch(
      createEvent({
          org_id: formData.org_id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          rsvp_link: formData.rsvp_link,
          days: days,
          tags: tag2,
          is_virtual:virtual,
          bannerUrl:selectedImage,
          user_id: userId,
          past_experience:formData.past_experience,
          education_level:formData.education_level,
          max_income_level:formData.max_income_level,
          min_income:formData.min_income,
          max_age:formData.max_age,
          min_age:formData.min_age,
          gender:formData.gender,
          experience:formData.experience,
          city:formData.city,
          zipcode:formData.zipcode,
          radius:formData.radius,
        })).then(() => {
        alert("Event Created!!!!");
        if(isMetaAdmin==="true"){
          navigate("/dashboard");
         
        }else if(isBxdpAdmin === "true"){
          navigate("/dashboard");
           
        }else{
          navigate("/org_dashboard");
           
        }  
          
    });
    }else{
      dispatch(
      createEvent({
          org_id: formData.org_id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          rsvp_link: formData.rsvp_link,
          days: days,
          tags: tag2,
          is_virtual:virtual,
          bannerUrl: selectedImage,
          user_id: userId,
          past_experience:formData.past_experience,
          education_level:formData.education_level,
          max_income_level:formData.max_income_level,
          min_income:formData.min_income,
          max_age:formData.max_age,
          min_age:formData.min_age,
          gender:formData.gender,
          experience:formData.experience,
          city:formData.city,
          zipcode:formData.zipcode,
          radius:formData.radius,
        })).then(() => {
        alert("Event Created!!!!");
        if(isMetaAdmin==="true"){
          navigate("/dashboard");
         
        }else if(isBxdpAdmin === "true"){
          navigate("/dashboard");
           
        }else{
          navigate("/org_dashboard");
           
        }  
      });
    }
  };
  
  function handleClick(event) {
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }

  const handleAddDay = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const date = formData.get("date");
    const start_time = formData.get("start_time");
    const end_time = formData.get("end_time");
    
    // Validate that start time and end time are not the same
    if (start_time === end_time) {
      alert("Start time and end time cannot be the same. Please select different times.");
      return;
    }
    
    setDays((prevDays) => [
      ...prevDays,
      {
        date: date,
        start_time: start_time,
        end_time: end_time,
      },
    ]);
    handleClick(event);
  };

  const handleRemoveDay = (date) => {
    setDays(days.filter((day) => day.date !== date));
  };



  const setOptions = (allTags) => {
    return allTags.map((tag) => ({
      value: tag.tag_id,
      label: tag.name,
    }));
  };
  
  
  const formatTags = (tags) => {
    if (tags != null) {
      return tags.map((tag) => ({
        tag_id: tag.value,
        name: tag.label,
      }));
    }
  };
  
 const [tagFormData, setTagFormData] = useState({
    name: "",
  });

  function handleTagFormRendering(event) {
    event.preventDefault();
    modalTagRendered ? isModalTagRendered(false) : isModalTagRendered(true);
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
      console.log(list)
    });
  }
  const handleChange = (value) => {
    try {
      setTags(value);
      setTags2(formatTags(value));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <AddEventDayModal
        modalRendered={modalRendered}
        isModalRendered={isModalRendered}
        handleClick={handleClick}
        handleAddDay={handleAddDay}
      />
      
      <AddTagModal
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        handleTagFormRendering={handleTagFormRendering}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
      />
      <div className="flex flex-row ">
      <div className="h-full flex-col w-full lg:w-3/5  pb-[70px]">
          sdfawdfasdfas
          <form
          onSubmit={(e) => handleSubmit(e, days)}
          className="flex flex-row justify-center items-center md:m-h-full h-full  my-20 "
        >
          <div className="flex flex-col justify-center m-h-full h-full lg:w-8/12 w-12/12 px-3">
            <NewEventForm
              days={days}
              setDays={setDays}
              formData={formData}
              setId={setId}
              id={id}
              setFormData={setFormData}
              sampleImg={sampleImg}
              handleClick={handleClick}
              handleRemoveDay={handleRemoveDay}
              orgs={orgs}
              virtual={virtual}
              setVirtual={setVirtual}
              setSelectedImage={setSelectedImage}
              tags={tags}
              handleChange2={handleChange}
              list={list}
              handleTagFormRendering={handleTagFormRendering}
            />
            <div className="flex flex-col mt-3 h-30 ">
              
              <button
                type="submit"
                className="  h-10 border-0 rounded-md bg-tkh-brand-tangerine-5 
                drop-shadow-btn text-center text-tkh-grayscale-0 font-bold capitalize"
              >
                submit
              </button>
            </div>
          </div>
        </form>
        </div>
        <div className="flex flex-col justify-center items-center w-none lg:w-2/5 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-igreja-dimensao-56315701-10123191.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
       
      </div>
      
    </div>
  );
}

export default CreateEvent;
