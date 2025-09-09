import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";


export const AddResourceFormStep2 = ({
  link,
  resourceFormData,  
  setResourceFormData,
  handleResourceFormRendering,
  resourceErrors,
  setResourceErrors,
  tags,
  list,
  handleChange,
  handleTagFormRendering,
  handleCategoryFormRendering,
  image,
  setImage,
  setPage,
  categories,
  categoryOptions,
  handleChange2,
}) => {


  const handleChangeBasic2 = (e) => {
    const { name, value } = e.target;
    setResourceFormData({
      ...resourceFormData,
      [name]: value
    });
    if (resourceErrors[name]) {
      setResourceErrors({
        ...resourceErrors,
        [name]: false
      });
    }
    
  };
  const handleBack = (e) => {
    e.preventDefault();
    setPage(0);
  };

  console.log("categoryOptions",categoryOptions)
  
    return (
        <>
            <div>
                <label className="flex flex-col my-3 font-bold">
                What category do you associate with your resource? *
                <div className="flex items-center gap-3">
                  <Select
                    primaryColor={"indigo"}
                    className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
                    value={categories}
                    onChange={handleChange2}
                    options={categoryOptions}
                    placeholder="Select category"
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
                            : "bg-tkh-brand-tangerine-5 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
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
                  <svg onClick={handleCategoryFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
                  </svg>
                </div>
                { resourceErrors.categories && <span style={{color: 'red'}}>Categories are required</span>}
            </label>
            </div>
            <div>
              <label className="flex flex-col my-3 font-bold">
              What topic tags do you associate with your resource? *
                <div className="flex items-center gap-3">
                  <Select
                    primaryColor={"indigo"}
                    className="rounded text-pink-500 text-tkh-grayscale-10 text-xl font-normal"
                    value={tags}
                    onChange={handleChange}
                    options={list}
                    placeholder="Select tags (minimum 1)"
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
                            : "bg-tkh-brand-tangerine-5 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
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
                  <svg onClick={handleTagFormRendering}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
                  </svg>
                </div>
                { resourceErrors.tags && <span style={{color: 'red'}}>Tags are required</span>}
            </label>
            </div>
            
            <div>
             
              <label
                htmlFor="link"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Link
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={link}
                  onChange={handleChangeBasic2}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {resourceErrors.link && <span style={{color: 'red'}}>Link is required</span>}
              </div>
              
            </div>
            <label className="flex flex-col mb-3 font-bold">  
              Image *
              <div className="flex flex-col">
                <div>
                  <p className="m-2 text-sm text-tkh-grayscale-5">Each file should be smaller than 64 MB</p>
                  <FileUploader setFile={setImage} errors={resourceErrors}
                    setErrors={setResourceErrors} type={"image"}/>
                </div>
                <img
                  src={image}
                  alt="{Preview_Image}"
                  className=" flex flex-col m-4 h-[100px] cursor-pointer"
                />
              </div>
              { resourceErrors.image && <span style={{color: 'red'}}>Image is required</span>}
            </label>    
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
                type="button"
                className="bg-tkh-grayscale-4 py-2 px-4 h-[35px] w-[134px] rounded-full shadow-sm text-sm font-medium text-gray-700 mr-[10px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={(e) => {
                        handleBack(e);
                }}
              >
                Back
              </button>
              <button
                type="submit"
                className=" inline-flex items-center h-[35px] w-[134px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded-full text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm text-[10px] hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
              >
                Upload 
              </button>
            </div>
    </>
    );
};


