import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import OrgUpcoming from "../../components/orgComponents/OrgUpcoming";
import { OrgHeader } from "../../components/orgComponents/OrgHeader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StaffList from "../../components/orgComponents/OrgPageStaff";
import { getPartnerById } from "../../redux/org/fetchPartnerById";
import { getAllActiveEventsByOrg } from "../../redux/org/fetchAllActiveEventsByOrgSlice";
import { AddStaffModal } from "../../components/orgComponents/AddStaffModal";
import { orgAdminInviteStatus } from "../../redux/org/inviteOrgAdminSlice";
import { orgManagerInviteStatus } from "../../redux/org/inviteOrgManagerSlice";
import { orgUserInviteStatus } from "../../redux/org/inviteOrgUserSlice";
import { Hero } from "../../components/sharedComponents/HeroAlt";
import { changeOrg } from "../../redux/org/updateOrgDataSlice";
import { getAllActiveProgramsByOrg } from "../../redux/programs/fetchAllActiveProgramsByOrgSlice";
import cookie from "js-cookie";
import { getVideosByOrg } from '../../redux/videos/fetchVideosByOrgSlice';
import { getAllOrgStaff } from "../../redux/org/fetchAllOrgStaffSlice";
import { CurrentPrograms } from "../../components/orgComponents/CurrentPrograms";
import { OrgVideos } from "../../components/orgComponents/OrgVideos";
import { UpcommingEvents } from "../../components/orgComponents/UpcommingEvents";

function OrgPage() {
  const dispatch = useDispatch();
  const { org_id } = useParams()
  const partner = useSelector((state) => state?.getPartnerById);
  const [org, setOrg] = useState();
  
  const [admin, setAdmin] = useState();
  const [formData, setFormData] = useState();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin");
  const isOrgUser = cookie.get("isOrgUser");
  const orgId = cookie.get("orgId");
  const isUser = cookie.get("isUser")
  const userId = cookie.get("userId");
  const userToken = cookie.get("userToken");
  const users = useSelector((state) => state?.getAllOrgStaff);
  const [staff, setStaff] = useState([]);
  const videos = useSelector((state) => state?.getVideosByOrg?.videosByOrg);
  const activeEvents = useSelector(
    (state) => state?.getAllActiveEventsByOrg?.events?.activeEvents
  );
  const activePrograms = useSelector(
    (state) => state?.getAllActiveProgramsByOrg?.programs?.activePrograms
  );
  console.log("activeEvents",activeEvents)
  const [modalRendered, isModalRendered] = useState(false);
  useEffect(() => {
    if (partner?.status == "success") {
      setOrg(partner?.org)
      setFormData({
        org_id: org_id,
        name: partner?.org?.name,
        info_email: partner?.org?.info_email,
        description: partner?.org?.description,
        website: partner?.org?.website,
        phone: partner?.org?.phone,
        address_a: partner?.org?.address,
        zipcode: partner?.org?.zipcode,
        logo_url:partner?.org?.logo_url,
        banner_url:partner?.org?.banner_url
      
      })
    }
  }, [partner]);
  useEffect(() => {
    dispatch(getPartnerById({ org_id }));
    dispatch(getAllActiveEventsByOrg({ org_id }));
    dispatch(getAllActiveProgramsByOrg( {org_id} ));
    dispatch(getAllOrgStaff({ userToken, orgId: org_id }));
    dispatch(getVideosByOrg({ org_id }));
  }, []); 
 console.log("videos",videos)
  useEffect(() => {
    if (users?.status == "success") {
      const staffList = users?.staff?.users;
      setStaff(staffList);
    }
  }, [users]);
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
console.log("activePrograms",activePrograms)
    
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeOrg({
        org_id: org_id,
        name:formData.name,
        info_email:formData.info_email,
        description:formData.description,
        website:formData.website,
        phone:formData.phone,
        address_a:formData.address_a,
        zipcode:formData.zipcode,
        logo_url:formData.logo_url,
        banner_url:formData.banner_url
      })
    ).then((changeOrg)=>{
       window.location.reload(false);
    })
  };
  const inviteUser = (event) => {
    event.preventDefault();
    const {
      org_id,
      firstName,
      lastName,
      email,
      isOrgAdmin,
      isOrgUser,
    } = invitedUserData;
    const newErrors = {
      firstName: !lastName,
      lastName: !email,
      email: !email,
    };

    setInvitedErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);


    if (isOrgAdmin&&isValid) {
      dispatch(
        orgAdminInviteStatus({
          org_id,
          firstName,
          lastName,
          email,
          isOrgAdmin,
          isOrgUser,
        })
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
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
      ).then(() => {
        alert("Invite email has been sent!!!!");
        return window.location.reload(true);
      });
    }
  };



  

  function handleStaffFormRendering(event) {
    event.preventDefault();
    modalRendered ? isModalRendered(false) : isModalRendered(true);
  }

  if( org && (partner?.status == "success") && (isMetaAdmin=="true"||isBxdpAdmin=="true")){ return ( 
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Hero 
        title={org.name}
        backgraound={org.banner_url}
        setText={setOrg} 
        handleSubmit={handleSubmit} 
        formData={formData}
        setFormData={setFormData}
        admin={true}
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
        modalRendered={modalRendered}
        handleStaffFormRendering={handleStaffFormRendering}
        invitedErrors={invitedErrors}
        setInvitedErrors={setInvitedErrors}
      />
      <OrgHeader 
        partner={org}
        handleSubmit={handleSubmit} 
        formData={formData}
        setFormData={setFormData}
        handleStaffFormRendering={handleStaffFormRendering}
        staff={staff}
        showStaff={true}
        admin={true}
      />
      {activePrograms?.length>0 && <CurrentPrograms data={activePrograms} />}
      {videos?.length>0 && <OrgVideos data={videos} />}
      {activeEvents?.length>0 && <UpcommingEvents data={activeEvents} />}
      {activePrograms?.length==0  && <div className=" h-[130px] w-full bg-[#fff]"/>}
      <Footer />
    </div>
    );
  }
if( org && (partner?.status == "success") && (isOrgAdmin=="true"||isOrgUser=="true") && (orgId==org.org_id)){ return ( 
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Hero 
        title={org.name}
        backgraound={org.banner_url}
        setText={setOrg} 
        handleSubmit={handleSubmit} 
        formData={formData}
        setFormData={setFormData}
        admin={true}
      />    
      <OrgHeader 
        partner={org}
        handleSubmit={handleSubmit} 
        formData={formData}
        setFormData={setFormData}
        showStaff={false}
        admin={true}
      />
      {activePrograms?.length>0 && <CurrentPrograms data={activePrograms} />}
      {activePrograms?.length==0  && <div className=" h-[130px] w-full bg-[#fff]"/>}
      {videos?.length>0 && <OrgVideos data={videos} />} 
      {activeEvents?.length>0 && <UpcommingEvents data={activeEvents} />}


      <Footer />
    </div>
    );
  }
  
  if(org && (partner?.status == "success") ){ return (
      <div className="flex flex-col justify-between min-h-screen w-screen">
        <Hero 
          title={org.name}
          backgraound={org.banner_url}
          setText={setOrg} 
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
          admin={false}
        />    
        <OrgHeader 
          partner={org}
          handleSubmit={handleSubmit} 
          formData={formData}
          setFormData={setFormData}
          showStaff={false}
          admin={false}
        />
        {activePrograms?.length>0 && <CurrentPrograms data={activePrograms} />}
        {activePrograms?.length==0  && <div className=" h-[160px] z-[-1] w-full bg-[#fff]"/>}
        {videos?.length>0 && <OrgVideos data={videos} />} 
        {activeEvents?.length>0 && <UpcommingEvents data={activeEvents} partner={org} />}
        <Footer />
      </div>
    );
  }

}

export default OrgPage;
