import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Select from "react-tailwindcss-select";


function UserForm({errors,setErrors,setFormData,handleSubmit,formData,errorMessage,title}) {
  const [password, setPassword] = useState('');
  const [id, setId] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  
  const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };

  // Enhanced password validation function
  const validatePassword = (password) => {
    const validations = {
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[-.@$!%*?&#]/.test(password),
      passwordsMatch: password === formData.passwordB
    };
    
    setPasswordValidation(validations);
    return validations;
  };

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    
    // Validation function for names - allows hyphens but not as first character, excludes numbers
    const validateName = (inputValue) => {
      // Remove any numbers
      const noNumbers = inputValue.replace(/[0-9]/g, '');
      
      // Check if first character is a hyphen
      if (noNumbers.startsWith('-')) {
        return noNumbers.substring(1); // Remove the leading hyphen
      }
      
      return noNumbers;
    };
    
    const validatedValue = validateName(value);
    const processedValue = validatedValue.charAt(0).toUpperCase() + validatedValue.slice(1);
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toLowerCase(),
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };

  // Enhanced password change handler
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    
    if (name === 'passwordA') {
      setFormData({
        ...formData,
        [name]: value,
      });
      validatePassword(value);
    } else if (name === 'passwordB') {
      setFormData({
        ...formData,
        [name]: value,
      });
      // Update password match validation
      setPasswordValidation(prev => ({
        ...prev,
        passwordsMatch: value === formData.passwordA
      }));
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  // Check if password is valid
  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(validation => validation);
  };

  return (
   
          <form
            className="flex flex-col lg:flex-row  justify-center items-center xl:gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col  lg:w-9/12 justify-start items-start gap-4 bg-[#fff] py-10 2xl:py-20">
              <h1 className="mb-2 lg:w-9/12 text-4xl sm:text-5xl lg:text-4xl  xl:text-3xl 2xl:text-4xl font-bold">
                {title}
              </h1>
              <p className="mb-4 font-normal text-[#585C7B]">Already have an account? <a href="/login" onClick={() => navigate(`/login`)} className="text-[#FF7000] underline ml-1">Sign in here.</a></p>
             
              <label className="flex flex-col text-tkh-grayscale-9 font-bold w-full">
                First name
                <input
                  type="text"
                  className="lg:w-4/5 rounded-lg text-xl  text-pink-500 font-normal text-tkh-grayscale-10 h-[52px]"
                  placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
                  name="firstName"
                  maxLength="32"
                  pattern="[A-Za-z][A-Za-z-]{0,31}"
                  value={formData.firstName}
                  onChange={handleChangeName}
                />
                { errors.firstName && <span style={{color: 'red'}}>First Name is required</span>}
              </label>

              <label className="flex flex-col text-tkh-grayscale-9 font-bold  w-full">
                Last name
                <input
                  type="text"
                  name="lastName"
                  placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
                  className="lg:w-4/5 rounded-lg text-xl font-normal text-pink-500 text-tkh-grayscale-10"
                  pattern="[A-Za-z][A-Za-z-]{0,31}"
                  value={formData.lastName}
                  onChange={handleChangeName}
                />
                { errors.lastName && <span style={{color: 'red'}}>Last Name is required</span>}
              </label>
             
              <label className="flex flex-col text-tkh-grayscale-9 font-bold  w-full">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  className="lg:w-4/5 rounded text-xl  font-normal text-pink-500 text-tkh-grayscale-10"
                  value={formData.email}
                  onChange={handleChangeEmail}
                />
                { errors.email && <span style={{color: 'red'}}>Email is required</span>}
              </label>
              <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold  w-full">
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwordA"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-.@$!%*?&#])[A-Za-z\-.d@$!%*?&#]{8,}$"
                  placeholder="Type here..."
                  className="lg:w-4/5 rounded text-xl font-normal text-pink-500 text-tkh-grayscale-10"
                  value={formData.passwordA}
                  onChange={handleChangePassword}
                />
                <button className="mb-0" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
                { errors.passwordA && <span style={{color: 'red'}}>Password is required</span>}
                
                {/* Password validation checklist */}
                <div className="text-sm mt-2 w-3/4 space-y-1">
                  <div className={`flex items-center ${passwordValidation.hasLength ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasLength ? '✓' : '✗'}</span>
                    At least 8 characters long
                  </div>
                  <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                    Contains at least one uppercase letter (A-Z)
                  </div>
                  <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                    Contains at least one lowercase letter (a-z)
                  </div>
                  <div className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                    Contains at least one number (0-9)
                  </div>
                  <div className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.hasSpecialChar ? '✓' : '✗'}</span>
                    Contains at least one special character (-.@$!%*?&#)
                  </div>
                </div>
              </label>

              <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold  w-full">
                Password confirmation
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="passwordB"
                  placeholder=""
                  className="lg:w-4/5 rounded text-xl font-normal text-pink-500 text-tkh-grayscale-10"
                  value={formData.passwordB}
                  onChange={handleChangePassword}
                />
                <button type="button" onClick={togglePasswordVisibility2}>
                  {showPassword2 ? "Hide" : "Show"}
                </button>
                { errors.passwordB && <span style={{color: 'red'}}>Password Confirmation is required</span>}
                
                {/* Password match validation */}
                {formData.passwordB && (
                  <div className={`text-sm ${passwordValidation.passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidation.passwordsMatch ? '✓' : '✗'}</span>
                    Passwords match
                  </div>
                )}
              </label>

              <div className="mt-3 lg:w-10/12">
                <p className="mb-4 text-tkh-brand-tangerine-3">{errorMessage}</p>
                <button
                  className="h-[52px]  w-full border-0 rounded-md bg-tkh-brand-tangerine-5 drop-shadow-btn text-center text-tkh-grayscale-0 font-bold"
                  type="submit"
                  disabled={!isPasswordValid()}
                >
                  Submit
                </button>
              </div>
            </div>
            
          </form>
  );
}

export default UserForm;
