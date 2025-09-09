import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import moment from "moment";



export const Edit = ({ 
  formData,
  setFormData,
  handleClick,
  days,
  setDays,
}) => {
  const setOptions = (days) => {
    return days.map((day) => ({
      value: day,
      label: day,
    })); 
  };
  const [data, setData] = useState();
  const week_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  const today = new Date().toISOString().split('T')[0];
  const options = setOptions(week_days);

  const formatDays = (days) => {
    if (days != null) {
      const map1 = days.map((x) => x.value);
      return map1
    }
  };

  const handleChange = (value) => {
      setData(value);
      setDays(formatDays(value));
      console.log(days)
  
  };
  
  return (

    <div className="flex gap-3">
      < svg width="26" height="26"className="fill-tkh-grayscale-5  hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleClick(e);}}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
      </svg>
      <div>
        <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
        Start and End Date *
        <div className="grid justify-items-stretch  gap-7 grid-cols-2">
          <input
            type="date"
            name="start_date"
            min={today}
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
            value={formData.start_date}
            onChange={(e) => {
              setFormData({ ...formData, start_date: e.target.value });
            }}
            required
          />
          <input
            type="date"
            name="end_date"
            min={formData.start_date}
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
            value={formData.end_date}
            onChange={(e) => {
              setFormData({ ...formData, end_date: e.target.value });
            }}
            required
          />
        </div>
      </label>
      <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
        Program Time*
        <div className="grid justify-items-stretch  gap-7 grid-cols-2">
          <input
            type="time"
            name="start_time"
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
            value={formData.start_time}
            onChange={(e) => {
              setFormData({ ...formData, start_time: e.target.value });
            }}
            required
          />
          <input
            type="time"
            name="end_time"
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
            min={formData.start_time}
            max="24:00:00"
            value={formData.end_time}
            onChange={(e) => {
              setFormData({ ...formData, end_time: e.target.value });
            }}
            required
          />
        </div>
      </label>
      <label className="flex flex-col mb-3 text-tkh-grayscale-7">
        Week Days*
        <Select
          primaryColor={"indigo"}
          className="rounded text-pink-500 text-tkh-grayscale-10"
          value={data}
          onChange={handleChange}
          options={options}
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
                  ? "bg-tbg-tkh-brand-tangerine-4 text-tkh-grayscale-0"
                  : "bg-tkh-brand-tangerine-4 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20 text-tkh-grayscale-0"
              }`,
            menu: "seclect-menu  absolute z-10 bg-[#fff] w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `text-tkh-grayscale-0 bg-tkh-brand-tangerine-5`
                  : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
              }`,
          }}
        />
      </label>
        <button
          type="submit"
          className="mt-3 h-10 w-[150px] border-0 rounded-md bg-tkh-brand-tangerine-5 
          drop-shadow-btn text-center text-tkh-grayscale-0 font-bold "
        >
          Save
        </button> 
      </div>
   
     
    </div>

  );
};
