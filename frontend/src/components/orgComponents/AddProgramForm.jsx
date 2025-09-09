import { getAllSkills } from "../../redux/skills/fetchAllSkillsSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-tailwindcss-select";
import {Rich_Text} from "../utls/rich_text";
import FileUploader from "./FileUploader";  
import cookie from "js-cookie";

export const NewProgramForm = ({
  skills,
  setSkills,
  allSkills,
  formData,
  setId,
  orgId,
  id,
  show,
  setShow,
  setSkill2,
  weekDays,
  setWeekDays,
  days,
  handleChange,
  setDays,
  setFormData,
  FormTitles,
  handleClick,
  handleRemoveSkill,
  orgs,
  selectedImage,
  setSelectedImage,
  setOptions,
  formatSkills,
  options,
  handleSkillFormRendering,
  list,
  errors,
  setErrors,
  level,
  gender,
  handleChange5,
  handleChange4
}) => {
  const setOptions2 = (orgs) => {
    return orgs.map((org) => ({
      value: org.org_id,
      label: org.name,
    }));
  };
  const setOptions3 = (days) => {
    return days.map((day) => ({
      value: day,
      label: day,
    }));
  };
  const week_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const [display, setDisplay] = useState({});
  const options2 = setOptions2(orgs);
  const options3 = setOptions3(week_days);
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const today = new Date().toISOString().split('T')[0];
 
  const options4 =[
    {
      value: "Less than High School",
      label: "Less than High School",
    },
    {
      value: "High School Diploma or Equivalent (GED)",
      label: "High School Diploma or Equivalent (GED)",
    },
    {
      value: "Some College (No Degree)",
      label: "Some College (No Degree)",
    },
    {
      value: "Trade/Technical/Vocational Training",
      label: "Trade/Technical/Vocational Training",
    },
    {
      value: "Associate's Degree",
      label: "Associate's Degree",
    },
    {
      value: "Bachelor's Degree",
      label: "Bachelor's Degree",
    },
    {
      value: "Master's Degree",
      label: "Master's Degree",
    },
    {
      value: "Professional Degree",
      label: "Professional Degree",
    },
    {
      value: "Doctorate Degree",
      label: "Doctorate Degree",  
    }
  ];
  const options5 =[
    {
      value: "Male",
      label: "Male"
    },
    {
      value: "Female",
      label: "Female"
    },
    {
      value: "Non-binary",
      label: "Non-binary"
    },
    {
      value: "Transgender",
      label: "Transgender"
    },
    {
      value: "Gender fluid",
      label: "Gender fluid"
    },
    {
      value: "Other",
      label: "Other"
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say"
    }
  ];


  const formatDays = (days) => {
    if (days != null) {
      const map1 = days.map((x) => x.value);
      return map1
    }
  };

  const handleChange2 = (value) => {
    try {
      setId(value);
      setDisplay({
        value: value.value,
        label: value.label,
      })
      setFormData({ ...formData, org_id: value.value });
      if (errors.org_id) {
        setErrors({
          ...errors,
          org_id: false
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  const handleChange3 = (value) => {
    try {
      setDays(value);
      setWeekDays(formatDays(value));
      if (errors.week_days) {
        setErrors({
          ...errors,
          week_days: false
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }; 
  const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    
    // Add validation for age and income fields to prevent negative values and letters
    if ((name === 'min_age' || name === 'max_age' || name === 'min_income' || name === 'max_income_level') && value !== '') {
      // Only allow numeric input for age and income fields - prevent 'e' and other non-digits
      if (!/^\d+$/.test(value) || value.includes('e') || value.includes('E')) {
        return; // Don't update the state if the value contains non-numeric characters or 'e'
      }
      
      const numValue = parseInt(value);
      if (numValue < 0) {
        return; // Don't update the state if the value is negative
      }
      
      // Validate that min_age is always lower than max_age
      if (name === 'min_age' && formData.max_age && numValue >= parseInt(formData.max_age)) {
        alert("Minimum age must be lower than maximum age");
        return;
      }
      
      if (name === 'max_age' && formData.min_age && numValue <= parseInt(formData.min_age)) {
        alert("Maximum age must be higher than minimum age");
        return;
      }
    }
    
    // Prevent end time from being the same as start time
    if (name === 'end_time' && value === formData.start_time) {
      return; // Don't update if times are the same
    }
    
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

  return (
    <>
      <div className=" flex flex-col mb-3  text-center md:text-left">
        <h1 className="mb-2 lg:w-9/12 text-4xl sm:text-5xl lg:text-4xl  xl:text-3xl 2xl:text-4xl font-bold">Create a Program:</h1>
        <h2 className="mb-4 font-normal text-[#585C7B] w-4/10">Please fill out the following items about your program. All<br/> information fields are  <span className="text-[#FF7000] underline ml-1">*Required</span></h2>
      </div>
      {(isMetaAdmin === "true"||isBxdpAdmin==="true") && (
        <label className="flex flex-col mb-3  font-bold">
          Choose an org:
          <Select
            primaryColor={"indigo"}
            className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
            value={id}
            onChange={handleChange2}
            options={options2}
            isMultiple={false}
            isClearable={true}
            isSearchable={true}
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
          {errors.org_id && <span style={{color: 'red'}}>Org is required</span>}
        </label>
      )}

      <label className="flex flex-col mb-3 font-bold">
        Program Name*
        <input
          type="text"
          className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
          placeholder="Type here..."
          name="name"
          value={formData.name}
          onChange={handleChangeBasic}
        />
        {errors.name && <span style={{color: 'red'}}>Program Name is required</span>}
      </label>
      <div  className="flex flex-col mb-3 mt-3 lg:mt-0  font-bold">
        <label className="">
          Program Description*
        </label>

        <Rich_Text 
          formData={formData}
          className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
          setFormData={setFormData}
          type="description"
          errors={errors}
          setErrors={setErrors}
        />
        {errors.description && <span style={{color: 'red'}}>Description is required</span>}

      </div>
      
      

      

      
      
      {/* <div  className="flex flex-col mb-3 mt-3 lg:mt-0 text-tkh-grayscale-7">
        <label>
          Program Requirements*
        </label>
        <Rich_Text 
          formData={formData}
          setFormData={setFormData}
          type="requirements"
          errors={errors}
          setErrors={setErrors}
        />
        {errors.requirements && <span style={{color: 'red'}}>Requirements are required</span>}

          
      </div> */}
       {/*<label className="flex flex-col  mb-3  text-tkh-grayscale-7">
        Skills*
        <div className="grid justify-items-stretch  gap-3 grid-cols-3">
          {skills.map((skill, index) => (
            <div className="text-tkh-grayscale-10" key={index}>
              <p>
                <strong>Name: </strong>
                {skill.name}
              </p>
              <p>
                <strong>Description: </strong>
                {skill.description}
              </p>
              <div
                className=" h-7 border border-tkh-grayscale-4  rounded-md text-center text-tkh-grayscale-7 font-bold hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0 active:border-tkh-brand-tangerine-2  active:bg-tkh-brand-tangerine-2 "
                onClick={(e) => {
                  handleRemoveSkill(skill.name);
                }}
              >
                remove
              </div>
            </div>
          ))}
        </div>
      </label>*/}
      <label className="flex flex-col mb-3 mt-3 lg:mt-0  font-bold">
        What skills will people learn in this program? *
        <div className="flex items-center gap-3">
          <Select
            primaryColor={"indigo"}
            className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
            value={skills}
            onChange={handleChange}
            options={list}
            placeholder="Select skills (minimum 1)"
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
        {errors.skills && <span style={{color: 'red'}}>Skills are required</span>}
      </label>
      <label className="flex flex-col  mb-3  font-bold">
        Enrollment Deadline *
        <input
          type="date"
          name="enrollment_deadline"
          min={today}
          placeholder="Type here..."
          className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
          value={formData.enrollment_deadline}
          onChange={handleChangeBasic}
        />
        {errors.enrollment_deadline && <span style={{color: 'red'}}>Enrollment Deadline is required</span>}
      </label>
      <div className="flex flex-col  mb-3  font-bold">
        <div className="grid justify-items-stretch  gap-7 grid-cols-2">

          <label className="flex flex-col  mb-3  font-bold">
            Program Start Date *
            <input
              type="date"
              name="start_date"
              min={formData.enrollment_deadline? formData.enrollment_deadline:today}
              className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
              value={formData.start_date}
              onChange={handleChangeBasic}
            />
          </label>
          <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
          Program End Date *
              <input
                type="date"
                name="end_date"
                min={formData.start_date}
                className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
                value={formData.end_date}
                onChange={handleChangeBasic}
              />
          </label>
        
        </div>
        {(errors.end_date && errors.start_date) && <span style={{color: 'red'}}>Start and End Date is required</span>}
      </div>
      <label className="flex flex-col mb-3  font-bold">
        Which day(s) of the week is the program taking place in? *
        <Select
          primaryColor={"indigo"}
          className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
          value={days}
          onChange={handleChange3}
          options={options3}
          placeholder="Pick your program’s day(s) (minimum of 1)"
          isMultiple={true}
          isClearable={true}
          isSearchable={true}
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
         {errors.week_days && <span style={{color: 'red'}}>Week Days are required</span>}
      </label>
      <div className="flex flex-col  mb-3  font-bold">
        <div className="grid justify-items-stretch  gap-7 grid-cols-2">

          <label className="flex flex-col  mb-3  font-bold">
          Program Start Time *
          <input
            type="time"
            name="start_time"
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10 text-xl font-normal"
            value={formData.start_time}
            onChange={handleChangeBasic}
          />
          </label>
          <label className="flex flex-col  mb-3  font-bold">
            Program End Time *
          <input
            type="time"
            name="end_time"
             min={formData.start_time}
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10 text-xl font-normal"
            value={formData.end_time}
            onChange={handleChangeBasic}
          />
          </label>
        </div>
        {(errors.start_time && errors.end_time) && <span style={{color: 'red'}}>Program Time is required</span>}
      </div>
      
      
     
      
      <div className="flex flex-row mb-3 font-bold items-center gap-3">
        <input
          type="checkbox"
          name="location"
          placeholder="Type here..."
          value={show}
          onClick={(e) => {
            setShow( show == "false" ? "true" : "false" );
          }}
          
        />
        Is the program virtual/remote? *
      </div>

      
      { show == "false" && (
        <label className="flex flex-col  mb-3  font-bold">
        Address *
        <input
          type="text"
          name="video_call_link"
          placeholder="Type here..."
          className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
          value={formData.location}
          autocomplete="address-line1"
          onChange={handleChangeBasic}
        />
        {(errors.location&& show == "false" )&& <span style={{color: 'red'}}>Location is required</span>}
      </label>
          
      )}
      <label className="flex flex-col mb-3 font-bold">
          Apply link *
          <input
            type="text"
            name="video_call_link"
            placeholder="Type here..."
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={formData.video_call_link}
            onChange={handleChangeBasic}
          />
          { errors.video_call_link && <span style={{color: 'red'}}>Apply link is required</span>}
        </label>
        <div className="flex flex-row mb-3 font-bold items-center gap-6">

        <label className="flex flex-col w-3/4 py-2">
          City Requirement
          <input
            type="text"
            name="city_requirement"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.city_requirement}
            onChange={handleChangeBasic}
          />
        </label>
        <label className="flex flex-col w-3/4 py-2">
          Zip Code Requirement *
          <input
            type="number"
            name="zip_code_requirement"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.zip_code_requirement}
            onChange={handleChangeBasic}
          />
        </label>
        </div>
        <div className="flex flex-row mb-3 font-bold items-center gap-6">

        <label className="flex flex-col w-3/4 py-2">
        Income Minimum
          <input
            type="number"
            name="min_income"
            min="0"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.min_income}
            onChange={handleChangeBasic}
          />
        </label>
        <label className="flex flex-col w-3/4 py-2">
        Income Maximum  
          <input
            type="number"
            name="max_income_level"
            min="0"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.max_income_level}
            onChange={handleChangeBasic}
          />
        </label>
      </div>
      <label className="flex flex-col mb-3 font-bold">
          Gender Requirement 
          <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={gender}
            onChange={handleChange4}
            options={options5}
            isMultiple={false}
            isClearable={true}
            isSearchable={true}
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
          {errors.org_id && <span style={{color: 'red'}}>Org is required</span>}
        </label>
      <div className="flex flex-row mb-3 font-bold items-center gap-6">

        <label className="flex flex-col  w-3/4 py-2">
          Age Minimum 
          <input
            type="number"
            name="min_age"
            min="0"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.min_age}
            onChange={handleChangeBasic}
          />
        </label>
        <label className="flex flex-col w-3/4 py-2">
          Age Maximum 
          <input
            type="number"
            name="max_age"
            min="0"
            placeholder="Type here..."
            className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
            value={formData.max_age}
            onChange={handleChangeBasic}
          />
        </label>
      </div>
      <label className="flex flex-col mb-3 font-bold">
        Education Level Requirement
          <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={level}
            onChange={handleChange5}
            options={options4}
            isMultiple={false}
            isClearable={true}
            isSearchable={true}
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
          {errors.org_id && <span style={{color: 'red'}}>Org is required</span>}
        </label>
      <label className="flex flex-col mb-3 font-bold">
        Image *
        <div className="flex flex-col">
          <div>
            <p className="m-2 text-sm text-tkh-grayscale-5">Each file should be smaller than 64 MB</p>
            <FileUploader setFile={setSelectedImage} errors={errors}
          setErrors={setErrors} type={"bannerUrl"}/>
          </div>
          <img
            src={selectedImage}
            alt="{Preview_Image}"
            className=" flex flex-col m-4 h-[100px] cursor-pointer"
          />
        </div>
        { errors.bannerUrl && <span style={{color: 'red'}}>Image is required</span>}
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
