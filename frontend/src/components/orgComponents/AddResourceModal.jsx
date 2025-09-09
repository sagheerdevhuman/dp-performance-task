import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Select from "react-tailwindcss-select";
import FileUploader from "../orgComponents/FileUploader";
import { AddResourceFormStep1 } from "./ResourceFormStep1";
import { AddResourceFormStep2 } from "./ResourceFormStep2";
import { AddCategoryModal } from "../staffComponents/AddCategoryModal";
import  { AddTagModal } from "../orgComponents/AddTagModal";


export const AddRescourceModal = ({
  link,
  resourceFormData,  
  setResourceFormData,
  handleResourceFormSubmit,
  resourceModalRendered,
  handleResourceFormRendering,
  handleCategoryFormRendering,
  resourceErrors,
  setResourceErrors,
  tags,
  list,
  handleChange,
  handleTagFormRendering,
  image,
  setImage,
  categories,
  categoryOptions,
  handleChange22,
  handleCategoryFormSubmit,
  categoryFormData,
  setCategoryFormData,
  modalCategoryRendered,
  isModalCategoryRendered,
  tagFormData,
  setTagFormData,
  handleTagFormSubmit,
  modalTagRendered,
  isModalTagRendered,
}) => {

  if (resourceModalRendered) {
    const [page, setPage] = useState(0);
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
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <AddResourceFormStep1
          resourceFormData={resourceFormData}
          setResourceFormData={setResourceFormData}
          handleResourceFormRendering={handleResourceFormRendering}
          resourceErrors={resourceErrors}
          setResourceErrors={setResourceErrors}
          setPage={setPage}
        />  
      );
    } else if (page === 1) {
      return (
        <AddResourceFormStep2
          resourceFormData={resourceFormData}
          setResourceFormData={setResourceFormData}
          handleResourceFormRendering={handleResourceFormRendering}
          resourceErrors={resourceErrors}
          setResourceErrors={setResourceErrors}
          tags={tags}
          list={list}
          handleChange={handleChange}
          handleTagFormRendering={handleTagFormRendering}
          image={image}
          setImage={setImage}
          setPage={setPage}
          categories={categories}
          categoryOptions={categoryOptions}
          handleChange2={handleChange22}
          handleCategoryFormRendering={handleCategoryFormRendering}
        />  
      );
    } 
  };
    return (
      <div className="flex flex-col justify-center items-center fixed top-0 z-10  h-screen w-full">
        <AddTagModal
        tagFormData={tagFormData}
        setTagFormData={setTagFormData}
        handleTagFormSubmit={handleTagFormSubmit}
        handleTagFormRendering={handleTagFormRendering}
        modalTagRendered={modalTagRendered}
        isModalTagRendered={isModalTagRendered}
      />

        <AddCategoryModal
        categoryFormData={categoryFormData}
        setCategoryFormData={setCategoryFormData}
        handleCategoryFormSubmit={handleCategoryFormSubmit}
        handleCategoryFormRendering={handleCategoryFormRendering}
        modalCategoryRendered={modalCategoryRendered}
        isModalCategoryRendered={isModalCategoryRendered}
      />
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[24px]  drop-shadow-card rounded-[15px] bg-[#fff] ">
          <div className="flex flex-row justify-between items-center mb-[24px]">
            <h1 className="text-[14px] font-[700] text-tkh-brand-tangerine-5 ">Upload Resource</h1>
            
          </div>
          <form className="flex flex-col gap-[24px]" onSubmit={(e) => handleResourceFormSubmit(e)}>
            {PageDisplay()}
          </form>
        </div>
      </div>
    );
  }
};


