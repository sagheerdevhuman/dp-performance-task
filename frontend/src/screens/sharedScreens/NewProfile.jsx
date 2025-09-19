import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import ProfileForm from "../../components/sharedComponents/ProfileForm";
import { createProfile } from "../../redux/user/newProfileSlice";
import cookie from "js-cookie";


function NewProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userID = searchParams.get("user");
  const [errorMessage, setErrorMessage] = useState("");
  const user_id = cookie.get('userId');
  const [level, setLevel] = useState();
  const [gender, setGender] = useState();
  const [stem, setStem] = useState();
  const isProfileConfirmed = cookie.get("profileCofirmed");

  const [formData, setFormData] = useState({
    user_id: user_id,
    past_experience:"",
    portfolio:"",
    education_level:"",
    college_in_stem:"", 
    income_level:"",
    date_of_birth:"",
    gender:"",
    address:"",
    zipcode:"",
});

  const handleChange2 = (value) => {
    try {
      setLevel(value);
      setFormData({
        ...formData,
        education_level: value.value.toLowerCase(),
      });
      if (errors.week_days) {
        setErrors({
          ...errors,
          education_level: false
        });
      }
    } catch (error) {
      return alert(error.message);
    }
  
    
  };
 
  const handleChange3 = (value) => {
    try {
      setGender(value);
      setFormData({
        ...formData,
        gender: value.value.toLowerCase(),
      });
      if (errors.gender) {
        setErrors({ 
          ...errors,
          gender: false
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const handleChange4 = (value) => {
    try {
      setStem(value);
      setFormData({
      ...formData,
      college_in_stem: value.value
      });
      if (errors.college_in_stem) {
        setErrors({
          ...errors,
          college_in_stem: false
        });
      }   
    } catch (error) {
      alert(error.message);
    }
  };

 
  const [errors, setErrors] = useState({
    past_experience:false,
    portfolio:false,
    education_level:false,
    college_in_stem:false,
    income_level:false,
    date_of_birth:false,
    gender:false,
    address:false,
    zipcode:false,
  });


  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      past_experience:!formData.past_experience,
      portfolio:!formData.portfolio,
      education_level:!formData.education_level,
      income_level:!formData.income_level,
      date_of_birth:!formData.date_of_birth,
      gender:!formData.gender,
      address:!formData.address,
      zipcode:!formData.zipcode,
    };
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);
    if (isValid){
      console.log(formData);
      alert("Profile created");
      
      dispatch(
        createProfile({
          user_id: formData.user_id,
          past_experience: formData.past_experience,
          portfolio: formData.portfolio,
          education_level: formData.education_level,
          college_in_stem: formData.college_in_stem,
          income_level: formData.income_level,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          address: formData.address,
          zipcode: formData.zipcode,
        })
      ).then((status) => {
        if (status.payload) {
          setErrorMessage("");
          if(isProfileConfirmed == "false"){
            cookie.set("profileCofirmed", true);
            navigate("/set_preferences");
          }else{
            navigate("/");
          
          }
        } else {
          setErrorMessage("An account with that email is already registered");
        }
      });
    }
  }

    return (
    <div className="flex flex-col justify-between m-h-screen h-screen w-screen">
      {/* <Navbar /> the Navbar has to be added in global main layout  */}
      <div className="flex flex-row ">
        <div className="h-full flex-col w-full lg:w-1/2 h-[85vh] p-8">
          <ProfileForm 
            errors={errors} 
            setErrors={setErrors} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            formData={formData} 
            errorMessage={errorMessage}
            handleChange2={handleChange2}
            handleChange3={handleChange3}
            level={level}
            gender={gender}
            stem={stem}
            handleChange4={handleChange4}
          />
        </div>
        <div className="flex w-none flex-col justify-center items-center lg:w-1/2 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-keira-burton-6147053.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
      </div>
      
      {/* <Footer /> the footer has to be added in global main layout  */}
    </div>
  );
  
}

export default NewProfile;
