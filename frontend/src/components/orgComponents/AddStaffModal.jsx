import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const AddStaffModal = ({

  firstName,
  lastName,
  email,
  invitedUserData,
  setInvitedUserData,
  inviteUser,
  handleSkillFormSubmit,
  handleSkillFormRendering,
  modalRendered,
  handleStaffFormRendering,
  handleChange,
  invitedErrors
}) => {
  
  // Email validation state
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    hasAtSymbol: false,
    hasDomain: false,
    hasValidFormat: false,
    isEmpty: true
  });

  // Validation function for names - allows hyphens but not as first character, excludes numbers
  const validateName = (value) => {
    // Remove any numbers
    const noNumbers = value.replace(/[0-9]/g, '');
    
    // Check if first character is a hyphen
    if (noNumbers.startsWith('-')) {
      return noNumbers.substring(1); // Remove the leading hyphen
    }
    
    return noNumbers;
  };

  // Enhanced email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validations = {
      isEmpty: email.length === 0,
      hasAtSymbol: email.includes('@'),
      hasDomain: email.includes('.') && email.split('@')[1]?.includes('.'),
      hasValidFormat: emailRegex.test(email),
      isValid: emailRegex.test(email) && email.length > 0
    };
    
    setEmailValidation(validations);
    return validations;
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = validateName(value);
    
    // Only update if the value is valid or empty
    if (validatedValue === value || validatedValue === value.substring(1)) {
      handleChange(e);
    } else {
      // Create a new event with the validated value
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: validatedValue
        }
      };
      handleChange(newEvent);
    }
  };

  // Enhanced email change handler
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const lowerCaseEmail = value.toLowerCase();
    
    setInvitedUserData({
      ...invitedUserData,
      [name]: lowerCaseEmail,
    });
    
    // Validate email
    validateEmail(lowerCaseEmail);
    
    if (invitedErrors[name]) {
      setInvitedErrors({
        ...invitedErrors,
        [name]: false
      });
    }
  };

  if (modalRendered) {
    return (
      <div className="flex flex-col justify-center items-center fixed top-0 z-10  h-screen w-full ">
      <div className="flex flex-col max-w-[500px] w-[80vw] p-[24px] drbrand-tangerine-5 drop-shadow-card rounded-[15px] bg-[#fff] ">
        <div className="flex flex-row justify-between items-center mb-[24px]">
          <h1 className="text-[14px] font-[700] ">Add Staff</h1>
        </div>
          <form className="flex flex-col gap-[24px]" onSubmit={(e) => inviteUser(e)}>
        
            <div >
              <label
                htmlFor="firstName"
                lassName="block text-sm font-medium text-tkh-grayscale-10"
              >
                First Name (required):
              </label>
              <div className="mt-1">
                <input
                  
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={handleNameChange}
                  autoComplete="given-name"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                  placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
                />
              </div>
              {invitedErrors.firstName && <span style={{color: 'red'}}>First Name is required</span>}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Last Name (required):
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={handleNameChange}
                  autoComplete="family-name"
                  className="block w-full h-[44px] shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
                />
              </div>
              {invitedErrors.lastName && <span style={{color: 'red'}}>Last Name is required</span>}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Email (required):
              </label>
              <div className="mt-1">
                <input
                  
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  className={`block w-full h-[44px] shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md ${
                    email && !emailValidation.isValid ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter valid email address"
                />
              </div>
              {invitedErrors.email && <span style={{color: 'red'}}>Email is required</span>}
              
              {/* Email validation feedback */}
              {email && (
                <div className="text-sm mt-2 space-y-1">
                  <div className={`flex items-center ${emailValidation.hasAtSymbol ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{emailValidation.hasAtSymbol ? '✓' : '✗'}</span>
                    Contains @ symbol
                  </div>
                  <div className={`flex items-center ${emailValidation.hasDomain ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{emailValidation.hasDomain ? '✓' : '✗'}</span>
                    Has valid domain format
                  </div>
                  <div className={`flex items-center ${emailValidation.hasValidFormat ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{emailValidation.hasValidFormat ? '✓' : '✗'}</span>
                    Valid email format
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1">
                <select
                  required
                  id="role"
                  name="role"
                  onChange={(e) => {
                    if (e.target.value == "Org Admin") {
                      setInvitedUserData({
                        ...invitedUserData,
                        isOrgAdmin: true,
                        isOrgUser: false,
                      });
                    } else {
                      setInvitedUserData({
                        ...invitedUserData,
                        isOrgAdmin: false,
                        isOrgUser: true,
                      });
                    }
                  }}
                  autoComplete="user-role"
                  className="block w-full h-[44px] shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <option>Org Staff</option>
                  <option>Org Admin</option>
                </select>
              </div>
            </div>

            <div className=" flex flex-row justify-end items-center">
              <button
                type="button"
                className="bg-tkh-grayscale-4 py-2 px-4 h-[35px] w-[134px] rounded-full shadow-sm text-sm font-medium text-gray-700 mr-[10px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={(e) => {
                  handleStaffFormRendering(e);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" inline-flex items-center h-[35px] w-[134px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded-full text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm text-[10px] hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};


