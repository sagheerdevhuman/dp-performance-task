import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import moment from "moment";


import {
  CheckIcon,
  ChevronDownIcon,
  RefreshIcon,
} from "@heroicons/react/solid";


export const EventFilter = ({selectedEvent,setSelectedEvent,events,setData}) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleEventData = array => {
    return array.map( x => ( { month: moment(x.createdAt).format("MMMM"),count:x.rsvps.length } ));
  }

  const handleSum = (month,data) => {
    return data.filter( x=> month == x.month ).map( y => y.count ).reduce( (acc, score) => acc + score, 0);
  }

  const getMonthly = (array,array2,handle ) => {
     return array.map( month => ( { month:month , count:handleSum( month, handle(array2) )} ))
  }


  return (

    <Listbox value={selectedEvent} onChange={setSelectedEvent}>
      <div className="relative mt-1 w-80 lg:w-52">
        <Listbox.Button onClick={x=>setData(getMonthly(months,events,handleEventData))} className="relative w-full cursor-default rounded-lg bg-tkh-grayscale-3 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedEvent.name}</span>
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-tkh-grayscale-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {/*{events.map((event, key) => (
              <Listbox.Option
                key={key}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={event}
                
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {event.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}*/}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

