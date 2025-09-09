import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Filter } from "./Filter";
import{ DateFilter } from"./DateFilter";

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
  { name: "By Org" },
];

const FilterButtons = ({
  platformTools,
  setCategoryChoice,
  currentOrgChoice,
  setOrgChoice,
  currentProgramChoice,
  setProgramChoice,
  currentEventChoice,
  setEventChoice,
  setActive,
  orgList,
  events,
  programs,
  setEvents,
  setPrograms,
  setOrgs,
  userList,
  setMembers,
  load,
  reload,
  dates,
  setDates,
  getByDate,
  getDateBy,
  setGetDateBy,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [selectedProgram, setSelectedProgram] = useState(buttons[1]);
  const [selectedEvent, setSelectedEvent] = useState(buttons[2]);
  const [selectedDate, setSelectedDate] = useState(buttons[3]);
  const [selectedOrg, setSelectedOrg] = useState(buttons[5]);
  
  function resetFilters(event) {
    event.preventDefault();
    if (event) {
      // console.log("clicked");
      setSelectedCategory(buttons[0]);
      setSelectedProgram(buttons[1]);
      setSelectedEvent(buttons[2]);
      setSelectedDate(buttons[3]);
      setSelectedOrg(buttons[5]);
    }
  }

  useEffect(() => {
    if (selectedOrg.name) {
      setOrgChoice(selectedOrg.name);
    }
    if (selectedProgram.name) {
      setProgramChoice(selectedProgram.name);
    }
    if (selectedEvent.name) {
      setEventChoice(selectedEvent.name);
    }
  }, [selectedOrg.name, selectedProgram.name, selectedEvent.name]);

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

      <div className="flex flex-col items-center flex-wrap lg:flex-row lg:justify-arounds gap-4">
        {selectedCategory.name == "All" && (
          <>
            <Filter data={programs} setData={setPrograms} type="program" originalData={programs}/>
            <Filter data={events} setData={setEvents} type="event" originalData={events}/>
            <Filter data={orgList} setData={setOrgs} type="org" originalData={orgList}/>
          </>
        )}
        {selectedCategory.name == "Organizations" && (
          <Filter data={orgList} setData={setOrgs} type="org" originalData={orgList}/>
        )}
        {selectedCategory.name == "Members" && (
          <Filter data={userList} setData={setMembers} type="user" originalData={userList}/>
        )}
        {selectedCategory.name == "Events" && (
          <Filter data={events} setData={setEvents} type="event" originalData={events}/>
        )}
        {selectedCategory.name == "Programs" && (
          <Filter data={programs} setData={setPrograms} type="program" originalData={programs}/>
        )}
        {selectedCategory.name == "Event RSVPs" && (
          <>
            <Filter data={events} setData={setEvents} type="event" originalData={events}/>
            <Filter data={orgList} setData={setOrgs} type="org" originalData={orgList}/>
          </>
        )}
        {selectedCategory.name == "Program Applications" && (
          <>
            <Filter data={programs} setData={setPrograms} type="program" originalData={programs}/>
            <Filter data={orgList} setData={setOrgs} type="org" originalData={orgList}/>
          </>
        )}
        <DateFilter
          dates={dates}
          setDates={setDates}
          reload={reload}
          getByDate={getByDate}
          getDateBy={getDateBy}
          setGetDateBy={setGetDateBy}
        />

        {/*<div
          className="p-1 border-2 border-tkh-brand-tangerine-5 rounded-md bg-tkh-brand-tangerine-5 cursor-pointer flex items-center"
          onClick={reload}
        >
          <RefreshIcon className=" h-[25px] w-[25px] text-tkh-grayscale-0" />
        </div>*/}
      </div>
    </div>
  );
};

export default FilterButtons;
