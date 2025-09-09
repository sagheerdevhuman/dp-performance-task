import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";


export const AddResourceFormStep1 = ({
  resourceFormData,  
  setResourceFormData,
  handleResourceFormRendering,
  resourceErrors,
  setResourceErrors,
  id,
  setId,
  orgs,
  setPage,

  
}) => {

    const options = orgs.map((org) => ({
      value: org.org_id,
      label: org.name,
    }));
    const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    setResourceFormData({
      ...resourceFormData,
      [name]: value
    });
    if (resourceErrors[name]) {
      setVideoErrors({
        ...resourceErrors,
        [name]: false
      });
    }
    
  };
  const handleChangeBasic3 = (e) => {
    const { name, value } = e.target;
    setResourceFormData({
      ...resourceFormData,
      [name]: "true"? true : false
    });
    if (resourceErrors[name]) {
      setVideoErrors({
        ...resourceErrors,
        [name]: false
      });
    }
    
  };
  const handleChange2 = (value) => {
    try {
      setId(value);
      setResourceFormData({ ...resourceFormData, org_id: value.value });
      if (resourceErrors.org_id) {
        setResourceErrors({
          ...resourceErrors,
          org_id: false
        });
      }
    } catch (error) {
      return alert(error.message);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    setPage(1);
  };

    return (
        <>
            
            
                <div>
                    <label className="flex flex-col mb-3  font-bold">
                        Choose an org:
                        <Select
                        primaryColor={"indigo"}
                        className="text-xl font-normal  rounded text-pink-500 text-tkh-grayscale-10"
                        value={id}
                        onChange={handleChange2}
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
                                : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                            }`,
                        }}
                        />
                        {resourceErrors.org_id && <span style={{color: 'red'}}>Org is required</span>}
                    </label>
                </div>
            
            <div >
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-[#131022]"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={resourceFormData.title}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {resourceErrors.title && <span style={{color: 'red'}}>Title is required</span>}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#131022]"
              >
                Description
              </label>  
              <div className="mt-1">
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={resourceFormData.description}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {resourceErrors.description && <span style={{color: 'red'}}>Description is required</span>}
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-[#131022]"
              >
                Location        
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id="location" 
                  value={resourceFormData.location}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {resourceErrors.location && <span style={{color: 'red'}}>Location is required</span>}
              </div>    
            </div>
            <div>
              <label
                htmlFor="provider"
                className="block text-sm font-medium text-[#131022]"
              >
                Provider                
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="provider"
                  id="provider"  
                  value={resourceFormData.provider}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {resourceErrors.provider && <span style={{color: 'red'}}>Provider is required</span>}
              </div>
            </div>  
            <div className="flex flex-row  items-center gap-2">
              <label
                htmlFor="is_platform_wide"
                className="block text-sm font-medium text-[#131022]"
              > 
                Is this resource platform wide?
              </label>
              <div className="mt-1 ">
                <input
                  type="checkbox"
                  name="is_platform_wide"   
                  value={resourceFormData.is_platform_wide}
                  onChange={handleChangeBasic3}
                  className="block w-[44px] shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[20px]"
                />
                {resourceErrors.is_platform_wide && <span style={{color: 'red'}}>Is this resource platform wide? is required</span>}
              </div>
            </div>
   
            <div className=" flex flex-row justify-end items-center">
              <button
                type="button"
                className="bg-tkh-grayscale-4 py-2 px-4 h-[35px] w-[134px] rounded-full shadow-sm text-sm font-medium text-gray-700 mr-[10px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={(e) => {
                        handleResourceFormRendering(e);
                }}
              >
                Cancel
              </button>
              <button
                
                className=" inline-flex items-center h-[35px] w-[134px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded-full text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm text-[10px] hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                onClick={(e) => {
                        handleNext(e);
                }}
              >
                Continue
              </button>
            </div>
         </>
    );
};


