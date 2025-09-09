import moment from "moment";
import { useState, useEffect } from "react";
import ft from "format-time";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";

export const InviteOrgForm = ({
  formData,
  setFormData,
  logoImage,
  setLogoImage,
  bannerImage,
  setBannerImage,
  errors,
  setErrors,
}) => {
  // Email validation state
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    hasAtSymbol: false,
    hasDomain: false,
    hasValidFormat: false,
    isEmpty: true
  });

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
  
  const handleChangeBasic = (e) => {
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
    
    // Apply name validation for firstName and lastName fields
    if (name === 'orgAdminFirstName' || name === 'orgAdminLastName') {
      const validatedValue = validateName(value);
      setFormData({
        ...formData,
        [name]: validatedValue
      });
    } else if (name === 'email') {
      // Handle email validation
      const lowerCaseEmail = value.toLowerCase();
      setFormData({
        ...formData,
        orgAdminEmail: lowerCaseEmail
      });
      validateEmail(lowerCaseEmail);
    } else {
      // Original logic for other fields
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };
  return (
    <>
      <div className=" flex flex-col mb-3  text-center md:text-left">
        <h1 className="text-4xl font-bold">Invite an Organization:</h1>
        <h2 className="text-4xl">Organization Information</h2>
      </div>
      <label className="flex flex-col mb-3 text-tkh-grayscale-7">
        Organization Name*
        <input
          type="text"
          className="rounded text-pink-500 text-tkh-grayscale-10"
          placeholder="Type here..."
          name="orgName"
          value={formData.orgName}
          onChange={handleChangeBasic}
        />
        { errors.orgName && <span style={{color: 'red'}}>Organization Name is required</span>}
      </label>

      <label className="flex flex-col mb-3 text-tkh-grayscale-7">
        Contact First Name*
        <input
          type="text"
          className="rounded text-pink-500 text-tkh-grayscale-10"
          placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
          name="orgAdminFirstName"
          value={formData.orgAdminFirstName}
          onChange={handleChangeBasic}
        />
        { errors.orgAdminFirstName && <span style={{color: 'red'}}> Contact First Name is required</span>}
      </label>

      <label className="flex flex-col mb-3 text-tkh-grayscale-7">
        Contact Last Name*
        <input
          type="text"
          className="rounded text-pink-500 text-tkh-grayscale-10"
          placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
          name="orgAdminLastName"
          value={formData.orgAdminLastName}
          onChange={handleChangeBasic}
        />
        { errors.orgAdminLastName && <span style={{color: 'red'}}> Contact Last Name is required</span>}
      </label>

      <label className="flex flex-col mb-3 text-tkh-grayscale-7">
        Contact Email *
        <input
          type="email"
          name="email"
          placeholder="Enter valid email address"
          className={`rounded text-pink-500 text-tkh-grayscale-10 ${
            formData.orgAdminEmail && !emailValidation.isValid ? 'border-red-500' : ''
          }`}
          value={formData.orgAdminEmail}
          onChange={handleChangeBasic}
        />
         { errors.orgAdminEmail && <span style={{color: 'red'}}> Contact Email is required</span>}
         
         {/* Email validation feedback */}
         {formData.orgAdminEmail && (
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
      </label>


      <style jsx>{`
        .seclect-menu {
          background: white;
        }
        .tag-item {
          background: #23a5a9;
          border: #f07500;
          color: #fff;
          padding-top: 2px;
          padding-bottom: 2px;
        }
      `}</style>
    </>
  );
};
