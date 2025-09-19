import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/FooterAlt";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgramDetailHeader } from "../../components/sharedComponents/ProgramDetailHeader";
import { ProgramDetailBody } from "../../components/sharedComponents/ProgramDetailBody";
import { Apply } from "../../components/sharedComponents/Apply";
import { getProgramById } from "../../redux/programs/fetchProgramByIdSlice";
import { changeProgram } from "../../redux/programs/updateProgramSlice";
import { Hero } from "../../components/sharedComponents/HeroAlt";
import { AddSkillModal } from "../../components/orgComponents/AddSkillModal";
import { createSkill } from "../../redux/skills/newSkillSlice";
import cookie from "js-cookie";
import { getAllActivePrograms } from "../../redux/programs/fetchAllActiveProgramsSlice";
import { MorePrograms } from '../../components/sharedComponents/MorePrograms'
import { OrgPrev} from "../../components/sharedComponents/Org_prev"



function ProgramsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getProgram = useSelector((state) => state?.getProgramById);
  const skillList = useSelector((state) => state?.getAllSkills)
  const [allSkills, setAllSkills] = useState([]);
  const [program, setProgram] = useState(null);
  const [admin, setAdmin] = useState();
  const [days, setDays] = useState(); 
  const [formData, setFormData] = useState();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin")
  const isOrgUser = cookie.get("isOrgUser")
  const orgId = cookie.get("orgId")
  const isUser = cookie.get("isUser")
  const userId = cookie.get("userId");
  const [modalSkillRendered, isModalSkillRendered] = useState(false);
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    discription: "",
  });
  const [skillErrors, setSkillErrors] = useState({
    name: false,
    discription: false,
  });
  console.log(getProgram)

    
  const [list, setList] = useState([]);

  const setOptions = (allSkills) => {
    return allSkills.map((skill) => ({
      value: skill.skill_id,
      label: skill.name,
      description: skill.default,
    }));
  };

  useEffect(() => {
    dispatch(getProgramById({ program_id: id }));
    dispatch(getAllActivePrograms());
  }, [getProgramById]);

   useEffect(() => {
    if (skillList?.status == "success") {
      setAllSkills(skillList?.skills?.skills);
      setList(setOptions(skillList?.skills?.skills))


    }
  }, [skillList]);

  console.log("orgId", orgId)
  console.log("program", program)
  console.log("isOrgAdmin", isOrgAdmin)
  console.log("isOrgUser", isOrgUser)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeProgram({
          program_id:formData.program_id,
          name: formData.name,
          description: formData.description,
          org_id: formData.org_id,
          requirements:formData.requirements,
          enrollment_deadline:formData.enrollment_deadline,
          start_date:formData.start_date,
          end_date:formData.end_date,
          start_time:formData.start_time,
          end_time:formData.end_time,
          week_days:days,
          location: formData.location,
          video_call_link:formData.video_call_link,
          is_virtual:formData.is_virtual,
          banner_url: formData.banner_url,
          user_id: userId,
      })
    ).then((changeProgram)=>{
       window.location.reload(false);
    }) 
  };

  function handleSkillFormRendering(event) {
    event.preventDefault();
    modalSkillRendered ? isModalSkillRendered(false) : isModalSkillRendered(true);
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
      });
    }
  }

  useEffect(() => {
    if (getProgram?.status == "success" ) {
      setProgram(getProgram?.programs);
      setFormData({
        program_id: getProgram?.programs.program_id,
        name: getProgram?.programs.name,
        description: getProgram?.programs.description,
        org_id: getProgram?.programs.org_id,
        requirements: getProgram?.programs.requirements,
        enrollment_deadline: getProgram?.programs.enrollment_deadline,
        start_date: getProgram?.programs.start_date,
        end_date: getProgram?.programs.end_date,
        start_time: getProgram?.programs.start_time,
        end_time: getProgram?.programs.end_time,
        week_days: getProgram?.programs.week_days,
        location: getProgram?.programs.location,
        video_call_link: getProgram?.programs.video_call_link,
        is_virtual: getProgram?.programs.is_virtual,
        banner_url: getProgram?.programs.banner_url,
      })
    }
  }, [getProgram]);

  if( program  && (isMetaAdmin=="true"||isBxdpAdmin=="true")){ return (
       <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
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

        <Hero 
          title={program.name}
          backgraound={program.banner_url}
          program={program} 
          setText={setProgram} 
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
          admin={true}

        />   
        <ProgramDetailHeader 
            days={days} 
            setDays={setDays}  
            program={program} 
            admin={true} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            setProgram={setProgram}  
            formData={formData}
            list={list}
            setList={setList}
            setOptions={setOptions} 
            handleSkillFormRendering={handleSkillFormRendering}
        />
        {/*<OrgPrev org={program.organization}/> 
        <MorePrograms data={program} />*/}
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  if(program  && (orgId==program.org_id) && (isOrgAdmin=="true" || isOrgUser=="true")){ return (
        <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
            <AddSkillModal
              skillFormData={skillFormData}
              handleSkillFormRendering={handleSkillFormRendering}
              setSkillFormData={setSkillFormData}
              handleSkillFormSubmit={handleSkillFormSubmit}
              modalSkillRendered={modalSkillRendered}
              isModalSkillRendered={isModalSkillRendered}
            />
            <Hero 
              title={program.name}
              backgraound={program.banner_url}
              program={program} 
              setText={setProgram} 
              handleSubmit={handleSubmit} 
              formData={formData}
              setFormData={setFormData}
              admin={true}

            />   
        <ProgramDetailHeader 
            days={days} 
            setDays={setDays}  
            program={program} 
            admin={true} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            setProgram={setProgram}  
            formData={formData}
            list={list}
            setList={setList}
            setOptions={setOptions} 
            handleSkillFormRendering={handleSkillFormRendering}
        />
        
        {/*<OrgPrev org={program.organization}/> 
        <MorePrograms data={program} />*/}
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  if(program){
    return (
       <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
        <Hero 
          title={program.name}
          backgraound={program.banner_url}
          program={program} 
          setText={setProgram} 
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
          admin={false}

        />   
        <ProgramDetailHeader 
            days={days} 
            setDays={setDays}  
            program={program} 
            admin={false} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            setProgram={setProgram}  
            formData={formData}
            list={list}
            setList={setList}
            setOptions={setOptions} 
            handleSkillFormRendering={handleSkillFormRendering} 
        />
        
        {/*<OrgPrev org={program.organization}/> 
        <MorePrograms data={program} />*/}
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
  }
  
  
}

export default ProgramsPage;
