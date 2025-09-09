import Select from "react-tailwindcss-select";


export const PreferencesForm = ({
  setWeekDays,
  days,
  setDays,
  list,
  list2,
  handleLearningStyleChange,
  handlePreferredLanguageChange,
  handleTagFormRendering,
  handleSkillFormRendering,
  skills,
  handleSkillChange,   
  tags,
  learningStyle,
  preferredLanguage,
  handleTagChange,
}) => {
  
  const setDayOptions = (days) => {
    return days.map((day) => ({
      value: day,
      label: day,
    }));
  };
  const week_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const dayOptions = setDayOptions(week_days);
 
  const learningStyleOptions =[
    {
      value: "virtual",
      label: "Virtual",
    },
    {
      value: "in-person",
      label: "In-Person",
    },
    {
      value: "hybrid",
      label: "Hybrid",
    },
  ];
  const languageOptions =[
    {
      value: "English",
      label: "English"
    },
    {
      value: "Spanish",
      label: "Spanish"
    },
    {
      value: "French",
      label: "French"
    },
    {
      value: "Mandarin",
      label: "Mandarin"
    },
    {
      value: "Other",
      label: "Other"
    }
  ];


  const formatDays = (days) => {
    if (days != null) {
      const map1 = days.map((x) => x.value);
      return map1
    }
  };



  const handleDayChange = (value) => {
    try {
      setDays(value);
      setWeekDays(formatDays(value));
    } catch (error) {
      console.error("Error handling day change:", error);
    }
  }; 

  return (
    <>
      <div className=" flex flex-col mb-3  text-center md:text-left">
        <h1 className="mb-2 lg:w-9/12 text-4xl sm:text-5xl lg:text-4xl  xl:text-3xl 2xl:text-4xl font-bold">Preferences:</h1>
        <h2 className="mb-4 font-normal text-[#585C7B] w-4/10">Feel Free to answer these questions for your preference</h2>
      </div>

      <label className="flex flex-col mb-3 font-bold">
        What is your availability?
        <Select
          primaryColor={"indigo"}
          className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
          value={days}
          onChange={handleDayChange}
          options={dayOptions}
          placeholder="Pick your days you are available"
          isMultiple={true}
          isClearable={true}
          isSearchable={false}
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              }`,

            tagItem: ({ isDisabled }) =>
              `flex text-sm text-black pl-2 pr-1 border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              }`,
            menu: "seclect-menu  absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `text-[#fff] bg-blue-500`
                  : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
              }`,
          }}
        />
      </label>
      <label className="flex flex-col mb-3 font-bold">
        How to do you prefer attending events/programs?
        <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={learningStyle}
            onChange={handleLearningStyleChange}
            options={learningStyleOptions}
            isMultiple={false}
            isClearable={true}
            isSearchable={false}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,

              tagItem: ({ isDisabled }) =>
                `flex text-sm text-black pl-2 pr-1 border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-white bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                }`,
            }}
          />
      </label>
      <label className="flex flex-col mb-3 font-bold">
        Preferred Language
        <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={preferredLanguage}
            onChange={handlePreferredLanguageChange}
            options={languageOptions}
            isMultiple={false}
            isClearable={true}
            isSearchable={false}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
  
              tagItem: ({ isDisabled }) =>
                `flex text-sm text-black pl-2 pr-1 border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                }`,
            }}
        />
      </label>

      <label className="flex flex-col mb-3 mt-3 lg:mt-0  font-bold">
        What skills are you looking to learn? 
        <div className="flex items-center gap-3">
          <Select
            primaryColor={"indigo"}
            className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
            value={skills}
            onChange={handleSkillChange}
            options={list}
            placeholder="Select skills"
            isMultiple={true}
            isClearable={true}
            isSearchable={true}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,

              tagItem: ({ isDisabled }) =>
                `flex text-sm text-black pl-2 pr-1 border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-full bg-[#fff] shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                }`,
            }}
          />
          <svg onClick={handleSkillFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
          </svg>
        </div>
        <p className="m-2 text-sm text-tkh-grayscale-5">eg. Python, UX Design, Data Analysis, Cybersecurity, Public Speaking</p>
      </label>
      <label className="flex flex-col  mb-3  font-bold">
        What type of educational events are you interested in?
        <div className="flex items-center gap-3">
          <Select
            primaryColor={"indigo"}
            className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
            value={tags}
            onChange={handleTagChange}
            options={list2}
            placeholder="Select tags"
            isMultiple={true}
            isClearable={true}
            isSearchable={true}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,

              tagItem: ({ isDisabled }) =>
                `flex text-sm text-black pl-2 pr-1 border tag-item rounded shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-full bg-[#fff] shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                }`,
            }}
          />
          <svg onClick={handleTagFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
          </svg>
        </div>
        <p className="m-2 text-sm text-tkh-grayscale-5">eg. Tech Bootcamps, Mentorship, Summer programs, Career training</p>
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
