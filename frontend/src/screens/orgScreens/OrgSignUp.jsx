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

function OrgSignUp() {
  const dispatch = useDispatch();
  const registrationStatus = useSelector((state) => state);
  const orgId = useSelector((state) => state?.orgSignUp?.orgStatus);
  const uploadUrl = useSelector((state) => state?.generateUrl?.url?.uploadURL);
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    infoEmail: "",
    passwordA: "",
    passwordB: "",
    description: "",
    website: "",
    phone: null,
    addressA: "",
    addressB: "",
    city:"",
    state:"",
    zipcode: "",
    logoUrl: "",
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const FormTitles = [
    "Org Application (1/3):",
    "Org Application (2/3):",
    "Completed Application",
  ];

  const signUpOrg = () => {
    let address = formData.addressA + formData.city + formData.state
    dispatch(
      registerOrg({
        name: formData.name,
        firstName: formData.firstName,
        lastName: formData.lastName,
        infoEmail: formData.infoEmail,
        passwordA: formData.passwordA,
        passwordB: formData.passwordB,
        description: formData.description,
        website: formData.website,
        phone: formData.phone,
        addressA: address,
        addressB: formData.addressB,
        zipcode: formData.zipcode,
        logoUrl: selectedImage,
        userId:
      })
    );
  };

  useEffect(() => {
    if (registrationStatus.status === "success") {
      console.log("success");
      registerOrgAdmin();
    }
  }, [registrationStatus, orgId]);

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <PartOneRegistration
          formData={formData}
          setFormData={setFormData}
          page={page}
          setPage={setPage}
          sampleImg={sampleImg}
        />
      );
    } else if (page === 1) {
      return (
        <PartTwoRegistration
          formData={formData}
          setFormData={setFormData}
          page={page}
          setPage={setPage}
          FormTitles={FormTitles}
          sampleImg={sampleImg}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
      );
    } 
  
    else if (page === 2) {
      return <PartFourRegistration />;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (page === FormTitles.length - 1) {
    } else {
      setPage((currPage) => currPage + 1);

      if (page === 0) {
        setPage((currPage) => currPage + 1);
      }

      if (page === 1) {
        signUpOrg();
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      {/* <Navbar /> the Navbar has to be added in global main layout  */}
      <div className="flex flex-row ">
        <div className="flex flex-col justify-center items-center w-2/5 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-canvastudio-3194519.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        <div className="h-full flex-col w-3/5 h-[80vh]">
          <form
            className="flex flex-col lg:flex-row justify-center items-center xl:gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            {PageDisplay()}
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default OrgSignUp;
