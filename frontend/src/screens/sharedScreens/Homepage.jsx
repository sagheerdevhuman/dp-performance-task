import { useNavigate } from "react-router-dom";
import sampleImage from "../../assets/login_image.png";
import { useState, useEffect } from "react";
import Footer from "../../components/sharedComponents/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersList } from "../../redux/user/fetchPartnersListSlice";
import { getAllActiveEvents } from "../../redux/events/fetchAllActiveEventsSlice";
import { getAllActivePrograms } from "../../redux/programs/fetchAllActiveProgramsSlice";
import { FeaturedEvents } from "../../components/sharedComponents/FeaturedEvents";
import { FeaturedPartners } from "../../components/sharedComponents/FeaturedPartners";
import { Upcomming } from "../../components/sharedComponents/Upcomming";
import { Hero } from "../../components/sharedComponents/Hero";
import { HomePageHeader } from "../../components/sharedComponents/HomePageHeader";
import { getFeaturedQualifiedContent } from "../../redux/user/featuredQualifiedContentSlice";
import { getQualifiedContent } from "../../redux/user/qualifiedContentSlice";
import UserBanner from "../../components/sharedComponents/UserBanner";
import { CommunityEvents } from "../../components/sharedComponents/CommunityEvents";
import cookie from "js-cookie";
     
function Homepage() {
  const dispatch = useDispatch();
  const activeEvents = useSelector((state) => state?.getAllActiveEvents?.event);
  const activePrograms = useSelector((state) => state?.getAllActivePrograms?.program);
  const partnersList = useSelector((state) => state?.getPartnersList?.partnersList?.partners);
  const logged_in = cookie.get('isLoggedIn')
  const user_id = cookie.get('userId')
  const featuredQualifiedContent = useSelector((state) => state?.getFeaturedQualifiedContent?.content);
  const qualifiedContent = useSelector((state) => state?.getQualifiedContent?.content);
  const navigate = useNavigate();
  console.log(featuredQualifiedContent)
console.log(user_id)
  useEffect(() => {
      dispatch(getAllActiveEvents());
      dispatch(getAllActivePrograms());
      dispatch(getPartnersList());
      dispatch(getFeaturedQualifiedContent({user_id: user_id}));
      dispatch(getQualifiedContent({user_id: user_id}));
  }, []);

console.log("activeEvents",qualifiedContent)


  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_1.png')]`
  
    if(user_id !== undefined){
      return (
        <div className="flex flex-col w-screen ">
          <UserBanner />
          <Hero 
            title="Technology Skills & "
            title2="Resources for All" 
            text="Using a Collective Impact Approach to Support Youth Pathways in Technology"
            img="https://bxtp-static.s3.amazonaws.com/img/bg/bg_1.png"
            page="/user_registration"
            page2="/org_user_registration"
            btn_text="Join as a Member"
            btn_text2="Join as a Organization"
            backgraound={backgraound}
            logged_in={logged_in}
            hide_btn={true}
          /> 
         
          <Upcomming events={activeEvents} programs={activePrograms} featuredContent={featuredQualifiedContent}/> 
          <CommunityEvents data={qualifiedContent?.qualified_content} />
          <FeaturedPartners partners={partnersList} />
             {/* <Footer /> the footer has to be added in global main layout  */}
        </div>
      )   
    }
    return (

      <div className="flex flex-col w-screen ">
        <UserBanner />
        <Hero 
          title="Technology Skills & "
          title2="Resources for All" 
          text="Using a Collective Impact Approach to Support Youth Pathways in Technology"
          img="https://bxtp-static.s3.amazonaws.com/img/bg/bg_1.png"
          page="/user_registration"
          page2="/org_user_registration"
          btn_text="Join as a Member"
          btn_text2="Join as a Organization"
          backgraound={backgraound}
          logged_in={logged_in}
          hide_btn={false}
        /> 
        
         <HomePageHeader />
         <Upcomming events={activeEvents} programs={activePrograms} featuredContent={featuredQualifiedContent}/> 
        <FeaturedPartners partners={partnersList} />
       
        {/* <Footer /> the footer has to be added in global main layout  */}
      </div>
    );
}

export default Homepage;
