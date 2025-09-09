import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import sampleImg from "../../assets/login_image.png";
import { registerOrg } from "../../redux/org/signUpOrgSlice";
import { generateUrl } from "../../redux/image/generateUrlSlice";
// import { UploadOrgImageApi } from "../../services/image/UploadOrgImage";
import { PartOneRegistration } from "../../components/orgComponents/PartOneRegistration";
import { PartTwoRegistration } from "../../components/orgComponents/PartTwoRegistration";
import { PartThreeRegistration } from "../../components/orgComponents/PartThreeRegistration";
import { PartFourRegistration } from "../../components/orgComponents/PartFourRegistration";
import { useNavigate } from "react-router-dom";

import cookie from "js-cookie";

function OrgSignUp() {
  const dispatch = useDispatch();
  const registrationStatus = useSelector((state) => state);
  const orgId = useSelector((state) => state?.orgSignUp?.orgStatus);
  const uploadUrl = useSelector((state) => state?.generateUrl?.url?.uploadURL);
  const [page, setPage] = useState(0);
  const userId = cookie.get("userId");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    infoEmail: "",
    description: "",
    website: "",
    phone: null,
    addressA: "",
    addressB: "",
    city:"",
    state:"",
    zipcode: "",
    logoUrl: "",
    bannerUrl:"",
  });

  const [errors, setErrors] = useState({
    name: false,
    infoEmail: false,
    description: false,
    website: false,
    addressA: false,
    addressB: false,
    city: false,
    state: false,
    zipcode: false,
    logoUrl: false,
    bannerUrl: false,

  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const FormTitles = [
    "Org Application:",
    "Confirmation",
    "Completed Application",
  ];

  const signUpOrg = () => {
    let address = formData.addressA + formData.city + formData.state
    const newErrors = {
      name: !formData.name,
      infoEmail: !formData.infoEmail,
      description: !formData.description,
      website: !formData.website,
      addressA: !formData.addressA,
      city: !formData.city,
      state: !formData.state,
      zipcode: !formData.zipcode,
      logoUrl: !selectedImage,
      bannerUrl: !selectedImage2,
    };
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid){
      dispatch(
        registerOrg({
          name: formData.name,
          infoEmail: formData.infoEmail,
          description: formData.description,
          website: formData.website,
          phone: formData.phone,
          addressA: address,
          addressB: formData.addressB,
          zipcode: formData.zipcode,
          logoUrl: selectedImage,
          bannerUrl:selectedImage2,
          userId:userId,
      })).then(() => {
        alert("Organization Registerd!!!!");
        navigate("/org_dashboard");
        
      })
    }
  };

  useEffect(() => {
    if (registrationStatus.status === "success") {
      console.log("success");
    }
  }, [registrationStatus, orgId]);

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <PartTwoRegistration
          formData={formData}
          setFormData={setFormData}
          page={page}
          setPage={setPage}
          FormTitles={FormTitles}
          sampleImg={sampleImg}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedImage2={selectedImage2}
          setSelectedImage2={setSelectedImage2}
          errors={errors}
          setErrors={setErrors}
        />
      );
    } else if (page === 1) {
      return (
        <PartThreeRegistration
          formData={formData}
          setFormData={setFormData}
          page={page}
          setPage={setPage}
          FormTitles={FormTitles}
          sampleImg={sampleImg}
          errors={errors}
          setErrors={setErrors}
        />
      );
    } else if (page === 2) {
      return <PartFourRegistration />;
    } 
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpOrg(event);
  };

  return (

    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Navbar />
      <div className="flex flex-row ">
        <div className=" w-none flex flex-col justify-center items-center lg:w-2/5 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-mikhail-nilov-9301297.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        <div className="h-full flex-col w-full lg:w-3/5 pb-[70px]">
          <form
            className="flex flex-col lg:flex-row justify-center items-center xl:gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <PartTwoRegistration
              formData={formData}
              setFormData={setFormData}
              page={page}
              setPage={setPage}
              FormTitles={FormTitles}
              sampleImg={sampleImg}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              selectedImage2={selectedImage2}
              setSelectedImage2={setSelectedImage2}
              errors={errors}
              setErrors={setErrors}
            />
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default OrgSignUp;
