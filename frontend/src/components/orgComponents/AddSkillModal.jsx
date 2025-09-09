import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const AddSkillModal = ({
  skillFormData,
  setSkillFormData,
  handleSkillFormSubmit,
  handleSkillFormRendering,
  modalSkillRendered,
  isModalSkillRendered,
  skillErrors,
}) => {
  const [tCount, setTCount] = useState(0);
  const [dCount, setDCount] = useState(0);

  const handleName = (e) => {
    const { name, value } = e.target;
    try {
      setSkillFormData({
        ...skillFormData,
        [name]: value,
      });
      setTCount(value.length);
    } catch (error) {
      console.error("Error handling name change:", error);
    }
  };

  const handleDescription = (e) => {
    const { name, value } = e.target;
    try {
      setSkillFormData({
        ...skillFormData,
        [name]: value,
      });
      setDCount(value.length);
    } catch (error) {
      console.error("Error handling description change:", error);
    }
  };

  if (modalSkillRendered) {
    return (
      <div className="flex flex-col justify-center items-center fixed top-0 z-20 h-screen w-full">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[24px] drop-shadow-card rounded-[15px] bg-[#fff]">
          <div className="flex flex-row justify-between items-center mb-[24px]">
            <h1 className="text-[14px] font-[700] text-tkh-brand-tangerine-5 ">Add Skill</h1>
            {/* <div className="
                transition ease-in-out transform scale-75 hover:scale-90 duration-300
                rounded-md  inline-flex items-center justify-center  p-0
                text-tkh-grayscale-9 hover:text-tkh-brand-tangerine-5 focus:outline-none"
                onClick={(e) => {
                  handleStaffFormRendering(e);
                }}
            >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-7 w-7" aria-hidden="true" />
            </div> */}
            
          </div>
          <form
            className="flex flex-col gap-[15px]"
            onSubmit={(e) => handleSkillFormSubmit(e)}
          >
            <div>
              <label
                htmlFor="skill-name"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Skill Name
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Type here..."
                  name="name"
                  value={skillFormData.name}
                  maxLength="255"
                  onChange={handleName}
                  autoComplete="given-name"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
                {skillErrors?.name && <span style={{color: 'red'}}>Skill Name is required</span>}
                <p className="m-2 text-sm text-tkh-grayscale-5">{tCount} / 255</p>
              </div>
            </div>
            <div>
              <label
                htmlFor="skill-description"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Type here..."
                  name="description"
                  maxLength="255"
                  value={skillFormData.description}
                  onChange={handleDescription}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
                {skillErrors?.description && <span style={{color: 'red'}}>Description is required</span>}
                <p className="m-2 text-sm text-tkh-grayscale-5">{dCount} / 255</p>
              </div>
            </div>

            <div className=" flex flex-row justify-end items-center">
              <button
                  type="button"
                  className="bg-tkh-grayscale-4 py-2 px-4 h-[35px] w-[134px] rounded-full shadow-sm text-sm font-medium text-gray-700 mr-[10px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  onClick={(e) => {
                    handleSkillFormRendering(e);
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};


