import { useNavigate } from "react-router-dom";
import moment from "moment";
import ft from "format-time";
import { useState, useEffect } from "react";
import axios from "axios";
import { AddEventDayModal } from "../../../orgComponents/AddEventDayModal";


export const EventDay = ({ 
  multiDay,
  days,
  setDays,
  day,
  setDay
}) => {
  const today = new Date().toISOString().split('T')[0];
  const handleAddDay = (day) => {
    console.log(day)
    setDays((prevDays) => [
      ...prevDays,
      {
        date: day.date,
        start_time: day.start_time,
        end_time: day.end_time,
      },
    ]);
  };

  const handleRemoveDay = (date) => {
    if(days.length<2){
      alert("event needs a date")
    }else{
      setDays(days.filter((day) =>  day.date !== date));
    }
    
  };
  

    return (
      <>
        <div className="flex flex-col w-fit">
          <div className="flex items-center gap-2">
            <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
              Date *
              <input
                type="date"
                name="start_date"
                min={today}
                className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
                value={ moment(day.date).format("YYYY-MM-DD") }
                onChange={(e) => {
                  setDay({
                    date: e.target.value,
                    start_time: day.start_time,
                    end_time: day.end_time,
                  });
                }}
                required
              />
            </label>
            <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
                Start Time*
                  <input
                    type="time"
                    name="start_time"
                    className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
                    value={day.start_time}
                    onChange={(e) => {
                      setDay({
                        date: day.date,
                        start_time: e.target.value,
                        end_time: day.end_time,
                      });
                    }}
                    required
                  />
            </label>
            <label className="flex flex-col  mb-3  text-tkh-grayscale-7">
                End Time*
                  <input
                    type="time"
                    name="end_time"
                    className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
                    min={day.start_time}
                    max="24:00:00"
                    value={day.end_time}
                    onChange={(e) => {
                      setDay({
                        date: day.date,
                        start_time: day.start_time,
                        end_time: e.target.value,
                      });
                    }}
                    required
                  />
            </label>
          </div>
          <div className="flex w-full">
            <button
            type="button"
            onClick={()=>{handleAddDay(day)}}
            className="w-[100%] mb-3 border border-tkh-grayscale-4  
            h-10 rounded-md shadow-sm text-sm font-semibold text-tkh-grayscale-7 
            hover:bg-tkh-brand-tangerine-5 hover:border-tkh-brand-tangerine-5 
            hover:text-tkh-grayscale-0 active:border-tkh-brand-tangerine-5  active:bg-tkh-brand-tangerine-5"
            >
              add day
            </button>
          </div>
        </div>
            
        <label className="flex flex-col mb-3 text-tkh-grayscale-7">
          Days *
          <ol className=" mt-3 list-inside">
            {days.map((day, key) => {

              return (
                <div className="flex">
                < svg width="26" height="26" className="mr-2 fill-tkh-grayscale-5  hover:fill-tkh-brand-tangerine-5 transition ease-in-out duration-300 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => { handleRemoveDay(day.date);}}>
                  <path fil fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" />
                </svg> 
                <li key={key} >
                  {moment(day.date).format("MMMM Do YYYY")}{" "} | 
                  {ft.getFormattedTime(day.start_time.replace(/(:\d{2}| [AP]M)$/, ""))} | 
                  {ft.getFormattedTime(day.end_time.replace(/(:\d{2}| [AP]M)$/, ""))}
                </li>
                </div>
              )
                
            })}
          </ol>
        </label>
            
      </>
    );
};
