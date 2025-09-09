import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import moment from "moment";
import ft from "format-time";
import Select from "react-tailwindcss-select";
import Datepicker from "react-tailwindcss-datepicker";
import {getDatesByInterval} from "../utls/getDatesByInterval"; 
import {
  CheckIcon,
  ChevronDownIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

export const DateFilter = ({ dates, setDates, reload ,getByDate,getDateBy,setGetDateBy}) => {
  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
  }); 

  const handleChange = (event) => {
    const selectedInterval = event.target.value;
    try{
      var list = getDatesByInterval(value,selectedInterval)
      if(list.length > 12 && selectedInterval == "year"){       
       alert("You cannot filter by year because too many years selected")
       setDates([])
       getByDate([])
      }else if(list.length >  12 && selectedInterval == "day"){
        alert("You cannot filter by day because too many days selected")
        setDates([])
        getByDate([])
      }else if(list.length > 12 && selectedInterval == "week"){
        alert("You cannot filter by week because too many weeks selected")
        setDates([])
        getByDate([])
      }else{
          setDates(list) 
          getByDate(list)
       
      }
    } finally {
      setGetDateBy(selectedInterval)
    }
  };


  const handleValueChange = (newValue) => {
    var dates = getDatesByInterval(newValue,"month");
    console.log(dates);
    setValue(newValue||(newValue==value)?newValue:value);
    setDates(dates) 
    getByDate(dates)
  } 

  return (
    <div className="lg:flex  flex-row md:w-[280px] w-full lg:w-fit items-center">
     <Datepicker 
      value={value} 
      onChange={handleValueChange}
      
    /> 
    <select id="Interval" 
        className="
          border
          lg:ml-3
          lg:mt-0
          mt-3
          border-g1ray-300 
          text-gray-900 
          text-sm rounded-lg 
          focus:ring-blue-500 
          focus:border-blue-500 
          block lg:w-[280px] w-full p-2.5 "
          onChange={handleChange}
        >
        <option value="month" >by month</option>
         <option value="week">by week</option>
       <option value="day" >by day</option>
       <option value="year">by year</option>
        {/*<option value="quarter">by quarter</option>*/}
      </select>
   

    </div>
  );
};
