import moment from "moment";
import { useState, useEffect } from "react";
import ft from "format-time";
import Select from "react-tailwindcss-select";
import FileUploader from "./FileUploader";
import {Rich_Text} from "../utls/rich_text";
import cookie from "js-cookie";

export const NewEventForm = ({
  formData,
  days,
  setDays,
  setId,
  id,
  setFormData,
  FormTitles,
  sampleImg,
  handleClick,
  handleRemoveDay,
  orgs,
  setSelectedImage,
  selectedImage,
  virtual,
  setVirtual,
  handleImageChange,
  tags,
  list,
  handleTagFormRendering,
  errors,
  setErrors,
  level,
  handleChange2,
  handleChange3
}) => {
  const setOptions = (orgs) => {
    return orgs.map((org) => ({
      value: org.org_id,
      label: org.name,
    }));
  };
  console.log(list)
  const options2 =[
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
  
  
  const [display, setDisplay] = useState({});
  const [multiDay, setMultiDay] = useState(false);
  const isMetaAdmin = cookie.get("isMetaAdmin");
  const isBxdpAdmin = cookie.get("isBxdpAdmin");
  const options = setOptions(orgs);
  const today = new Date().toISOString().split('T')[0];
  const [day, setDay] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });


  const handleChange = (value) => {
    try {
      setId(value);
      setDisplay({
        value: value.value,
        label: value.label,
      })
      setFormData({ ...formData, org_id: value.value });
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
  const handleChangeDay = (e) => {
    const { name, value } = e.target;
    setDay({ ...day, date: value })
    setDays([day]);
    if (errors.days) {
      setErrors({
        ...errors,
        days: false
      });
    }
    
  };
  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    setDay({ ...day, start_time: value });
    setDays([day]);
    if (errors.days) {
      setErrors({
        ...errors,
        days: false
      });
    }
    
  };
  const handleChangeTime2 = (e) => {
    const { name, value } = e.target;
    
    // Prevent end time from being the same as start time
    if (value === day.start_time) {
      return; // Don't update if times are the same
    }
    
    setDay({ ...day, end_time: value });
    setDays([day]);
    if (errors.days) {
      setErrors({
        ...errors,
        days: false
      });
    }
  };
  return (
    <>
      <div className=" flex flex-col mb-3  text-center md:text-left">
        <h1 className="mb-2 lg:w-9/12 text-4xl sm:text-5xl lg:text-4xl  xl:text-3xl 2xl:text-4xl font-bold">Create a Event:</h1>
        <h2 className="mb-4 font-normal text-[#585C7B] w-4/10">Please fill out the following items about your event. All<br/> information fields are <span className="text-[#FF7000] underline ml-1">*Required</span></h2>
      </div>
      { ( isMetaAdmin == "true" || isBxdpAdmin == "true" ) && (
        <label className="flex flex-col mb-3 font-bold">
          Choose an org:
          <Select
            primaryColor={"indigo"}
            className=" rounded text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
            value={id}
            onChange={handleChange}
            options={options}
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
                    : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                }`,
            }}
          />
        </label>
      )}
      <label className="flex flex-col mb-3 font-bold">
        Event Name*
        <input
          type="text"
          className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
          placeholder="Type here..."
          name="name"
          value={formData.name}
          onChange={handleChangeBasic}
        />
        { errors.name && <span style={{color: 'red'}}>Event Name is required</span>}
      </label>
      <div className="flex flex-col mb-3 font-bold">
        <label>
          Event Description*
        </label>
        <Rich_Text 
          formData={formData}
          setFormData={setFormData}
          type="description"
          errors={errors}
          setErrors={setErrors}

        />
        { errors.description && <span style={{color: 'red'}}>Event Description is required</span>}
      </div>
      <label className="flex flex-col my-3 font-bold">
      What topic tags do you associate with your event? *
        <div className="flex items-center gap-3">
          <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={Array.isArray(tags) ? tags :  undefined} 
            onChange={handleChange3}
            options={list}
            placeholder="Select Select tags (minimum 1)"
            isMultiple={true}
            isClearable={true}
            isSearchable={true}
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-300 pl-3 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
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
          <svg onClick={handleTagFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
          </svg>
        </div>
        { errors.tags && <span style={{color: 'red'}}>Tags are required</span>}
      </label>
      <div className="flex flex-row mb-3 font-bold items-center gap-3">
        <input
          type="checkbox"
          name="multiDay"
          placeholder="Type here..."
          value={multiDay}
          onClick={(e) => {
            setMultiDay( multiDay == false ? true : false );
          }}
        />
        Does your event have multiple dates?
      </div>
      {multiDay === false && (
        <>
        <label className="flex flex-col  mb-3  font-bold">
          Date *
            <input
              type="date"
              name="date"
              min={today}
              className={day.date}
              onChange={handleChangeDay}
              
            />
        </label>
        <label className="flex flex-col  mb-3  font-bold">
            Event Time*
            <div className="grid justify-items-stretch  gap-7 grid-cols-2">
              <input
                type="time"
                name="start_time"
                className="rounded text-pink-500 justify-center text-tkh-grayscale-10 text-xl font-normal"
                value={day.start_time}
                onChange={handleChangeTime}
                
              />
              <input
                type="time"
                name="end_time"
                min={day.start_time}
                max="24:00:00"
                className="rounded text-pink-500 justify-center text-tkh-grayscale-10 text-xl font-normal"
                value={day.end_time}
                onChange={handleChangeTime2}
            
              />
            </div>
            { errors.days && <span style={{color: 'red'}}>Date and Time is required</span>}
          </label>
        </>
      )}
      
      {multiDay === true && (
        <>
          <label className="flex flex-col mb-3 font-bold">
            <div className="flex flex-col gap-3 w-full">
              {days.map((day, index) => (
                // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                <div className="flex flex-row gap-3 text-tkh-grayscale-10 w-full justify-center" key={index}>
                  <p className="flex flex-col w-1/3 text-left">
                    <strong>Day {index + 1} Date </strong>
                    {moment(day.date).format("MMMM Do YYYY")}{" "}
                  </p>
                  <p className="flex flex-col w-1/3 text-left">
                    <strong>Day {index + 1} Start Time </strong>
                    {ft.getFormattedTime(day.start_time)}
                  </p>

                  <p className="flex flex-col w-1/3 text-left">
                    <strong>Day {index + 1} End Time </strong>
                    {ft.getFormattedTime(day.end_time)}
                  </p>
                  < svg className="fill-tkh-grayscale-5 hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 mb-5" width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleRemoveDay(day.date); }}>
                    <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
                  </svg> 
                </div>
              ))}
            </div>
            { errors.days && <span style={{color: 'red'}}>Date and Time is required</span>}
          </label>
          <button
            type="button"
            onClick={handleClick}
            className=" mb-3 border border-tkh-grayscale-4  
            h-10 rounded-md shadow-sm text-sm font-semibold text-tkh-grayscale-7 
            hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 
            hover:text-tkh-grayscale-0 active:border-tkh-brand-tangerine-2 capitalize active:bg-tkh-brand-tangerine-2"
          >
            Add Day
          </button>
        </>

      )}
      
      
      <div  className="flex flex-row mb-3 font-bold items-center gap-3">
      
        <input
          type="checkbox"
          name="location"
          placeholder="Type here..."
          value={virtual}
          onClick={(e) => {
            setVirtual( virtual == "false" ? "true" : "false" );
          }}
        />
        Is the program virtual/remote? *
      </div>
      { virtual == "false" && (
       <label className="flex flex-col mb-3 font-bold">
        Address *
        <input
          type="text"
          name="location"
          placeholder="Type here..."
          className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
          value={formData.location}
          onChange={handleChangeBasic}
        />
      </label>
      )}

      <label className="flex flex-col mb-3 font-bold">
        RSVP Link *
        <input
          type="text"
          name="rsvp_link"
          // pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}"
          placeholder="Type here..."
          className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal"
          value={formData.rsvp_link}
          onChange={handleChangeBasic}
        />
        { errors.rsvp_link && <span style={{color: 'red'}}>RSVP Link is required</span>}
      </label>
      <div className="flex flex-row mb-3 font-bold items-center gap-6">

        <label className="flex flex-col w-3/4 py-2">
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
            className="rounded text-pink-500  text-tkh-grayscale-10"
            value={formData.max_age}
            onChange={handleChangeBasic}
          />
        </label>
      </div>
      <label className="flex flex-col font-bold">
        Education Level Requirement
      <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
            value={level}
            placeholder="Select Education Level"
            onChange={handleChange2}
            options={options2}
            isClearable={true}
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
                    : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                }`,
            }}
          />
      </label>
      <label className="flex flex-col font-bold py-2">
      Image *
      <div className="flex flex-col ">
        <div>
          <p className="m-2 text-sm text-tkh-grayscale-5">Each file should be smaller than 64 MB</p>
          <FileUploader setFile={setSelectedImage} errors={errors}
          setErrors={setErrors} type={"bannerUrl"}/>
        </div>
        <img
          src={selectedImage}

          className=" flex flex-col m-4 h-[100px] cursor-pointer"
        /> 
       </div>
      {errors.bannerUrl && <span style={{color: 'red'}}>Image is required</span>}
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
