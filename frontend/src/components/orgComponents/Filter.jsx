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

export const Filter = ({ data, setData, type, load}) => {
  const [text, setText] = useState();
  const id = `${type}_id`
  const placeholder = `by ${type}`

  const setOptions = (data) => {
    if(data){
      return data.map((item) => ({
        value: item[id],
        label: item.name,
      }));
    }
    
    
  };

  const options = setOptions(data);

  const handleChange = (value) => {
      setText(value);
      setData(data.filter(x=> x[id] == value.value ));
      load()
  };


  return (
    <div  className="rounded text-pink-500 text-tkh-grayscale-10 w-full md:w-fit " >
      <Select
            primaryColor={"indigo"}
            className="rounded text-pink-500 text-tkh-grayscale-10 "
            value={text}
            onChange={handleChange }
            placeholder={placeholder}
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
                    ? `text-[#fff] bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-[#fff]`
                }`,
            }}
          />
    </div>
  );
};
