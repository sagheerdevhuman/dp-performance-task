import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Select from "react-tailwindcss-select";


function UserForm({errors,setErrors,setFormData,handleSubmit,formData,errorMessage,handleChange2,handleChange3,level,gender,stem,handleChange4 }) {
  const [selectedOption, setSelectedOption] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  const options =[
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
  const options2 =[
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
  const options3 =[
    {
      value: true,
      label: "Yes"
    },
    {
      value: false,
      label: "No"
    },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOption(value);
    console.log(value)
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



  const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    
    // Add validation for income fields to prevent negative values
    if (name === 'income_level' && value !== '') {
      const numValue = parseInt(value);
      if (numValue < 0) {
        return; // Don't update the state if the value is negative
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
  const handleChangeName = (e) => {
    const { name, value } = e.target;
    const navigate = useNavigate();
    setFormData({
      ...formData,
      [name]:
        value.charAt(0).toUpperCase() +
        value.slice(1),
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toLowerCase(),
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  const handleChangePassword =(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value !== formData.passwordA) {
      return e.target.setCustomValidity("passwords do not match");
    }
    e.target.setCustomValidity("");
  }

  return (
   
          <form
            className="flex flex-col lg:flex-row  justify-center items-center xl:gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col  lg:w-9/12 justify-start items-start gap-4 bg-[#fff] py-10 2xl:py-20">
              <h1 className="mb-2 lg:w-9/12 text-4xl sm:text-5xl lg:text-4xl  xl:text-3xl 2xl:text-4xl font-bold">
                Welcome
              </h1>
              <p className="mb-4 font-normal text-[#585C7B]">Please Answer the following questions <span className="text-[#FF7000] ml-1">*Required</span></p>
             
              <label className="flex flex-col text-tkh-grayscale-9 font-bold w-full">
                  Do you have internships or past work experience in technology* 
                  <div className="flex flex-row gap-5">
                    <div >
                      <input
                        name="past_experience" 
                        className="mr-1"
                        type="radio"
                        value={true}
                        checked={selectedOption === "true"}
                        onChange={handleChange}
                      />
                      
                      Yes 
                      
                    </div>
                    <label>    
                      <input
                        name="past_experience"
                        className="mr-1"
                        type="radio"
                        value={false}
                        checked={selectedOption === "false"}
                        onChange={handleChange}
                      /> 
                      No
                    </label> 
                  </div>                 
                { errors.past_experience && <span style={{color: 'red'}}>Answer is required</span>}
              </label>

              <label className="flex flex-col text-tkh-grayscale-9 font-bold  w-full">
                Do you have a work portfolio or Github? If yes, please enter the link below if no, please enter N/A:*
                <input
                  type="text"
                  name="portfolio"
                  placeholder=""
                  pattern="https?://(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)"
                  className="lg:w-4/5 rounded-lg text-xl font-normal text-pink-500 text-tkh-grayscale-10"
                  value={formData.portfolio}
                  onChange={handleChangeBasic}
                />
                { errors.portfolio && <span style={{color: 'red'}}>Portfolio or Github is required</span>}
              </label>

              <label className="flex flex-col text-tkh-grayscale-9 font-bold  w-full">
                What is your highest level of education?*
                <Select
                  primaryColor={"indigo"}
                  className="lg:w-4/5 rounded text-xl  font-normal text-pink-500 text-tkh-grayscale-10"
                  value={level}
                  onChange={handleChange2}
                  options={options}
                  isMultiple={false}
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
                          : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                      }`,
                  }}
                />
                {errors.education_level && <span style={{color: 'red'}}>Education Level is required</span>}
              </label>
              <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold  w-full">
                Do you have any college degree in STEM*
                <Select
                  primaryColor={"indigo"}
                  className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
                  value={stem}
                  onChange={handleChange4}
                  options={options3}
                  isMultiple={false}
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
                          : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                      }`,
                  }}
                />
                {errors.college_in_stem && <span style={{color: 'red'}}>College in STEM is required</span>}
              </label>
              

              <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold  w-full">
                What is your current income?
                <input
                  type="number"
                  name="income_level"
                  min="0"
                  placeholder="Type here..."
                  className="rounded text-pink-500  text-tkh-grayscale-10 text-xl font-normal w-full"
                  value={formData.income_level}
                  onChange={handleChangeBasic}
                />

                
                { errors.income_level && <span style={{color: 'red'}}>Job Status is required</span>}
              </label>
              <div  className="w-full flex flex-wrap"> 
                <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold md:w-1/2 w-full">
                  Date of Birth (MM/DD/YYYY)*
                  <input
                    type="date"
                    name="date_of_birth"
                    max={today}
                    className="md:w-1/2 w-full"
                    onChange={handleChangeBasic}
                    
                  />
                  { errors.date_of_birth && <span style={{color: 'red'}}>Date of Birth is required</span>}
                </label>
                <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold md:w-1/2 w-full">
                  Gender
                  <Select
                    primaryColor={"indigo"}
                    className=" rounded-lg text-xl font-normal text-pink-500 text-tkh-grayscale-10"
                    value={gender}
                    onChange={handleChange3}
                    options={options2}
                    isMultiple={false}
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
                            : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                        }`,
                    }}
                  />
                  {errors.gender && <span style={{color: 'red'}}>Gender is required</span>}
                </label>
               

                <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold md:w-1/2 w-full">
                  City, State*
                  <input
                    type="text"
                    name="address"
                    placeholder=""
                    className=" rounded-lg text-xl font-normal text-pink-500 text-tkh-grayscale-10 md:w-[75%] w-full"
                    value={formData.address}
                    onChange={handleChangeBasic}
                  />
                  { errors.address && <span style={{color: 'red'}}>City, State is required</span>}
                </label>
                <label className="flex flex-col items-start gap-2 text-tkh-grayscale-9 font-bold md:w-1/2 w-full">
                  Zip Code*
                  <input
                    type="text"
                    name="zipcode"
                    placeholder=""
                    pattern="^\d{5}(-\d{4})?$"
                    className=" rounded-lg text-xl font-normal text-pink-500 text-tkh-grayscale-10  md:w-[75%] w-full"
                    value={formData.zipcode}
                    onChange={handleChangeBasic}
                  />
                  { errors.zipcode && <span style={{color: 'red'}}>Zipcode is required</span>}
                </label>
              </div>
              

              <div className="mt-3 lg:w-10/12 w-full">
                <p className="mb-4 text-tkh-brand-tangerine-3">{errorMessage}</p>
                <button
                  className="h-[52px]  w-full  border-0 rounded-md bg-tkh-brand-tangerine-5 drop-shadow-btn text-center text-tkh-grayscale-0 font-bold"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
            
          </form>
  );
}

export default UserForm;
