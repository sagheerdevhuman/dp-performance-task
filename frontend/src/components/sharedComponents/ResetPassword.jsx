import React, { useState } from "react";

export const ResetPassword = ({
  currentFormData,
  newFormData,
  isResetShown,
  setResetShown,
}) => {
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  // Enhanced password validation function
  const validatePassword = (password) => {
    const validations = {
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[-.@$!%*?&#]/.test(password),
      passwordsMatch: password === currentFormData.passwordB
    };
    
    setPasswordValidation(validations);
    return validations;
  };

  // Enhanced password change handler
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'passwordA') {
      newFormData({
        ...currentFormData,
        [name]: value,
      });
      validatePassword(value);
    } else if (name === 'passwordB') {
      newFormData({
        ...currentFormData,
        [name]: value,
      });
      // Update password match validation
      setPasswordValidation(prev => ({
        ...prev,
        passwordsMatch: value === currentFormData.passwordA
      }));
    }
  };

  if (isResetShown) {
    return (
      <div className="flex flex-col justify-center gap-[24px]">
        <label className="block text-sm font-medium text-tkh-grayscale-10">
          New Password
          <input
            type="password"
            name="passwordA"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-.@$!%*?&#])[A-Za-z\-.d@$!%*?&#]{8,}$"
            className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
            placeholder="Type here..."
            value={currentFormData.passwordA}
            onChange={handlePasswordChange}
            required
          />
          
          {/* Password validation checklist */}
          <div className="text-sm mt-2 space-y-1">
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

        <label className="block text-sm font-medium text-tkh-grayscale-10">
          New Password Confirmation
          <input
            type="password"
            name="passwordB"
            className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
            placeholder="Type here..."
            value={currentFormData.passwordB}
            onChange={handlePasswordChange}
            required
          />
          
          {/* Password match validation */}
          {currentFormData.passwordB && (
            <div className={`text-sm mt-2 ${passwordValidation.passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
              <span className="mr-2">{passwordValidation.passwordsMatch ? '✓' : '✗'}</span>
              Passwords match
            </div>
          )}
        </label>
      </div>
    );
  }
};
