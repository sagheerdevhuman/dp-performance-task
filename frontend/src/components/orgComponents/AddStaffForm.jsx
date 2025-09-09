const AddStaffForm = ({
  firstName,
  lastName,
  email,
  invitedUserData,
  setInvitedUserData,
  inviteUser,
}) => {
  
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

  const handleNameChange = (field, value) => {
    const validatedValue = validateName(value);
    const processedValue = validatedValue.charAt(0).toUpperCase() + validatedValue.slice(1);
    
    setInvitedUserData({
      ...invitedUserData,
      [field]: processedValue,
    });
  };

  return (
    <div className="max-w-lg mx-auto pt-4 px-4 overflow-auto">
      <form className="h-72">
        <div className="space-y-2">
          <div>
            <h1 className="text-lg leading-6 font-bold text-gray-900">
              Add Staff
            </h1>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-tkh-grayscale-10"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                required
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                onChange={(e) => handleNameChange('firstName', e.target.value)}
                autoComplete="given-name"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-tkh-grayscale-10"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                required
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={(e) => handleNameChange('lastName', e.target.value)}
                autoComplete="family-name"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-tkh-grayscale-10"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                required
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setInvitedUserData({
                    ...invitedUserData,
                    email: e.target.value.toLowerCase(),
                  });
                }}
                autoComplete="email"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
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
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              >
                <option>Org Staff</option>
                <option>Org Manager</option>
                <option>Org Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end py-4">
            {/* <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Cancel
                          </button> */}
            <button
              type="submit"
              className=" inline-flex items-center justify-center py-2 px-4 border border-tkh-grayscale-5 rounded-md text-sm font-semibold text-tkh-grayscale-7 shadow-sm  hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0"
              onClick={(e) => inviteUser(e)}
            >
              Send Invite
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStaffForm;
