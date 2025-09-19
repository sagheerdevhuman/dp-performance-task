import { useNavigate } from "react-router-dom";
import sampleImage from "../../assets/login_image.png";
import { useState, useEffect } from "react";
import Footer from "../../components/sharedComponents/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersList } from "../../redux/user/fetchPartnersListSlice";
import { getAllActiveEvents } from "../../redux/events/fetchAllActiveEventsSlice";
import { getAllActivePrograms } from "../../redux/programs/fetchAllActiveProgramsSlice";
import { AboutPageMission } from "../../components/sharedComponents/AboutPageMission";
import { HowThisWorks } from "../../components/sharedComponents/HowThisWorks";
import { Upcomming } from "../../components/sharedComponents/Upcomming";
import { Hero } from "../../components/sharedComponents/Hero";
import { WhatDoes } from "../../components/sharedComponents/WhatDoes";
import { TheRole } from "../../components/sharedComponents/TheRole"
import cookie from "js-cookie";





function AboutPage() {
  const dispatch = useDispatch();
  const activeEvents = useSelector((state) => state?.getAllActiveEvents?.event);
  const activePrograms = useSelector((state) => state?.getAllActivePrograms?.program);
  const partnersList = useSelector((state) => state?.getPartnersList?.partnersList?.partners);
  const logged_in = cookie.get('isLoggedIn')
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(getAllActiveEvents());
      dispatch(getAllActivePrograms());
      dispatch(getPartnersList());
  }, []);

  
  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_2.png')]`
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
    <Hero 
      title="About Us" 
      text="The Knowledge House drives collective action by mobilizing tech education partners, higher-ed institutions and funders around a common set of tech mastery standards and employment goals via DigitalPipeline."
      img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
      page="/user_registration"
      page2="/org_registration"
      btn_text="Join as a Member"
      btn_text2="Join as a Organization"
      backgraound={backgraound}
      logged_in={logged_in}
    />    
    <AboutPageMission/>
    <HowThisWorks/>
    <WhatDoes/>
    <TheRole/>
    {/* <Footer /> the footer has to be added in global main layout  */}
    </div>
  );
}

export default AboutPage;
