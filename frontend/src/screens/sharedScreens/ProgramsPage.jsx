import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgramsHeader } from "../../components/sharedComponents/ProgramsHeader";
import { FeaturedPrograms } from "../../components/sharedComponents/FeaturedPrograms";
import { ProgramResults } from "../../components/sharedComponents/ProgramResults";
import { ProgramSearch } from "../../components/sharedComponents/ProgramSearch";
import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { Hero } from "../../components/sharedComponents/Hero";
import { getQualifiedPrograms } from "../../redux/programs/qualifiedProgramsSlice";
import { getRecommendedPrograms } from "../../redux/programs/fetchRecommendedProgramsSlice";      

import cookie from "js-cookie";
import axios from "axios";

function ProgramsPage() {
  const dispatch = useDispatch();
  const qualifiedPrograms = useSelector(
    (state) => state?.getQualifiedPrograms?.programs?.qualified_programs
  );
  const recommendedPrograms = useSelector(
    (state) => state?.getRecommendedPrograms?.recommendedPrograms?.recommended_programs
  );
  
  const userToken = cookie.get("userToken");
  const user_id = cookie.get("userId");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filterdSkills, setFilterdSkills] = useState([]);
  const skillList = useSelector((state) => state?.getAllSkills);
  const logged_in = cookie.get('isLoggedIn')
  

  useEffect(() => {
    dispatch(getRecommendedPrograms({user_id}));
    dispatch(getQualifiedPrograms({user_id}));
    dispatch(getAllSkills({ userToken }));
    setFilterdSkills(qualifiedPrograms)
  }, []);
  useEffect(() => {
    if (skillList?.status == "success") {
      setSkills(skillList?.skills?.skills);
    }
  }, [ skillList]);

 
  console.log("recommendedPrograms",recommendedPrograms)

  const handleSubmit = (program) => {
    program.preventDefault();
    if (currentSearchTerm !== ""|| filterdSkills==null) {
      setIsSearchSubmitted(true);
      filterPrograms(currentSearchTerm);
    }
    if (currentSearchTerm !== ""&& filterdSkills.length > 0) {
      setIsSearchSubmitted(true);
      filterProgramsSkill(currentSearchTerm);
    }
    if (currentSearchTerm == "" && filterdSkills.length > 0) {
      setIsSearchSubmitted(true);
      skillFilter()
    }
  };

  const filterPrograms = (searchTerm) => {
    let tempArr = [];
    const programs = qualifiedPrograms.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      }else if ( e.description.toLowerCase().includes(searchTerm.toLowerCase())){
        tempArr.push(e);
      }
    });

    return setFilteredPrograms(tempArr);
  };

  const filterProgramsSkill = (searchTerm) => {
    let data = filterdSkills.map(e=> e.label).toString()
    let tempArr = [];
    const programs = qualifiedPrograms.filter((e) => {
      if (e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempArr.push(e);
      }else if ( e.description.toLowerCase().includes(searchTerm.toLowerCase())){
        tempArr.push(e);
      }
    });
    const programBySkill = tempArr
      .filter((program) => !!program.skills
      .map( e=> e.name).toString()
      .includes(data)
    )
    return setFilteredPrograms(programBySkill);
  };

  const skillFilter = async () => {
    let skills =  filterdSkills.map(e=> e.value)
    const res =  await axios({
      method: "POST",
      data: {
        skills:skills,
      },
      url: `${import.meta.env.VITE_BXDP_PROD_SERVER}/programs/by_skill`,
    }).then((res) => {
      return setFilteredPrograms(res.data);
    });
  };
  

  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_5.png')]`
  
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Hero 
        title="Programs" 
        text="Browse programs across our partnerships"
        img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
        page="/user_registration"
        page2="/org_user_registration"
        btn_text="Join as a Member"
        btn_text2="Join as a Organization"
        backgraound={backgraound}
        logged_in={logged_in}
      /> 
      <FeaturedPrograms activePrograms={recommendedPrograms} /> 
      <ProgramsHeader
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
        handleSubmit={handleSubmit}
        skills={skills}
        setSkills={setSkills}
        filterdSkills={filterdSkills}
        setFilterdSkills={setFilterdSkills}
      />
      <ProgramSearch programs={ isSearchSubmitted ? filteredPrograms : qualifiedPrograms}/>
      {/* {isSearchSubmitted ? renderSearchResults() : null}*/}
      
      <Footer />
    </div>
  );
}

export default ProgramsPage;
