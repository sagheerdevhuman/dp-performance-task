import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Filter } from "./Filter";
import{ DateFilter } from"../staffComponents/DateFilter";

import {
  CheckIcon,
  ChevronDownIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
const buttons = [
  { name: "All" },
  { name: "By Program" },
  { name: "By Event" },
  { name: "By Date" },
  { name: "By Category" },
];
const FilterButtons = ({
  platformTools,
  setCategoryChoice,
  currentProgramChoice,
  setProgramChoice,
  currentEventChoice,
  setEventChoice,
  events,
  programs,
  setEvents,
  setPrograms,
  load,
  reload,
  dates,
  setDates,
  getByDate,
  value,
  setValue,
  getDateBy,
  setGetDateBy,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [selectedProgram, setSelectedProgram] = useState(buttons[1]);
  const [selectedEvent, setSelectedEvent] = useState(buttons[2]);
  const [selectedDate, setSelectedDate] = useState(buttons[3]);
  const [selectedOrg, setSelectedOrg] = useState(buttons[5]);

  console.log("dates", dates)
  
  function resetFilters(event) {
    event.preventDefault();
    if (event) {
      setSelectedCategory(buttons[0]);
      setSelectedProgram(buttons[1]);
      setSelectedEvent(buttons[2]);
      setSelectedDate(buttons[3]);
      setSelectedOrg(buttons[5]);
      
      // Reset filtered data to original data
      setEvents(events);
      setPrograms(programs);
      
      // Reload the graph with original data
      if (reload) reload();
    }
  }

  useEffect(() => {
    if (selectedProgram.name) {
      setProgramChoice(selectedProgram.name);
    }
    if (selectedEvent.name) {
      setEventChoice(selectedEvent.name);
    }
  }, [ selectedProgram.name, selectedEvent.name]);

  useEffect(() => {
    setCategoryChoice(selectedCategory.name);
  }, [selectedCategory]);

  
  return (
    <div className="flex flex-col items-center flex-wrap lg:flex-row lg:justify-start lg:flex-nowrap gap-7 w-full">
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="relative mt-1 w-80">
          <Listbox.Button className="relative w-full cursor-default lg:cursor-pointer rounded-lg  bg-tkh-grayscale-3 border-tkh-brand-purple-2 border-2 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedCategory.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-tkh-grayscale-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {platformTools.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 md:pl-10 md:pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <div className="flex flex-col items-center flex-wrap lg:flex-row lg:justify-arounds gap-4 w-full">
        {selectedCategory.name == "All" && (
          <>
            <Filter data={programs} setData={setPrograms} type="program" load={load} originalData={programs}/>
            <Filter data={events} setData={setEvents} type="event" load={load} originalData={events}/>
          </>
        )}
        {selectedCategory.name == "Events" && (
          <Filter data={events} setData={setEvents} type="event" load={load} originalData={events}/>
        )}
        {selectedCategory.name == "Programs" && (
          <Filter data={programs} setData={setPrograms} type="program" load={load} originalData={programs}/>
        )}
        {selectedCategory.name == "Event RSVPs" && (
          <>
            <Filter data={events} setData={setEvents} type="event" load={load} originalData={events}/>
          </>
        )}
        {selectedCategory.name == "Program Applications" && (
          <>
            <Filter data={programs} setData={setPrograms} type="program" load={load} originalData={programs}/>
          </>
        )}
        <DateFilter
          dates={dates}
          setDates={setDates}
          reload={reload}
          getByDate={getByDate}
          value={value}
          setValue={setValue}
          getDateBy={getDateBy}
          setGetDateBy={setGetDateBy}
        />

        <div
          className="p-2 border-2 border-gray-300 rounded-md bg-gray-100 cursor-pointer flex items-center hover:bg-gray-200 transition-colors"
          onClick={resetFilters}
          title="Reset all filters"
        >
          <RefreshIcon className="h-5 w-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
