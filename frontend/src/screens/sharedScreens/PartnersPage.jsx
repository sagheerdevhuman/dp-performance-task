import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import tempImage from "../../assets/login_image.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PartnersHeader } from "../../components/sharedComponents/PartnersHeader";
import { PartnersHightlights } from "../../components/sharedComponents/PartnersHightlights";
import { PartnersPlatformBenefits } from "../../components/sharedComponents/PartnersPlatformBenefits";
import { PartnersOfBxdp } from "../../components/sharedComponents/PartnersOfBxdp";
import { getPartnersList } from "../../redux/user/fetchPartnersListSlice";
import { Hero } from "../../components/sharedComponents/Hero";
import cookie from "js-cookie";

function PartnersPage() {
  const dispatch = useDispatch();
  const partnersList = useSelector(
    (state) => state?.getPartnersList?.partnersList?.partners
  );
  const logged_in = cookie.get('isLoggedIn')

  console.log(partnersList)
  useEffect(() => {
    dispatch(getPartnersList());
  }, []);

  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_3.png')]`
  return (
    <div className="flex flex-col w-screen">
      <Hero 
        title="Our Partners" 
        text="Everyone deserves access to technology skills. We partner with training providers, community organizations, and companies to provide access to technology programs, events, and resources."
        img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
        page="/user_registration"
        page2="/org_user_registration"
        btn_text="Join as a Member"
        btn_text2="Join as a Organization"
        backgraound={backgraound}
        logged_in={logged_in}
      />

      <PartnersPlatformBenefits />
 
      <PartnersHightlights
        partnersList={partnersList}
        tempImage={tempImage}
      />

      {  partnersList&&(
        <PartnersOfBxdp partnersList={partnersList} tempImage={tempImage} />
      )}
      

      <Footer />
    </div>
  );
}

export default PartnersPage;
