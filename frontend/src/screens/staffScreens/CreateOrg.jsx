import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import sampleImg from "../../assets/login_image.png";
import { NewOrgForm } from "../../components/staffComponents/AddOrgForm";
import { InviteOrgForm } from "../../components/staffComponents/InviteOrgForm"
import { uploadFile } from "../../redux/image/fileUploadSlice";
import { orgInviteStatus } from "../../redux/org/inviteOrgSlice";
import { OrgFormToggle }  from"../../components/staffComponents/OrgFormToggle"
import cookie from "js-cookie";


function CreateOrg() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const [logoImage, setLogoImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-pixabay-534247.jpg");
  const [bannerImage, setBannerImage] = useState("https://d1yh21d3dzz97r.cloudfront.net/pexels-jplenio-1103970.jpg");
  const [invite, setInvite] = useState(true)
  const inviteDisabled = (logoImage==null )||(bannerImage==null )? true:false
  const inviteButtonText = (logoImage==null )||(bannerImage==null )? "complete form":"submit"
  const createDisabled = (logoImage==null )||(bannerImage==null )? true:false
  const createButtonText = (logoImage==null )||(bannerImage==null )? "complete form":"submit"
  const [checked, setChecked] = useState(false);


  const handleToggle = (e) => {
    setChecked((prev) => !prev)
   
  };


  const [formData, setFormData] = useState({
    orgName: "",
    orgAdminFirstName: "",
    orgAdminLastName: "",
    orgAdminEmail: "",
  });

  const [errors, setErrors] = useState({
    orgName: false,
    orgAdminFirstName: false,
    orgAdminLastName: false,
    orgAdminEmail: false,
    logoImage: false,
    bannerImage: false,

  });

  function handleInviteFormSubmit(event) {
    event.preventDefault();
    const newErrors = {
      orgName: !formData.orgName,
      orgAdminFirstName: !formData.orgAdminFirstName,
      orgAdminLastName: !formData.orgAdminLastName,
      orgAdminEmail: !formData.orgAdminEmail,
      logoImage: !logoImage,
      bannerImage: !bannerImage,
    };
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid){
      dispatch(
        orgInviteStatus({
          userToken,
          name: formData.orgName,
          firstName: formData.orgAdminFirstName,
          lastName: formData.orgAdminLastName,
          infoEmail: formData.orgAdminEmail,
          logoUrl:  logoImage,
          bannerUrl: bannerImage
        })
      ).then((data) => {
        if(!data.payload.invitedOrg){
          alert(data.payload.message);
        }else{
          alert("Organization has been invited");
          navigate("/confirm_organization");
        }
      });
    }
  }
  function handleCreateFormSubmit(event) {
    event.preventDefault();
    const newErrors = {
      orgName: !formData.orgName,
      orgAdminFirstName: !formData.orgAdminFirstName,
      orgAdminLastName: !formData.orgAdminLastName,
      orgAdminEmail: !formData.orgAdminEmail,
      logoImage: !logoImage,
      bannerImage: !bannerImage,
    };
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid){
      dispatch(
        orgInviteStatus({
          userToken,
          name: formData.orgName,
          firstName: formData.orgAdminFirstName,
          lastName: formData.orgAdminLastName,
          infoEmail: formData.orgAdminEmail,
          logoUrl:  logoImage,
          bannerUrl: bannerImage
        })
      ).then((data) => {
        if(!data.payload.invitedOrg){
          alert(data.payload.message);
        }else{
          alert("Organization has been invited");
          navigate("/confirm_organization");
        }
      });
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <div className="flex flex-row ">
        <div className="flex flex-col justify-center items-center w-none lg:w-2/5 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-canvastudio-3194519.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        <div className="h-full flex-col w-full lg:w-3/5 pb-[70px] ">
          <form
            onSubmit={(e) => handleCreateFormSubmit(e)}
            className="flex flex-row justify-center items-center md:m-h-full h-full  my-20 "
          >
          <div className="flex flex-col justify-center m-h-full h-full lg:w-8/12 w-12/12 px-3">
            {/*<OrgFormToggle checked={checked} handleToggle={handleToggle}/>*/}
            { checked ? (
              <InviteOrgForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            ):(
              <NewOrgForm
                formData={formData}
                setFormData={setFormData}
                logoImage={logoImage}
                setLogoImage={setLogoImage}
                bannerImage={bannerImage}
                setBannerImage={setBannerImage}
                errors={errors}
                setErrors={setErrors}
              />
            )}
              
            <div className="flex flex-col mt-3 h-30 ">
              <button
                type="submit"
                className="
                  h-10 border-0 rounded-md disabled:bg-tkh-brand-tangerine-2 
                  bg-tkh-brand-tangerine-5 
                  drop-shadow-btn text-center text-tkh-grayscale-0 
                  disabled:text-tkh-grayscale-0 font-bold capitalize 
                  hover:bg-tkh-brand-tangerine-1 disabled:hover:bg-tkh-brand-tangerine-1 
                  hover:text-tkh-brand-tangerine-5
                  transition ease-in-out 
                "
              >
                {createButtonText}
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CreateOrg;
