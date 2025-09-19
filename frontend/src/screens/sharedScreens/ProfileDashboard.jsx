import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import { changeProfile } from "../../redux/user/updateProfileSlice";
import { changeUser } from "../../redux/user/updateUserSlice";
import { getUserProfile } from "../../redux/user/fetchUserProfileSlice";
import { changeUserPassword } from "../../redux/user/updateUserPasswordSlice";
// import { fetchPreferences } from "../../redux/user/getPreferencesSlice";
import ProfileForm from "../../components/sharedComponents/ProfileForm2";
import { FilterdContent } from "../../components/sharedComponents/FilterdContent";
import { getQualifiedUserContent } from "../../redux/user/qualifiedUserContentSlice";
import { signOutUser } from "../../redux/user/userLogoutSlice";
import FileUploader from "../../components/orgComponents/FileUploader";
import Select from "react-tailwindcss-select";
import profileIcon from "../../assets/user.svg";
import cookie from "js-cookie";

function ProfileDashboard() {
  const user_id = cookie.get('userId')
  const qualifiedUserContent = useSelector((state) => state?.getQualifiedUserContent?.content);
  const userProfile = useSelector((state) => state?.getUserProfile?.profile);
  const userProfileStatus = useSelector((state) => state?.getUserProfile?.status);
  const isUser = cookie.get("isUser")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQualifiedUserContent({user_id: user_id}));
    dispatch(getUserProfile({user_id: user_id}));
  }, []);


  console.log("userProfile: ", userProfile)
  // Pre-populate forms when user profile data is loaded
  useEffect(() => {
    if (userProfile) {
      // Pre-populate formData with user profile information
      setFormData(prevData => ({
        ...prevData,
        past_experience: userProfile.past_experience || "",
        portfolio: userProfile.portfolio || "",
        education_level: userProfile.education_level || "",
        income_level: userProfile.income_level || "",
        date_of_birth: userProfile.date_of_birth || "",
        gender: userProfile.gender || "",
        address: userProfile.address || "",
        zipcode: userProfile.zipcode || "",
      }));

      // Set education level for Select component
      if (userProfile.education_level) {
        const educationOption = educationOptions.find(option => 
          option.value.toLowerCase() === userProfile.education_level.toLowerCase()
        );
        if (educationOption) {
          setLevel(educationOption);
        }
      }

      // Set gender for Select component
      if (userProfile.gender) {
        const genderOption = genderOptions.find(option => 
          option.value.toLowerCase() === userProfile.gender.toLowerCase()
        );
        if (genderOption) {
          setGender(genderOption);
        }
      }
      // if (userProfile.college_in_stem) {
      //   const stemOption = collegeInStemOptions.find(option => 
      //     option.value.toLowerCase() === userProfile.college_in_stem.toLowerCase()
      //   );
      //   if (stemOption) {
      //     setStem(stemOption);
      //   }
      // }
    }
  }, [userProfile, userProfile]);


  const buttons = [
    {
      title: "Account Details",
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" >
          <path d="M10.0013 13.3333C11.8396 13.3333 13.3346 11.8383 13.3346 9.99999C13.3346 8.16166 11.8396 6.66666 10.0013 6.66666C8.16297 6.66666 6.66797 8.16166 6.66797 9.99999C6.66797 11.8383 8.16297 13.3333 10.0013 13.3333ZM10.0013 8.33332C10.9046 8.33332 11.668 9.09666 11.668 9.99999C11.668 10.9033 10.9046 11.6667 10.0013 11.6667C9.09797 11.6667 8.33464 10.9033 8.33464 9.99999C8.33464 9.09666 9.09797 8.33332 10.0013 8.33332Z" />
          <path d="M2.37184 13.4467L3.20517 14.8883C3.64767 15.6525 4.71267 15.9392 5.48017 15.4967L5.921 15.2417C6.406 15.6225 6.9385 15.935 7.501 16.1683V16.6667C7.501 17.5858 8.2485 18.3333 9.16767 18.3333H10.8343C11.7535 18.3333 12.501 17.5858 12.501 16.6667V16.1683C13.0635 15.935 13.596 15.6225 14.081 15.2425L14.5218 15.4975C15.291 15.9392 16.3535 15.6542 16.7977 14.8883L17.6302 13.4475C18.0902 12.6517 17.8168 11.63 17.021 11.1708L16.6002 10.9275C16.6452 10.6183 16.6677 10.3092 16.6677 9.99999C16.6677 9.69082 16.6452 9.38082 16.6002 9.07416L17.021 8.83082C17.8168 8.37082 18.0902 7.34999 17.6302 6.55416L16.7977 5.11332C16.3552 4.34666 15.291 4.05916 14.5218 4.50332L14.081 4.75832C13.596 4.37749 13.0635 4.06499 12.501 3.83166V3.33332C12.501 2.41416 11.7535 1.66666 10.8343 1.66666H9.16767C8.2485 1.66666 7.501 2.41416 7.501 3.33332V3.83166C6.9385 4.06499 6.406 4.37749 5.921 4.75749L5.48017 4.50249C4.71017 4.05999 3.64684 4.34666 3.20434 5.11249L2.37184 6.55332C1.91184 7.34916 2.18517 8.37082 2.981 8.82999L3.40184 9.07332C3.35684 9.38082 3.33434 9.69082 3.33434 9.99999C3.33434 10.3092 3.35684 10.6183 3.40184 10.9258L2.981 11.1692C2.18517 11.6292 1.91184 12.6508 2.37184 13.4467ZM5.1435 11.1483C5.04934 10.7708 5.001 10.3842 5.001 9.99999C5.001 9.61499 5.04934 9.22832 5.14267 8.85166C5.23267 8.49082 5.0735 8.11416 4.751 7.92832L3.81517 7.38666L4.64684 5.94582L5.601 6.49749C5.921 6.68166 6.3235 6.63499 6.591 6.37916C7.16017 5.83999 7.84684 5.43666 8.57767 5.21332C8.9285 5.10666 9.16767 4.78249 9.16767 4.41666V3.33332H10.8343V4.41666C10.8343 4.78249 11.0735 5.10666 11.4243 5.21332C12.1552 5.43749 12.8418 5.83999 13.411 6.37916C13.6785 6.63499 14.0827 6.68082 14.401 6.49749L15.3543 5.94666L16.1877 7.38749L15.251 7.92832C14.9285 8.11499 14.7693 8.49166 14.8593 8.85166C14.9527 9.22832 15.001 9.61499 15.001 9.99999C15.001 10.3842 14.9527 10.7708 14.8585 11.1483C14.7693 11.5092 14.9285 11.8858 15.251 12.0717L16.1868 12.6125L15.3552 14.0533L14.401 13.5025C14.0818 13.3183 13.6785 13.3642 13.411 13.6208C12.8418 14.16 12.1552 14.5633 11.4243 14.7867C11.0735 14.8933 10.8343 15.2175 10.8343 15.5833L10.836 16.6667H9.16767V15.5833C9.16767 15.2175 8.9285 14.8933 8.57767 14.7867C7.84684 14.5625 7.16017 14.16 6.591 13.6208C6.43267 13.4692 6.226 13.3917 6.01767 13.3917C5.87434 13.3917 5.731 13.4283 5.601 13.5033L4.64767 14.055L3.81434 12.6142L4.751 12.0717C5.0735 11.8858 5.23267 11.5092 5.1435 11.1483Z" />
        </svg>,
    },{
      title: "Profile and Security",
      svg:<svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
          <path d="M9.9987 1.66666C7.7012 1.66666 5.83203 3.53582 5.83203 5.83332V8.33332H4.9987C4.07953 8.33332 3.33203 9.08082 3.33203 9.99999V16.6667C3.33203 17.5858 4.07953 18.3333 4.9987 18.3333H14.9987C15.9179 18.3333 16.6654 17.5858 16.6654 16.6667V9.99999C16.6654 9.08082 15.9179 8.33332 14.9987 8.33332H14.1654V5.83332C14.1654 3.53582 12.2962 1.66666 9.9987 1.66666ZM14.9987 9.99999L15.0004 16.6667H4.9987V9.99999H14.9987ZM7.4987 8.33332V5.83332C7.4987 4.45499 8.62036 3.33332 9.9987 3.33332C11.377 3.33332 12.4987 4.45499 12.4987 5.83332V8.33332H7.4987Z" fill="#9397AD"/>
        </svg>
    },{
      title: "Recommended Programs",
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" >
            <path d="M14.9987 1.66666H4.9987C4.07953 1.66666 3.33203 2.41416 3.33203 3.33332V7.72999V8.33332V18.3333L9.9987 14.5233L16.6654 18.3333V8.33332V7.72999V3.33332C16.6654 2.41416 15.9179 1.66666 14.9987 1.66666ZM14.9987 15.4608L9.9987 12.6042L4.9987 15.4608V8.33332V7.72999V3.33332H14.9987V7.72999V8.33332V15.4608Z"/>
          </svg>
    },{
      title: "Sign Out",
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" >
              <path d="M13.3346 10.8333V9.16666H5.83464V6.66666L1.66797 9.99999L5.83464 13.3333V10.8333H13.3346Z" />
              <path d="M16.6667 2.5H9.16667C8.2475 2.5 7.5 3.2475 7.5 4.16667V7.5H9.16667V4.16667H16.6667V15.8333H9.16667V12.5H7.5V15.8333C7.5 16.7525 8.2475 17.5 9.16667 17.5H16.6667C17.5858 17.5 18.3333 16.7525 18.3333 15.8333V4.16667C18.3333 3.2475 17.5858 2.5 16.6667 2.5Z" />
            </svg>
    }
  ];
  const buttons2 = [
    {
      title: "Profile and Security",
      svg:<svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
          <path d="M9.9987 1.66666C7.7012 1.66666 5.83203 3.53582 5.83203 5.83332V8.33332H4.9987C4.07953 8.33332 3.33203 9.08082 3.33203 9.99999V16.6667C3.33203 17.5858 4.07953 18.3333 4.9987 18.3333H14.9987C15.9179 18.3333 16.6654 17.5858 16.6654 16.6667V9.99999C16.6654 9.08082 15.9179 8.33332 14.9987 8.33332H14.1654V5.83332C14.1654 3.53582 12.2962 1.66666 9.9987 1.66666ZM14.9987 9.99999L15.0004 16.6667H4.9987V9.99999H14.9987ZM7.4987 8.33332V5.83332C7.4987 4.45499 8.62036 3.33332 9.9987 3.33332C11.377 3.33332 12.4987 4.45499 12.4987 5.83332V8.33332H7.4987Z" fill="#9397AD"/>
        </svg>
    },{
      title: "Sign Out",
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" >
              <path d="M13.3346 10.8333V9.16666H5.83464V6.66666L1.66797 9.99999L5.83464 13.3333V10.8333H13.3346Z" />
              <path d="M16.6667 2.5H9.16667C8.2475 2.5 7.5 3.2475 7.5 4.16667V7.5H9.16667V4.16667H16.6667V15.8333H9.16667V12.5H7.5V15.8333C7.5 16.7525 8.2475 17.5 9.16667 17.5H16.6667C17.5858 17.5 18.3333 16.7525 18.3333 15.8333V4.16667C18.3333 3.2475 17.5858 2.5 16.6667 2.5Z" />
            </svg>
    }
  ];
  const [activeButton, setActiveButton] = useState(isUser == "true" ? buttons[0] : buttons2[0]);
  const userId = cookie.get("userId");
  const firstName = cookie.get("firstName");
  const lastName = cookie.get("lastName");
  const email = cookie.get("email");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState();
  const [gender, setGender] = useState();
  const [stem, setStem] = useState();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const fullName = `${firstName} ${lastName}`;
  const profileImage = cookie.get("profileImage")
  const preferences = useSelector((state) => state?.getPreferences?.preferences);
  const preferencesStatus = useSelector((state) => state?.getPreferences?.status);
  const [errors2, setErrors2] = useState({
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
  const [currentFormData, setCurrentFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    currentPassword: "",
    passwordA: "",
    passwordB: ""
  });

  function handleScurityFormSubmit(event) {
    event.preventDefault();
    dispatch(
      showPasswordReset && currentFormData.passwordA && currentFormData.passwordB
        ? changeUserPassword({
            userId: userId,
            currentPassword: currentFormData.currentPassword,
            passwordA: currentFormData.passwordA,
            passwordB: currentFormData.passwordB,
          })
        : changeUser({
            userId: userId,
            firstName: !currentFormData.firstName
              ? firstName
              : currentFormData.firstName,
            lastName: !currentFormData.lastName
              ? lastName
              : currentFormData.lastName,
            email: !currentFormData.email ? email : currentFormData.email,

          })
    ).then(() => {
      return handleLogOut();
    });
  }


  const educationOptions = [
    { value: "Less than High School", label: "Less than High School" },
    { value: "High School Diploma or Equivalent (GED)", label: "High School Diploma or Equivalent (GED)" },
    { value: "Some College (No Degree)", label: "Some College (No Degree)" },
    { value: "Trade/Technical/Vocational Training", label: "Trade/Technical/Vocational Training" },
    { value: "Associate's Degree", label: "Associate's Degree" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "Professional Degree", label: "Professional Degree" },
    { value: "Doctorate Degree", label: "Doctorate Degree" }
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Non-binary", label: "Non-binary" },
    { value: "Transgender", label: "Transgender" },
    { value: "Gender fluid", label: "Gender fluid" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" }
  ];
  const collegeInStemOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user wants to change password (toggle is on)
      const isChangingPassword = showPasswordReset;
      
      // Validate current password is provided if changing password
      if (isChangingPassword && !currentFormData.currentPassword) {
        alert("Current password is required to change your password!");
        return;
      }
      
      // Validate password match if changing password
      if (isChangingPassword && currentFormData.passwordA !== currentFormData.passwordB) {
        alert("New passwords do not match!");
        return;
      }

      // Validate both new password fields are filled if changing password
      if (isChangingPassword && (!currentFormData.passwordA || !currentFormData.passwordB)) {
        alert("Please fill in both new password fields!");
        return;
      }
      console.log("selectedImage: ", selectedImage)

      dispatch(
        isChangingPassword ? changeUserPassword({
          userId: userId,
          currentPassword: currentFormData.currentPassword,
          passwordA: currentFormData.passwordA,
          passwordB: currentFormData.passwordB,
        }) : changeUser({ 
          userId: userId,
          firstName: currentFormData.firstName || firstName,
          lastName: currentFormData.lastName || lastName,
          email: currentFormData.email || email,
          profileUrl: selectedImage || profileImage
          })
      ).then((res) => {
        console.log("res: ", res)
        alert("Basic information updated successfully!");
        // Clear password fields and hide password reset after successful update
        setCurrentFormData(prev => ({
          ...prev,
          currentPassword: "",
          passwordA: "",
          passwordB: ""
        }));
        setShowPasswordReset(false);
        if(isChangingPassword){
          return handleLogOut();
        }
      });
    } catch (error) {
      console.error("Error updating basic information:", error);
      alert("Failed to update basic information");
    }
  };

  function handleProfileInfoSubmit(e) {
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
      
      dispatch(
        changeProfile({
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
          alert("Profile information updated successfully!");
        } else {
          setErrorMessage("An account with that email is already registered");
        }
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCurrentFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentFormData({
      ...currentFormData,
      [name]: value
    });
  };

  const handleEducationChange = (value) => {
    setLevel(value);
    setFormData({
      ...formData,
      education_level: value.value
    });
  };
  const handleLogOut = (e) => {
    dispatch(signOutUser({ user_id: userId })).then(() => {
      window.location.reload(true);
    });
  }

  const handleGenderChange = (value) => {
    setGender(value);
    setFormData({
      ...formData,
      gender: value.value
    });
  };
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

  function handleActiveButton(button) {

    setActiveButton(button);
    console.log(button)
    cookie.set("active", button);
  }

  return (
    <div className="flex flex-col min-h-screen">
     {/* <Navbar /> the Navbar has to be added in global main layout  */}
      <div className="flex flex-row  ">
        <div className="flex flex-col items-center justify-center h-full w-2/5 pt-20">
         <div className="flex flex-col items-center  h-screen w-[320px] border-r-[1px] border-[#E2E5F1]">
          <img src={profileImage || profileIcon} alt="Profile" className="w-[120px] h-[120px] rounded-full object-fit" />
          <p className="text-[#131022] text-[24px] font-bold">{fullName}</p>
          <p className="text-[#585C7B] text-[16px] mb-[32px]">{email}</p>
         {isUser == "true" && buttons.map((button, index) => (
            <>
              {button.title == "Sign Out" && (
                <> 
                  <div className={
                    "flex flex-row gap-2  items-center fill-[#9397AD] w-[306px] h-[50px] px-4 py-2 my-4" +
                    (activeButton.title == button.title
                      ? " bg-blue-600 drop-shadow-btn text-white rounded-md  fill-white hover:bg-tkh-brand-tangerine-2"
                      : "text-tkh-grayscale-10 rounded-md hover:bg-tkh-brand-tangerine-2 hover:text-white hover:fill-white ")
                  }
                  onClick={(e) => handleLogOut(e)}
                  >
                    
                    <div key={index}>{button.svg}</div>
                    {button.title}
                  </div>
                </>
              )}{button.title !== "Sign Out" && (
                <> 
                  <div className={
                    "flex flex-row gap-2  items-center fill-[#9397AD] w-[306px] h-[50px] px-4 py-2 my-4" +
                    (activeButton.title == button.title
                      ? " bg-blue-600 drop-shadow-btn text-white rounded-md  fill-white hover:bg-tkh-brand-tangerine-2"
                      : "text-tkh-grayscale-10 rounded-md hover:bg-tkh-brand-tangerine-2 hover:text-white hover:fill-white ")
                  }
                  onClick={(e) => handleActiveButton(button)}
                  >
                    
                    <div key={index}>{button.svg}</div>
                    {button.title}
                  </div>
                </>
              )}
            </>
          ))}
          {isUser == "false" && buttons2.map((button, index) => (
             <>
             {button.title == "Sign Out" && (
               <> 
                 <div className={
                   "flex flex-row gap-2  items-center fill-[#9397AD] w-[306px] h-[50px] px-4 py-2 my-4" +
                   (activeButton.title == button.title
                     ? " bg-blue-600 drop-shadow-btn text-white rounded-md  fill-white hover:bg-tkh-brand-tangerine-2"
                     : "text-tkh-grayscale-10 rounded-md hover:bg-tkh-brand-tangerine-2 hover:text-white hover:fill-white ")
                 }
                 onClick={(e) => handleLogOut(e)}
                 >
                   
                   <div key={index}>{button.svg}</div>
                   {button.title}
                 </div>
               </>
             )}{button.title !== "Sign Out" && (
               <> 
                 <div className={
                   "flex flex-row gap-2  items-center fill-[#9397AD] w-[306px] h-[50px] px-4 py-2 my-4" +
                   (activeButton.title == button.title
                     ? " bg-blue-600 drop-shadow-btn text-white rounded-md  fill-white hover:bg-tkh-brand-tangerine-2"
                     : "text-tkh-grayscale-10 rounded-md hover:bg-tkh-brand-tangerine-2 hover:text-white hover:fill-white ")
                 }
                 onClick={(e) => handleActiveButton(button)}
                 >
                   
                   <div key={index}>{button.svg}</div>
                   {button.title}
                 </div>
               </>
             )}
           </>
          ))}
          </div>
        </div>
  

      
        <div className="flex-col items-start w-4/5 pr-[100px] pt-[100px]">
          <>
            {activeButton.title == "Account Details" && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                {userProfileStatus === "loading" && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Loading profile information...</p>
                  </div>
                )}
                {userProfileStatus === "success" && (
                  <div>
                    <ProfileForm 
                      errors={errors2}
                      setErrors={setErrors2}
                      setFormData={setFormData}
                      handleSubmit={handleProfileInfoSubmit}
                      formData={formData}
                      handleChange={handleChange}
                      handleChange2={handleChange2}
                      handleChange3={handleChange3}
                      handleChange4={handleChange4}
                      level={level}
                      gender={gender}
                      stem={stem}/>
                  </div>
                )}
              </div>
            )}

            {activeButton.title == "Recommended Programs" && (
              <FilterdContent qualifiedUserContent={qualifiedUserContent}/>
            )}

            {activeButton.title == "Profile and Security" && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                      <FileUploader setFile={setSelectedImage} errors={errors} setErrors={setErrors} type="profileImage" />
                      {selectedImage && (
                        <img src={selectedImage} alt="Profile" className="mt-2 h-20 w-20 rounded-full object-cover" />
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={currentFormData.firstName}
                        onChange={handleCurrentFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={currentFormData.lastName}
                        onChange={handleCurrentFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={currentFormData.email}
                        onChange={handleCurrentFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">Password</label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowPasswordReset(!showPasswordReset);
                              // Clear password fields when hiding
                              if (showPasswordReset) {
                                setCurrentFormData(prev => ({
                                  ...prev,
                                  currentPassword: "",
                                  passwordA: "",
                                  passwordB: ""
                                }));
                              }
                            }}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {showPasswordReset ? "Cancel Password Change" : "Change Password"}
                          </button>
                        </div>
                        {!showPasswordReset && (
                          <p className="mt-1 text-sm text-gray-500">Click "Change Password" to update your password</p>
                        )}
                      </div>
                    </div>

                    {showPasswordReset && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={currentFormData.currentPassword}
                            onChange={handleCurrentFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter current password"
                          />
                          <p className="mt-1 text-sm text-gray-500">Required to change password</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">New Password</label>
                          <input
                            type="password"
                            name="passwordA"
                            value={currentFormData.passwordA}
                            onChange={handleCurrentFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter new password"
                          />
                          <p className="mt-1 text-sm text-gray-500">Enter your new password</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                          <input
                            type="password"
                            name="passwordB"
                            value={currentFormData.passwordB}
                            onChange={handleCurrentFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Confirm new password"
                          />
                          <p className="mt-1 text-sm text-gray-500">Must match new password</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Save Basic Info
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        </div>
      </div>
       {/* <Footer /> the footer has to be added in global main layout  */} 
    </div>
  );
}

export default ProfileDashboard; 