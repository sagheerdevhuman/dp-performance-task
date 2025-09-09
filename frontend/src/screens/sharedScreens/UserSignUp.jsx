import { useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/sharedComponents/NavbarAlt";
import Footer from "../../components/sharedComponents/FooterAlt";
import UserForm from "../../components/sharedComponents/UserForm";
import { registerUser } from "../../redux/user/signUpUserSlice";




function OrgSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const title = "Member Application:"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passwordA: "",
    passwordB: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    passwordA: false,
    passwordB: false,
  });

  function handleInitials(name){
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : nameParts[0].charAt(1);
    const initials = firstInitial + lastInitial;

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue'; // Example background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white'; // Example text color
    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials.toUpperCase(), canvas.width / 2, canvas.height / 2);

    const dataURL = canvas.toDataURL('image/png');
    // Use the dataURL (e.g., set it as the src of an image element)
    return dataURL;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      passwordA: !formData.passwordA,
      passwordB: !formData.passwordB || formData.passwordA !== formData.passwordB,
    }; 
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error);
    
    if (isValid){
      const picture = handleInitials(formData.firstName + " " + formData.lastName)
      dispatch(
        registerUser({
          profileImage: picture,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          passwordA: formData.passwordA,
          passwordB: formData.passwordB,
        })
      ).then((status) => {
        console.log(status)
        if (status.payload) {
          setErrorMessage("");
          navigate("/confirm_email");
        } else {
          setErrorMessage("An account with that email is already registered");
        }
      });
    }
  }

  return (
    <div className="flex flex-col justify-between m-h-screen h-screen w-screen">
      <Navbar />
      <div className="flex flex-row ">
        <div className="flex w-none flex-col justify-center items-center lg:w-1/2 const backgraound bg-center bg-no-repeat bg-cover bg-[url('https://d1yh21d3dzz97r.cloudfront.net/pexels-keira-burton-6147053.jpg')]">
          <div className=" h-full w-full bg-gradient-to-r from-tkh-bg-1/[.55] to-tkh-bg-1/[.75]"/>
        </div>
        <div className="h-full flex-col w-full lg:w-1/2 h-[85vh] p-8">
          <UserForm errors={errors} setErrors={setErrors} setFormData={setFormData} handleSubmit={handleSubmit} formData={formData} errorMessage={errorMessage} title={title}/>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default OrgSignUp;