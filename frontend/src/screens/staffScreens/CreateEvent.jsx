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
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import { createTag } from "../../redux/events/newTagSlice";
import { AddTagModal } from "../../components/orgComponents/AddTagModal";
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
  const success = newEvent?.status;
  const [days, setDays] = useState([]);
  const [modalRendered, isModalRendered] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const orgsList = useSelector((state) => state?.getAllOrgs);
  const [virtual, setVirtual] = useState("false");
  const [selectedImage, setSelectedImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const [tags, setTags] = useState(null);
  const [tag2, setTag2] = useState([]);
  const [allTags, setAllTags] = useState();
  const tagList = useSelector((state) => state?.getAllTags);
  const [list, setList] = useState([]);
  const [modalTagRendered, isModalTagRendered] = useState(false);
  const [level, setLevel] = useState();

  console.log(days)
  useEffect(() => {
    dispatch(getAllOrgs({ userToken }));
    dispatch(getAllTags());
  }, []);


  useEffect(() => {
    if (orgsList?.status == "success" && tagList?.status == "success") {
      setOrgs(orgsList?.orgs?.allOrgs.filter(org=> org.is_approved == true && org.is_active == true));
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
    education_level: level,
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
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    rsvp_link: false,
    days: false,
    location: false,
    is_virtual: false,
    bannerUrl: false,
    tags: false,
  });

  const handleSubmit = (event, days) => {
    event.preventDefault();
    
    // Validate that start time and end time are not the same for single day events
    if (days.length === 1 && days[0].start_time === days[0].end_time) {
      alert("Start time and end time cannot be the same. Please select different times.");
      return;
    }
    
    const newErrors = {
      name: !formData.name,
      description: !formData.description || formData.description.trim() === "",
      rsvp_link: !formData.rsvp_link,
      days: !days.length>=1,
      tags: !tag2.length>=1,
      location: virtual == "true" ?  false: !formData.location,
      is_virtual: !virtual,
      bannerUrl: !selectedImage,
    };
    setErrors(newErrors);
    console.log({newErrors})
    const isValid = !Object.values(newErrors).some(error => error);
    if (id==="null" && isValid){
      dispatch(
      createEvent({
          org_id: formData.org_id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          rsvp_link: formData.rsvp_link,
          days: days,
          is_virtual:virtual,
          bannerUrl:selectedImage,
          user_id: userId,
          tags: tag2,
          past_experience:formData.past_experience,
          education_level: formData.education_level,
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
        navigate("/confirm_event");
            
          
      });
    }else if(isValid){
      dispatch(
      createEvent({
          org_id: formData.org_id,
          name: formData.name,
          description: formData.description,
          location: formData.location,
          rsvp_link: formData.rsvp_link,
          days: days,
          is_virtual:virtual,
          bannerUrl: selectedImage,
          user_id: userId,
          tags: tag2,
          past_experience:formData.past_experience,
          education_level: formData.education_level,
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
        navigate("/confirm_event"); 
      });
    }else{
      alert(isValid)
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
    if (errors.days) {
      setErrors(prev => ({
        ...errors,
        days: false
      }));
    }
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
        name: tag.name,
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
    });
  }

  const handleChange = (value) => {
    try {
      setTags(value);
      setTag2(formatTags(value));
      if (errors.tags) {
        setErrors(prev => ({
          ...errors,
          tags: false
        }));
      }
    } catch (error) {
     alert(error.message) ;
    }
  };

  const handleChange2 = (value) => {
    setLevel(value);
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
      <div className="flex flex-row h-screen">
      <div className=" flex-col w-full lg:w-3/6  overflow-y-auto">
          <form
          onSubmit={(e) => handleSubmit(e, days)}
          className="flex flex-row justify-center items-center py-20 "
        >
          <div className="flex flex-col justify-center  lg:w-8/12 w-12/12 px-4">
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
              list={list}
              handleTagFormRendering={handleTagFormRendering}
              errors={errors}
              setErrors={setErrors}
              selectedImage={selectedImage}
              level={level}
              handleChange2={handleChange2}
              handleChange3={handleChange}
            />
            <div className="flex flex-col mt-3 h-30 ">
              
              <button
                type="submit"
                className="  h-10 border-0 rounded-md disabled:bg-tkh-brand-tangerine-2 bg-tkh-brand-tangerine-5
                drop-shadow-btn text-center text-tkh-grayscale-0 font-bold capitalize"
              >
                submit
              </button>
            </div>
          </div>
        </form>
        </div>
        <div className=" flex flex-col justify-center items-center w-none lg:w-3/6 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-igreja-dimensao-56315701-10123191.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        
      </div>
       <Footer/>
    </div>
  );
}

export default CreateEvent;
