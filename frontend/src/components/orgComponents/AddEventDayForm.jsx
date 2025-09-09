import { useState, useEffect } from "react";
export const AddEventDayForm = ({ isModalRendered, handleAddDay }) => {
  const today = new Date().toISOString().split('T')[0];`1`
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  return (
    <form
      className="text-xl flex flex-col justify-center items-center gap-6  w-full  bg-tkh-grayscale-1 overflow-auto"
      onSubmit={(e) => handleAddDay(e)}
    >
      <label className="flex flex-col  w-[100%]  text-tkh-grayscale-7">
        Date
        <input
          className="text-2rounded justify-center text-pink-500 w-[100%] text-tkh-grayscale-10"
          type="date"
          min={today}
          placeholder="Type here..."
          name="date"
          required
        />
      </label>

      <label className="flex flex-col  w-[100%]  text-tkh-grayscale-7">
        Start Time*
        <input
          type="time"
          name="start_time"
          className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
          required
          onChange={(e) => {
            e.preventDefault();
            setStartTime(e.target.value);
            // Clear end time if it becomes the same as new start time
            if (e.target.value === endTime) {
              setEndTime('');
            }
          }}
        />
      </label>
      <label className="flex flex-col  w-[100%]  text-tkh-grayscale-7">
        End Time*
        
          <input
            type="time"
            name="end_time"
            min={startTime}
            max="24:00:00"
            className="rounded text-pink-500 justify-center text-tkh-grayscale-10"
            required
            value={endTime}
            onChange={(e) => {
              e.preventDefault();
              // Prevent end time from being the same as start time
              if (e.target.value === startTime) {
                return;
              }
              setEndTime(e.target.value);
            }}
          />
      </label>


      <button
        className="inline-flex items-center h-12 w-[100%] justify-center h-10 px-5 py-2.5 border border-tkh-grayscale-7 rounded-md shadow-sm text-sm font-semibold text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-8 active:border-tkh-brand-tangerine-2  active:bg-tkh-brand-tangerine-2"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
