import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import moment from "moment";
import ft from "format-time";
import Select from "react-tailwindcss-select";

import {
  CheckIcon,
  ChevronDownIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

export const Filter = ({ data,data2, setData, type, }) => {
  const [text, setText] = useState();
  const [error, setError] = useState(null);
  const id = `${type}_id`
  const placeholder = `by ${type}`

  const setOptions = (data) => {
    try {
      if(data && Array.isArray(data)){
        return data.map((item) => {
          if (item && item[id] && (item.name||item.title)) {
            return {
              value: item[id],
              label: item.name || item.title,
            };
          }
          return null;
        }).filter(Boolean); // Remove null values
      }
      return [];
    } catch (error) {
      console.error(`Error setting options for ${type}:`, error);
      setError(`Failed to load ${type} options`);
      return [];
    }
  };
  console.log("data",data)

  const options = setOptions(data);

  const handleChange = (value) => {
    try {
      setError(null);
      if(value && Array.isArray(value)){
        setText(value);
        setData(value.filter(x => x && x.value));
      }
      else{
        setText(null);
        setData(null);
      }
    } catch (error) {
      console.error(`Error handling change for ${type}:`, error);
      setError(`Error updating ${type} selection`);
      setData(null);
    }
  };

  // Clear error when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setError(null);
    }
  }, [data]);
console.log("options",options)
  return (
    <div className="relative">
      <Select
            primaryColor={"indigo"}
            className="text-pink-500 text-tkh-grayscale-10 h-full "
            value={text}
            onChange={handleChange }
            placeholder={placeholder}
            options={options}
            isMultiple={true}
            isClearable={true}
            isSearchable={true}
            isDisabled={!data || data.length === 0}
            classNames={{
              
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 pl-3  border border-gray-300 rounded-md  shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-[#fff] hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,

              tagItem: ({ isDisabled }) =>
                `flex text-gray-500  text-sm p-2  border tag-item rounded-md shadow-sm transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-tkh-brand-tangerine-4   hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`,
              menu: "seclect-menu  absolute z-10 w-fit bg-[#fff] shadow-lg border   rounded-md  py-1 mt-1.5 text-sm text-gray-700",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2   py-2 cursor-pointer select-none truncate rounded-md  ${
                  isSelected
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100   hover:text-tkh-grayscale-8`
                }`,
            }}
          />
      
      {/* Error message */}
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 whitespace-nowrap">
          {error}
        </div>
      )}
      
      {/* No data message */}
      {(!data || data.length === 0) && !error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200 whitespace-nowrap">
          No {type}s available
        </div>
      )}
    </div>
  );
};
