import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterButtons from "./FilterButtons";
import { LineGraph } from "./LineGraph";
import moment from "moment";
import { current } from "@reduxjs/toolkit";
import {getDatesByInterval} from "../utls/getDatesByInterval";
import cookie from "js-cookie";

function BxdpReportsView({
  setEvents,
  setPrograms,
  events,
  programs,
}) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  // Remove Redux state usage since we're using props
  // const eventList = useSelector((state) => state?.getAllEvents?.events);
  // const programList = useSelector((state) => state?.getAllPrograms?.programs);
  const [getDateBy, setGetDateBy ] = useState("month");
  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [value, setValue] = useState({});
  const [eventRsvpList, setEventRsvpList] = useState(0);
  const [programApplicationList, setprogramApplicationList] = useState(0);

  const [currentCategoryChoice, setCategoryChoice] = useState("All");
  const [currentProgramChoice, setProgramChoice] = useState();
  const [currentEventChoice, setEventChoice] = useState();

  const [currentLineData, setLineData] = useState([]);
  const [currentLineColor, setLineColor] = useState();
  const [dates, setDates] = useState([]);


  const handleOrgData = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map((x) => ({ month: moment(x.createdAt).format("MMM-YY") }));
  };
  
  const handleEventData = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map((x) => ({
      month: moment(x.createdAt).format("MMM-YY"),
      count: x.rsvps ? x.rsvps.length : 0,
    }));
  };

  const handleProgramData = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map((x) => ({
      month: moment(x.createdAt).format("MMM-YY"),
      count: x.applicants ? x.applicants.length : 0,
    }));
  };
  const handleSum = (month, data) => {
    if (!data || !Array.isArray(data)) return 0;
    return data
      .filter((x) => month == x.month)
      .map((y) => y.count || 0)
      .reduce((acc, score) => acc + score, 0);
  };
  const handleTotal = (data) => {
    if (!data || !Array.isArray(data)) return 0;
    return data.map((y) => y.count || 0).reduce((acc, score) => acc + score, 0);
  };

  const handleLength = (month, data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((x) => month == x.month);
  };

  const getMonthly = (array, array2, array3) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map((month) => ({
      name: month,
      events: handleLength(month, handleOrgData(array2 || [])).length,
      rsvps: handleSum(month, handleEventData(array2 || [])),
      programs: handleLength(month, handleOrgData(array3 || [])).length,
      applicants: handleSum(month, handleProgramData(array3 || [])),
    }));
  };

  const handleData = (array) => {
    array.forEach((listItem) => {
      const convertedMonth = new Date(listItem.createdAt)
        .toLocaleString("default", { month: "long" })
        .slice(0, 3);

      months.forEach((month) => {
        if (convertedMonth == month.name) {
          month.count += 1;
        }
      });
    });
  };

  const load = () => {
    // Use filtered data based on current category choice
    let eventsToUse = filteredEvents;
    let programsToUse = filteredPrograms;
    
    // If specific category is selected, use appropriate filtered data
    if (currentCategoryChoice === "Events" || currentCategoryChoice === "Event RSVPs") {
      programsToUse = []; // Don't show programs data
    } else if (currentCategoryChoice === "Programs" || currentCategoryChoice === "Program Applications") {
      eventsToUse = []; // Don't show events data
    }
    // For "All" category, use both filtered events and programs
    
    setLineData(getMonthly(dates, eventsToUse, programsToUse));
  }
  const reload = () => {
    // Use original data but respect current category choice
    let eventsToUse = events;
    let programsToUse = programs;
    
    // If specific category is selected, use appropriate data
    if (currentCategoryChoice === "Events" || currentCategoryChoice === "Event RSVPs") {
      programsToUse = []; // Don't show programs data
    } else if (currentCategoryChoice === "Programs" || currentCategoryChoice === "Program Applications") {
      eventsToUse = []; // Don't show events data
    }
    // For "All" category, use both events and programs
    
    setLineData(getMonthly(dates, eventsToUse, programsToUse));
  }
  const getByDate = (dates) => {
    // Use filtered data based on current category choice
    let eventsToUse = filteredEvents;
    let programsToUse = filteredPrograms;
    
    // If specific category is selected, use appropriate filtered data
    if (currentCategoryChoice === "Events" || currentCategoryChoice === "Event RSVPs") {
      programsToUse = []; // Don't show programs data
    } else if (currentCategoryChoice === "Programs" || currentCategoryChoice === "Program Applications") {
      eventsToUse = []; // Don't show events data
    }
    // For "All" category, use both filtered events and programs
    
    setLineData(getMonthly(dates, eventsToUse, programsToUse));
  }

  useEffect(() => {
    var dates = [];
    // Generate dates for the last 12 months instead of just current year
    var startDate = moment().subtract(11, "months").startOf('month');
    var endDate = moment().endOf('month');

    var month = moment(startDate); //clone the startDate
    while( month <= endDate ) {
        dates.push(month.format('MMM-YY'));
        month.add(1, "month");
    }
    setDates(dates)  
    
    // Add safety check for events and programs
    const safeEvents = events || [];
    const safePrograms = programs || [];
    
    setLineData(getMonthly(dates, safeEvents, safePrograms));
    setprogramApplicationList(handleTotal(handleProgramData(safePrograms)));
    setEventRsvpList(handleTotal(handleEventData(safeEvents)));
  }, [events, programs])

  // Update filtered states when props change
  useEffect(() => {
    setFilteredEvents(events || []);
    setFilteredPrograms(programs || []);
  }, [events, programs]);

  // Update line data when category choice changes
  useEffect(() => {
    if (dates.length > 0) {
      load();
    }
  }, [currentCategoryChoice, filteredEvents, filteredPrograms]);

  console.log('OrgReportView Debug:', {
    events: events?.length || 0,
    programs: programs?.length || 0,
    filteredEvents: filteredEvents?.length || 0,
    filteredPrograms: filteredPrograms?.length || 0,
    currentLineData: currentLineData?.length || 0,
    dates: dates?.length || 0,
    eventRsvpList,
    programApplicationList,
    sampleEvent: events?.[0],
    sampleProgram: programs?.[0],
    processedEventData: events ? handleEventData(events.slice(0, 3)) : [],
    processedProgramData: programs ? handleProgramData(programs.slice(0, 3)) : []
  });

  // Calculate totals for KPI cards
  const totalEvents = events ? events.length : 0;
  const totalRSVPs = eventRsvpList;
  const totalPrograms = programs ? programs.length : 0;
  const totalApplications = programApplicationList;

  const platformTools = [
    { name: "All" },
    {
      name: "Events",
      total: events ? events.length : 0,
    },
    {
      name: "Programs",
      total: programs ? programs.length : 0,
    },
    {
      name: "Event RSVPs",
      total: eventRsvpList
    },
    {
      name: "Program Applications",
      total: programApplicationList ? programApplicationList.length : 0,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="flex flex-col justify-center gap-2 text-center lg:text-start">
        
      </header>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Events Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Events</span>
            <span className="text-3xl font-bold">{totalEvents.toLocaleString()}</span>
          </div>
        </div>

        {/* RSVPs Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">RSVPs</span>
            <span className="text-3xl font-bold">{totalRSVPs.toLocaleString()}</span>
          </div>
        </div>

        {/* Programs Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Programs</span>
            <span className="text-3xl font-bold">{totalPrograms.toLocaleString()}</span>
          </div>
        </div>

        {/* Applications Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Applications</span>
            <span className="text-3xl font-bold">{totalApplications.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#F9F9FA] rounded-[24px] shadow-lg border border-gray-200 ">
        {/* Chart Header with Navigation */}
        <div className="flex justify-between items-center mb-6 p-6">
        <FilterButtons
          platformTools={platformTools}
          setCategoryChoice={setCategoryChoice}
          currentProgramChoice={currentProgramChoice}
          setProgramChoice={setProgramChoice}
          currentEventChoice={currentEventChoice}
          setEventChoice={setEventChoice}
          events={events}
          programs={programs}
          setEvents={setFilteredEvents}
          setPrograms={setFilteredPrograms}
          load={load}
          dates={dates}
          setDates={setDates}
          reload={reload}
          getByDate={getByDate}
          value={value}
          setValue={setValue}
          getDateBy={getDateBy}
          setGetDateBy={setGetDateBy}
        />
          {/* Category Display */}
          {/* <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {currentCategoryChoice === "All" ? "All Categories" : currentCategoryChoice}
            </h3>
          </div> */}

          {/* Time Range Dropdown */}
          {/* <div className="relative">
            <select
              value={getDateBy}
              onChange={(e) => setGetDateBy(e.target.value)}
              className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div> */}
        </div>

        {/* Chart Container */}
        <div className="w-full h-96 p-0">
          <LineGraph
            currentCategoryChoice={currentCategoryChoice}
            currentLineData={currentLineData}
          />
        </div>
      </div>
    </div>
  );
}

export default BxdpReportsView;
