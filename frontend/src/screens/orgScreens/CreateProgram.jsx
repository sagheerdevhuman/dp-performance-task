import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import sampleImg from "../../assets/login_image.png";
import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { createProgram } from "../../redux/programs/newProgramSlice";
import { NewProgramForm } from "../../components/orgComponents/AddProgramForm";
import { AddSkillModal } from "../../components/orgComponents/AddSkillModal";
import { generateUrl } from "../../redux/image/generateUrlSlice";
import { uploadProgramImageApi } from "../../services/image/uploadProgramImage";
import { createSkill } from "../../redux/skills/newSkillSlice";
import cookie from "js-cookie";

function CreateProgram() {
  const dispatch = useDispatch();
  const newProgram = useSelector((state) => state?.newProgram);
  const success = newProgram?.status;
  const orgId = cookie.get("orgId");
  const userId = cookie.get('userId');
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin")
  const navigate = useNavigate();
  const [id, setId] = useState(orgId);
  const userToken = cookie.get("userToken");
  const [days,setDays] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skill2, setSkill2] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const skillList = useSelector((state) => state?.getAllSkills);
  const [orgs, setOrgs] = useState([]);
  const orgsList = useSelector((state) => state?.getAllOrgs);
  const [modalSkillRendered, isModalSkillRendered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [show, setShow] = useState("false");

  const setOptions = (allSkills) => {
    return allSkills.map((skill) => ({
      value: skill.skill_id,
      label: skill.name,
      description: skill.default,
    }));
  };
  
  const [list, setList] = useState([]);
  

 console.log(list)
 
  const formatSkills = (skills) => {
    if (skills != null) {
      return skills.map((skill) => ({
        skill_id: skill.value,
        description: skill.description,
      }));
    }
  };
  

  const [formData, setFormData] = useState({
    name: "",
    org_id: "",
    description: "",
    requirements: "",
    enrollment_deadline: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    video_call_link: "",
    location:"",
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

  useEffect(() => {
    dispatch(getAllOrgs({ userToken }));
    dispatch(getAllSkills({ userToken }));
  }, []);

  useEffect(() => {
    if (orgsList?.status == "success" && skillList?.status == "success") {
      setOrgs(orgsList?.orgs?.allOrgs);
      setAllSkills(skillList?.skills?.skills);
      setList(setOptions(skillList?.skills?.skills))


    }
  }, [orgsList, skillList]);
 
  function handleSubmit(event, skill2) {
    event.preventDefault();
    
    // Validate that start time and end time are not the same
    if (formData.start_time === formData.end_time) {
      alert("Start time and end time cannot be the same. Please select different times.");
      return;
    }
    
    if (id==="null"){
      dispatch(
      createProgram({
        org_id: formData.org_id,
        name: formData.name,
        description: formData.description,
        requirements: formData.requirements,
        enrollment_deadline: formData.enrollment_deadline,
        start_date: formData.start_date,
        end_date: formData.end_date,
        week_days:weekDays,
        start_time: formData.start_time,
        end_time: formData.end_time,
        video_call_link: formData.video_call_link,
        skills: skill2,
        is_virtual:show,
        bannerUrl: selectedImage,
        location:formData.location,
        user_id:userId,
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
        
      if(isMetaAdmin==="true"){
          alert("Program Created!!!!");
          navigate("/dashboard");
         
        }else if(isBxdpAdmin === "true"){
          alert("Program Created!!!!")
          navigate("/dashboard");
           
        }else{
          alert("Program Created!!!!")
          navigate("/org_dashboard");
           
        }  
    });
    }else{
      dispatch(
      createProgram({
        org_id: id ,
        name: formData.name,
        description: formData.description,
        requirements: formData.requirements,
        enrollment_deadline: formData.enrollment_deadline,
        start_date: formData.start_date,
        end_date: formData.end_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        week_days: weekDays,
        video_call_link: formData.video_call_link,
        skills: skill2,
        is_virtual:show,
        bannerUrl: selectedImage,
        location:formData.location,
        user_id:userId,
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
        
        if(isMetaAdmin==="true"){
          alert("Program Created!!!!");
          navigate("/dashboard");
         
        }else if(isBxdpAdmin === "true"){
          alert("Program Created!!!!")
          navigate("/dashboard");
           
        }else{
          alert("Program Created!!!!")
          navigate("/org_dashboard");
           
        }  
      });
    }
    
  }
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    discription: "",
  });

  function handleSkillFormRendering(event) {
    event.preventDefault();
    modalSkillRendered ? isModalSkillRendered(false) : isModalSkillRendered(true);
  }

  function handleSkillFormSubmit(event) {
    event.preventDefault();
    dispatch(
      createSkill({
        name: skillFormData.name,
        description: skillFormData.description,
      })
    ).then((data) => {
      let arr = []
      allSkills.map((x)=>{
        arr.push(x)
      })
      arr.push(data.payload.skill)
      // // const new_list = arr.push(data.payload.skill)
      setSkillFormData({
        ...skillFormData,
        name: "",
        description: "",

      });
      setList(setOptions(arr))
      handleSkillFormRendering(event)
      console.log(list)
    });
  }
  const handleChange = (value) => {
    try {
      setSkills(value);
      setSkill2(formatSkills(value));
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      {/* <Navbar /> the Navbar has to be added in global main layout  */}
       <AddSkillModal
          skillFormData={skillFormData}
          handleSkillFormRendering={handleSkillFormRendering}
          setSkillFormData={setSkillFormData}
          handleSkillFormSubmit={handleSkillFormSubmit}
          modalSkillRendered={modalSkillRendered}
          isModalSkillRendered={isModalSkillRendered}
        />
      <div className="flex flex-row ">
      <div className="h-full flex-col w-full lg:w-3/5 pb-[70px]">
          
          
          <form
            onSubmit={(e) => handleSubmit(e, skill2)}
            className="flex flex-row justify-center items-center md:m-h-full h-full  my-20 "
          >
            <div className="flex flex-col justify-center m-h-full h-full lg:w-8/12 w-12/12 px-3">
              <NewProgramForm
                skills={skills}
                setSkills={setSkills}
                allSkills={allSkills}
                setId={setId}
                orgId={orgId} 
                id={id} 
                list={list}
                setSkill2={setSkill2}
                formData={formData}
                setFormData={setFormData}
                sampleImg={sampleImg}
                days={days}
                setDays={setDays}
                weekDays={weekDays}
                setWeekDays={setWeekDays}
                handleSkillFormRendering={handleSkillFormRendering}
                setSelectedImage={setSelectedImage}
                show={show}
                setShow={setShow}
                orgs={orgs}
                setOptions={setOptions}
                handleChange={handleChange}
                selectedImage={selectedImage}
              />
              <div className="flex flex-col mt-2 h-10 ">
                <button
                  type="submit"
                  disabled={!selectedImage}
                  className=" h-10 border-0 rounded-md bg-tkh-brand-tangerine-5 
                    drop-shadow-btn text-center text-tkh-grayscale-0 font-bold capitalize "
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center w-none lg:w-2/5 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-vlada-karpovich-4050287.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        
      </div>
      <Footer/>
    </div>
  );

}

export default CreateProgram;
