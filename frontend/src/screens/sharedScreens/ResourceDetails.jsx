import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/FooterAlt";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceById } from "../../redux/resources/fetchResourceByIdSlice";
import { changeResource } from "../../redux/resources/updateResourceSlice";
import { Hero } from "../../components/sharedComponents/HeroAlt";
import cookie from "js-cookie";
import { getResourceList } from "../../redux/resources/fetchAllResourcesSlice";
import NavbarAlt from "../../components/sharedComponents/NavbarAlt";
function ResourceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getResource = useSelector((state) => state?.getResourceById);
  const [resource, setResource] = useState(null);
  const [admin, setAdmin] = useState();
  const [formData, setFormData] = useState();
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const isOrgAdmin = cookie.get("isOrgAdmin")
  const isOrgUser = cookie.get("isOrgUser")
  const orgId = cookie.get("orgId")
  const isUser = cookie.get("isUser")
  const userId = cookie.get("userId");
  
  useEffect(() => {
    dispatch(getResourceById({ resource_id: id }));
    dispatch(getResourceList());
  }, [dispatch, id]);
  console.log("resource",resource)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeResource({
        resource_id: formData.resource_id,
        name: formData.name,
        description: formData.description,
        link: formData.link,
        category: formData.category,
        tags: formData.tags,
        banner_url: formData.banner_url,
        is_active: formData.is_active,
        requirements: formData.requirements,
        target_audience: formData.target_audience,
        difficulty_level: formData.difficulty_level,
        duration: formData.duration,
        cost: formData.cost,
        language: formData.language,
        format: formData.format,
        access_type: formData.access_type,
      })
    ).then((changeResource) => {
      window.location.reload(false);
    }) 
  };


  useEffect(() => {
    if (getResource?.status == "success" ) {
      
      setResource(getResource?.resource);
      setFormData({
        resource_id: getResource?.resource.resource_id,
        name: getResource?.resource.name,
        description: getResource?.resource.description,
        link: getResource?.resource.link,
        category: getResource?.resource.category,
        tags: getResource?.resource.tags,
        banner_url: getResource?.resource.banner_url,
        is_active: getResource?.resource.is_active,
        requirements: getResource?.resource.requirements,
        target_audience: getResource?.resource.target_audience,
        difficulty_level: getResource?.resource.difficulty_level,
        duration: getResource?.resource.duration,
        cost: getResource?.resource.cost,
        language: getResource?.resource.language,
        format: getResource?.resource.format,
        access_type: getResource?.resource.access_type,
      })
      const timerId = setTimeout(() => {
        window.location.href = `${getResource?.resource.link}`;
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [getResource]);
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     window.location.href = getResource?.resource.link; // Replace with your target URL
  //   }, 5000); // 5-second delay

  //   // Cleanup function to clear the timeout if the component unmounts before the delay finishes
  //   return () => clearTimeout(timerId);
  // }, []); // Empty dependency array ensures this runs only once on mount



  // Public view
  if (resource) {
    return (
      <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
        <NavbarAlt />
        <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1 background-image-2">
          <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-tkh-grayscale-1 background-image">
            <div className="flex flex-col text-[#fff] text-center justify-center items-center mb-[10vh]">           
              <img className="mb-[47px] h-[142px] " src="https://dz55dwgyhzv2a.cloudfront.net/DP%20Digital%20Pipeline%20white.png" />
              <p className="text-4xl md:text-[48px] leading-tight mb-3 font-[800] max-w-[70vw] ">You are being redirected to another site</p>
              <p className="mb-[36px] text-[20px] font-[900] md:w-[856px] max-w-[70vw]" >We are not responsible for the content, privacy practices, or security of external sites. Proceed at your own discretion.</p>
              <button className="flex h-[52px] text-[16px] font-[600] justify-center items-center gap-2 py-2 w-[271px] bg-tkh-brand-tangerine-5 px-4 rounded-md  drop-shadow-btn font-semibold  hover:bg-tkh-brand-tangerine-2 hover:border-tkh-brand-tangerine-2" onClick={() =>navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5.00391 22H9.00391H15.0039H19.0039C20.1069 22 21.0039 21.103 21.0039 20V11C21.0039 10.735 20.8989 10.48 20.7109 10.293L12.7109 2.29301C12.3199 1.90201 11.6879 1.90201 11.2969 2.29301L3.29691 10.293C3.10891 10.48 3.00391 10.735 3.00391 11V20C3.00391 21.103 3.90091 22 5.00391 22ZM10.0039 20V15H14.0039V20H10.0039ZM5.00391 11.414L12.0039 4.41401L19.0039 11.414L19.0049 20H16.0039V15C16.0039 13.897 15.1069 13 14.0039 13H10.0039C8.90091 13 8.00391 13.897 8.00391 15V20H5.00391V11.414Z" fill="white"/>
                </svg>
                Go to homepage
              </button>  
            </div>
          </div>
        </div>
        <style jsx>{`
        



      .background-image {
      background: linear-gradient(180deg, rgba(19, 16, 34, 0.41) 0%, rgba(19, 16, 34, 0.56) 100%, rgba(19, 16, 34, 0.56) 100%);
       
      }
      .background-image-2 {
        background-image: url(https://bxtp-static.s3.amazonaws.com/img/bg/bg_5.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    `}</style>
      </div>
    );
  }
  
  // Loading state
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen bg-tkh-grayscale-1">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tkh-brand-tangerine-5 mx-auto mb-4"></div>
          <p className="text-tkh-grayscale-6">Loading resource...</p>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetails;
