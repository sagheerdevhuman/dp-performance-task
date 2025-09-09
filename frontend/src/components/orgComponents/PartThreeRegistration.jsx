export const PartThreeRegistration = ({
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
        <h1 className="mx-1 lg:w-9/12 text-3xl sm:text-4xl font-bold text-center md:text-left">
         Confirm Org Application
        </h1>
        <h2 className="mx-1 lg:w-9/12 text-3xl text-center md:text-left">
          (Step 2 of 2)
        </h2>

        <p className="mx-10 lg:w-9/12 text-lg text-center md:text-left">
          By clicking "Submit," you confirm that all the information provided in this application is accurate and complete. Please review your application carefully before proceeding, as you will not be able to make changes after submission.
          Once submitted, your application will be processed, and you will receive a confirmation email shortly.<br/><br/>
          Thank you for your appliying!
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-1 mt-3 w-2/3 md:w-2/5 lg:w-3/4">
          <button
            className="h-10 w-full lg:mb-6 lg:w-2/5 xl:w-2/5 2xl:w-1/4 border-0 rounded-md bg-tkh-brand-tangerine-2 text-center text-tkh-grayscale-0 font-bold"
            onClick={() => {
              if (page === FormTitles.length - 2) {
                alert("FORM SUBMITTED");
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            Submit
          </button>


          <button
            className="h-10 w-full lg:mb-6 lg:w-2/5 xl:w-2/5 2xl:w-1/3 border-0 rounded-md text-center text-tkh-grayscale-5 font-bold"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Previous Step
          </button>
        </div>
      </div>
    </>
  );
};
