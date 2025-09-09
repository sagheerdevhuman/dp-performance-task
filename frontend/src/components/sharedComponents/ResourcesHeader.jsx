import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import {  Filter} from "./Filter"

const people = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Website Design" },
  { id: 3, name: "Wireframe" },
  { id: 4, name: "Design System" },
  { id: 5, name: "Buttons" },
];

export const ResourcesHeader = ({
  currentSearchTerm,
  setCurrentSearchTerm,
  handleSubmit,
  categories,
  setCategories,
  filterdCategories,
  setFilterdCategories,
  categoryfilter,
  tags,
  setTags,
  filterdTags,
  setFilterdTags,
  tagfilter,
  isFiltering,
  categoriesStatus,
  categoriesError,
  tagsStatus,
  tagsError
}) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col md:flex-row md:justify-start md:items-center lg:p-[72px] p-5">
      <div className="flex flex-col justify-start items-center  w-1/2  ">
        <h1 className="text-[40px] max-w-[550px] tracking-tight text-[900] leading-tight ">
            Resources
        </h1>
      </div>
      <div className="flex flex-col justify-end items-center w-1/2 ">
        <form
          className="flex flex-col md:flex-row  md:justify-center md:items-center gap-3 md:mx-5 mt-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="relative">
            <Filter 
              data={categories} 
              data2={filterdCategories} 
              setData={setFilterdCategories} 
              type="category" 
            />
            {categoriesStatus === "failed" && categoriesError && (
              <div className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
                Failed to load categories
              </div>
            )}
            {categoriesStatus === "loading" && (
              <div className="absolute top-full left-0 mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                Loading categories...
              </div>
            )}
          </div>
          
          <div className="relative">
            <Filter 
              data={tags} 
              data2={filterdTags} 
              setData={setFilterdTags} 
              type="tag" 
            />
            {tagsStatus === "failed" && tagsError && (
              <div className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
                Failed to load tags
              </div>
            )}
            {tagsStatus === "loading" && (
              <div className="absolute top-full left-0 mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                Loading tags...
              </div>
            )}
          </div>

          <input
            type="search"
            value={currentSearchTerm}
            placeholder="Search courses"
            className="h-[44px] rounded-md"
            onChange={(e) => {
              setCurrentSearchTerm(e.target.value);
            }}
          />
          
          <button 
            type="submit"
            disabled={isFiltering}
            className={`inline-flex transition ease-in-in duration-300 items-center justify-center h-[44px] w-full md:w-28 px-[26] py-2.5 rounded drop-shadow-btn text-sm font-semibold border-2 ${
              isFiltering 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                : 'hover:text-tkh-grayscale-7 border-tkh-brand-tangerine-5 hover:bg-tkh-grayscale-0 bg-tkh-brand-tangerine-5 text-tkh-grayscale-0'
            }`}
          >
            {isFiltering ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Filtering...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
