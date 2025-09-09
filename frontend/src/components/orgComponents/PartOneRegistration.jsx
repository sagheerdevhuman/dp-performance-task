export const PartOneRegistration = ({
  formData,
  setFormData,
  page,
  setPage,
  FormTitles,
  sampleImg,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 w-full pt-10 2xl:py-20">
        <h1 className="lg:w-9/12 text-3xl sm:text-4xl font-bold text-center md:text-left">
          Organization Admin:
        </h1>
        <h2 className="lg:w-9/12 text-3xl text-center md:text-left">
          (Step 1 of 3)
        </h2>

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          First Name*
          <input
            type="text"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
            name="firstName"
            value={formData.firstName}
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
              
              setFormData({
                ...formData,
                firstName: processedValue,
              });
            }}
            required
          />
        </label>

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Last Name*
          <input
            type="text"
            name="lastName"
            placeholder="Letters and hyphens only (no numbers, no leading hyphen)"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.lastName}
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
              
              setFormData({
                ...formData,
                lastName: processedValue,
              });
            }}
            required
          />
        </label>

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Email*
          <input
            type="email"
            name="email"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.infoEmail}
            onChange={(e) => {
              setFormData({
                ...formData,
                infoEmail: e.target.value.toLowerCase(),
              });
            }}
            required
          />
        </label>

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Password*
          <input
            type="password"
            name="password"
            // pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.passwordA}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                passwordA: e.target.value.toLowerCase(),
              });
            }}
            required
          />
        </label>

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Password Confirmation*
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.passwordB}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                passwordB: e.target.value.toLowerCase(),
              });

              if (e.target.value.toLowerCase() !== formData.passwordA) {
                return e.target.setCustomValidity("passwords do not match");
              }
              e.target.setCustomValidity("");
            }}
            required
          />
        </label>

        <div className="mt-3 w-1/3 md:w-1/5 lg:w-3/4">
          <button
            className="h-10 w-full lg:mb-6 lg:w-2/5 xl:w-2/5 2xl:w-1/5 border-0 rounded-md bg-tkh-brand-tangerine-2 text-center text-tkh-grayscale-0 font-bold"
            type="submit"
          >
            Next Step
          </button>
        </div>
      </div>
    </>
  );
};
