import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";

export const EditVideoModal = ({
  videoFormData,  
  setVideoFormData,       
  handleVideoFormSubmit,
  videoModalRendered,
  handleVideoFormRendering,
  videoErrors,
  setVideoErrors,
  id,
  setId,
  orgs,
  tags,
  list,
  handleChange,
  handleTagFormRendering,
  image,
  setImage,
  isUpdatingVideo,
  updateVideoError,
}) => {
  if (videoModalRendered) {
    const options = orgs?.map((org) => ({
      value: org.org_id,
      label: org.name,
    })) || [];

    const handleChangeBasic = (e) => {
      const { name, value } = e.target;
      setVideoFormData({
        ...videoFormData,
        [name]: value
      });
      if (videoErrors[name]) {
        setVideoErrors({
          ...videoErrors,
          [name]: false
        });
      }
    };

    const handleChange2 = (value) => {
      try {
        if (value) {
          setId(value);
          setVideoFormData({ ...videoFormData, org_id: value.value });
          if (videoErrors.org_id) {
            setVideoErrors({
              ...videoErrors,
              org_id: false
            });
          }
        } else {
          setId(null);
          setVideoFormData({ ...videoFormData, org_id: null });
        }
      } catch (error) {
        console.error("Error handling org change:", error);
      }
    };

    const handleChangeBasic2 = (e) => {
      const { name, value } = e.target;
      setVideoFormData({
        ...videoFormData,
        [name]: value
      });
      if (videoErrors[name]) {
        setVideoErrors({
          ...videoErrors,
          [name]: false
        });
      }
    };

    return (
      <div className="flex flex-col z-50 justify-center items-center fixed top-0 z-10 h-screen w-full ">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[24px] drop-shadow-card rounded-[15px] bg-[#fff] max-h-[95vh] overflow-y-auto">
          <div className="flex flex-row justify-between items-center mb-[24px]">
            <h1 className="text-[14px] font-[700] text-tkh-brand-tangerine-5">Edit Video</h1>
            <button
              className="transition ease-in-out transform scale-75 hover:scale-90 duration-300
                rounded-md inline-flex items-center justify-center p-0
                text-tkh-grayscale-9 hover:text-tkh-brand-tangerine-5 focus:outline-none"
              onClick={(e) => handleVideoFormRendering(e)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          
          <form className="flex flex-col gap-[24px]" onSubmit={(e) => handleVideoFormSubmit(e)}>
            {/* Error Message */}
            {updateVideoError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{updateVideoError}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="flex flex-col mb-3 font-bold">
                Choose an org:
                <Select
                  primaryColor={"indigo"}
                  className="text-xl font-normal rounded text-pink-500 text-tkh-grayscale-10"
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
                          : "bg-white hover:border-gray-400 focus:ring-blue-500 focus:ring focus:ring-blue-500/20"
                      }`,
                    menu: "seclect-menu absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                    listItem: ({ isSelected }) =>
                      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                          ? `text-white bg-blue-500`
                          : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                      }`,
                  }}
                />
                {videoErrors.org_id && <span style={{color: 'red'}}>Org is required</span>}
              </label>
            </div>
            
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#131022]"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={videoFormData.name || ""}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {videoErrors.name && <span style={{color: 'red'}}>Name is required</span>}
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
                  name="description"
                  id="description"
                  value={videoFormData.description || ""}
                  onChange={handleChangeBasic}
                  rows={3}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md p-3"
                />
                {videoErrors.description && <span style={{color: 'red'}}>Description is required</span>}
              </div>
            </div>
           
            <label className="flex flex-col my-3 font-bold">
              What topic tags do you associate with your video? *
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
                    menu: "seclect-menu absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                    listItem: ({ isSelected }) =>
                      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                          ? `text-[#fff] bg-blue-500`
                          : `text-gray-500 hover:bg-blue-100 hover:text-[#000]`
                      }`,
                  }}
                />
                <button
                  type="button"
                  onClick={handleTagFormRendering}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="black"/>
                  </svg>
                </button>
              </div>
              {videoErrors.tags && <span style={{color: 'red'}}>Tags are required</span>}
            </label>
            
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
                  value={videoFormData.link || ""}
                  onChange={handleChangeBasic}
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md h-[44px]"
                />
                {videoErrors.link && <span style={{color: 'red'}}>Link is required</span>}
              </div>
            </div>
            
            <label className="flex flex-col mb-3 font-bold">  
              Image *
              <div className="flex flex-col">
                <div>
                  <p className="m-2 text-sm text-tkh-grayscale-5">Each file should be smaller than 64 MB</p>
                  <FileUploader 
                    setFile={setImage} 
                    errors={videoErrors}
                    setErrors={setVideoErrors} 
                    type={"image"}
                  />
                </div>
                {image && (
                  <img
                    src={image}
                    alt="Preview Image"
                    className="flex flex-col m-4 h-[100px] cursor-pointer object-cover rounded"
                  />
                )}
              </div>
              {videoErrors.image && <span style={{color: 'red'}}>Image is required</span>}
            </label>    
            
            <div className="flex flex-row justify-end items-center">
              <button
                type="button"
                className="bg-tkh-grayscale-4 py-2 px-4 h-[35px] w-[134px] rounded-full shadow-sm text-sm font-medium text-gray-700 mr-[10px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={(e) => handleVideoFormRendering(e)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdatingVideo}
                className={`inline-flex items-center h-[35px] w-[134px] justify-center
                  transition ease-in-out transform duration-900
                  py-2 px-4 border border-tkh-brand-tangerine-5 rounded-full text-sm font-semibold
                  drop-shadow-btn shadow-sm text-[10px] ${
                    isUpdatingVideo
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                      : 'bg-tkh-brand-tangerine-5 text-tkh-grayscale-0 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5'
                  }`}
              >
                {isUpdatingVideo ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Video'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return null;
};


