import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const AddCategoryModal = ({
  categoryFormData,
  setCategoryFormData,
  handleCategoryFormSubmit,
  handleCategoryFormRendering,
  modalCategoryRendered,
  isModalCategoryRendered,
}) => {
  const [cCount, setCCount] = useState(0);

  const handleName = (e) => {
    const { name, value } = e.target;
    try {
      setCategoryFormData({
        ...categoryFormData,
        [name]: value,
      });
      setCCount(value.length);
    } catch (error) {
      console.error("Error handling name change:", error);
    }
  };

  if (modalCategoryRendered) {
    return (
      <div className="flex flex-col justify-center items-center fixed top-0 z-10 h-screen w-full">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1">
          <button 
            className="absolute top-3 right-4 bg-tkh-brand-tangerine-5
              transition ease-in-out transform scale-75 hover:scale-90 duration-300
              rounded-md p-3 inline-flex items-center justify-center 
              text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none"
            onClick={(e) => {
              handleCategoryFormRendering(e);
            }}
          >
            <span className="sr-only">Close menu</span>
            <XIcon className="h-7 w-7" aria-hidden="true" />
          </button>
          <h1 className="text-[40px] font-[700] mb-[16px]">Add Category</h1>

          <form
            className="flex flex-col gap-[24px]"
            onSubmit={(e) => handleCategoryFormSubmit(e)}
          >
            <div>
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-tkh-grayscale-10"
              >
                Category Name
              </label>
              <div className="mt-1">
                <input
                  required
                  type="text"
                  placeholder="Type here..."
                  name="name"
                  value={categoryFormData.name}
                  onChange={handleName}
                  maxLength="255"
                  autoComplete="off"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="m-2 text-sm text-tkh-grayscale-5">{cCount} / 255</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform duration-900
                  py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                  drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm hover:bg-tkh-brand-tangerine-5 
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


