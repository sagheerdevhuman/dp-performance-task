import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/user/updateUserSlice";
import { signOutUser } from "../../redux/user/userLogoutSlice";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ResetPassword } from "./ResetPassword";
import cookie from "js-cookie";

export const EditUserForm = ({
  userId,
  isProfileEditorRendered,
  setProfileEditorRendered,
}) => {
  const dispatch = useDispatch();
  const firstName = cookie.get("firstName");
  const lastName = cookie.get("lastName");
  const email = cookie.get("email");
  const [isButtonClosed, setButtonClosed] = useState(false);
  const [isResetShown, setResetShown] = useState(false);
  const [currentFormData, newFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    passwordA: "",
    passwordB: "",
  });
  function closeEditForm(event) {
    setProfileEditorRendered(false);
  }

  

  const handleLogOut = () => {
    dispatch(signOutUser({ user_id: userId })).then(() => {
      cookie.remove("orgId");
      cookie.remove("userId");
      cookie.remove("isAuthenticated");
      cookie.remove("firstName");
      cookie.remove("lastName");
      cookie.remove("userName");
      cookie.remove("email");
      cookie.remove("zipcode");
      cookie.remove("passwordResetRequired");
      cookie.remove("isApproved");
      cookie.remove("isActive");
      cookie.remove("isLoggedIn");
      cookie.remove("isMetaAdmin");
      cookie.remove("isBxdpAdmin");
      cookie.remove("isOrgAdmin");
      cookie.remove("isOrgManager");
      cookie.remove("isOrgUser");
      cookie.remove("isUser");
      cookie.remove("inviteToken");
      cookie.remove("wasInvited");
      window.location.reload(true);
    });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(
      isResetShown && currentFormData.passwordA && currentFormData.passwordB
        ? changeUser({
            userId: userId,
            firstName: !currentFormData.firstName
              ? firstName
              : currentFormData.firstName,
            lastName: !currentFormData.lastName
              ? lastName
              : currentFormData.lastName,
            email: !currentFormData.email ? email : currentFormData.email,
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
            currentPassword: currentFormData.currentPassword,
          })
    ).then(() => {
      return handleLogOut();
    });
  }

  if (isProfileEditorRendered) {
    return (
      <div className="flex flex-col pt-[50px] items-center absolute top-0  z-10  h-screen w-full ">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1 ">
          <button className="absolute top-3 right-4 bg-tkh-brand-tangerine-5
              transition ease-in-out transform scale-75 hover:scale-90 duration-300
              rounded-md p-3 inline-flex items-center justify-center 
              text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none"
              name="closeButton"
              onClick={closeEditForm}
          >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-7 w-7" aria-hidden="true" />
          </button>
          <h1 className="text-[40px] font-[700] mb-[16px]">Edit Profile</h1>

          <form
            className="flex flex-col gap-[24px]"
            style={{ contain: "content" }}
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div>
              <label className="block text-sm font-medium text-tkh-grayscale-10">
                First Name
                <input
                  type="text"
                  name="firstName"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder={firstName}
                  value={currentFormData.firstName}
                  onChange={(e) => {
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
                    
                    const validatedValue = validateName(e.target.value);
                    const processedValue = validatedValue.charAt(0).toUpperCase() + validatedValue.slice(1).toLowerCase();
                    
                    newFormData({
                      ...currentFormData,
                      firstName: processedValue,
                    });
                  }}
                ></input>
              </label>
            </div>

            <label className="block text-sm font-medium text-tkh-grayscale-10">
              Last Name
              <input
                type="text"
                name="lastName"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                placeholder={lastName}
                value={currentFormData.lastName}
                onChange={(e) => {
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
                  
                  const validatedValue = validateName(e.target.value);
                  const processedValue = validatedValue.charAt(0).toUpperCase() + validatedValue.slice(1).toLowerCase();
                  
                  newFormData({
                    ...currentFormData,
                    lastName: processedValue,
                  });
                }}
              ></input>
            </label>

            <label className="block text-sm font-medium text-tkh-grayscale-10">
              Email *
              <input
                type="email"
                name="email"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                placeholder={email}
                value={currentFormData.email}
                onChange={(e) => {
                  newFormData({
                    ...currentFormData,
                    email: e.target.value.toLowerCase(),
                  });
                }}
                required
              />
            </label>

             <label className="block text-sm font-medium text-tkh-grayscale-10">
              Current Password *
              <input
                type="password"
                name="currentPassword"
                // pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Type here..."
                value={currentFormData.currentPassword}
                onChange={(e) => {
                  e.preventDefault();
                  newFormData({
                    ...currentFormData,
                    currentPassword: e.target.value,
                  });
                }}
                required
              />
            </label>

            <button
              className=" inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
              onClick={(e) => {
                e.preventDefault();
                !isResetShown ? setResetShown(true) : setResetShown(false);
              }}
            >
              Reset Password
            </button>

            <ResetPassword
              currentFormData={currentFormData}
              newFormData={newFormData}
              isResetShown={isResetShown}
              setResetShown={setResetShown}
            />

            <button
              className=" inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"x
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};
