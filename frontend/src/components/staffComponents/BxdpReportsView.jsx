import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterButtons from "./FilterButtons";
import { getUserList } from "../../redux/user/fetchAllUsers";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { getAllApprovedOrgs } from "../../redux/org/fetchAllApprovedOrgsSlice";
import { getAllUnapprovedOrgs } from "../../redux/org/fetchAllUnapprovedOrgsSlice";
import moment from "moment";
import { current } from "@reduxjs/toolkit";
import cookie from "js-cookie";
// import { MonthlyOrgSignUpGraph } from "./MonthlyOrgSignUpGraph";
// import { MonthlyProgramSignUpGraph } from "./MonthlyProgramSignUpGraph";
// import { MonthlyEventSignUpGraph } from "./MonthlyEventSignUpGraph";

import { LineGraph } from "./LineGraph";

function BxdpReportsView({
  setEvents,
  setPrograms,
  events,
  programs,
  orgs,
  members,
}) {
  const dispatch = useDispatch();
  const userToken = cookie.get("userToken");
  const userList = useSelector((state) => state?.getUserList?.userList?.users);
  const orgList = useSelector((state) => state?.getAllOrgs?.orgs?.allOrgs);
  // Remove Redux state usage since we're using props
  // const eventList = useSelector((state) => state?.getAllEvents?.events);
  // const programList = useSelector((state) => state?.getAllPrograms?.programs);
  const [getDateBy, setGetDateBy ] = useState("month"); 
  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filterdOrgs, setFilterdOrgs] = useState(orgs);
  const [filteredMembers, setFilteredMembers] = useState(userList);
  const [eventRsvpList, setEventRsvpList] = useState("NA");
  const [programApplicationList, setprogramApplicationList] = useState("NA");
  const [currentCategoryChoice, setCategoryChoice] = useState("All");
  const [currentOrgChoice, setOrgChoice] = useState();
  const [currentProgramChoice, setProgramChoice] = useState();
  const [currentEventChoice, setEventChoice] = useState();
  const [active, setActive] = useState("programs");
  const [currentLineData, setLineData] = useState([]);
  const [currentLineColor, setLineColor] = useState();
  const [dates, setDates] = useState([]);
  const [chartView, setChartView] = useState("programs"); // "programs" or "events"
  
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

  const handleMemberData = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map((x) => ({
      month: moment(x.createdAt).format("MMM-YY"),
      count: 1, // Each member counts as 1 for their registration month
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

  const getMonthly = (array, array2, array3, array4, array5) => {
    if (!array || !Array.isArray(array)) return [];
    
    // Calculate cumulative member count for each month
    let cumulativeMembers = 0;
    const memberData = handleMemberData(array5 || []);
    
    return array.map((month) => {
      // Add new members for this month
      const newMembersThisMonth = handleSum(month, memberData);
      cumulativeMembers += newMembersThisMonth;
      
      return {
        name: month,
        events: handleLength(month, handleOrgData(array2 || [])).length,
        rsvps: handleSum(month, handleEventData(array2 || [])),
        programs: handleLength(month, handleOrgData(array3 || [])).length,
        applicants: handleSum(month, handleProgramData(array3 || [])),
        organizations: handleLength(month, handleOrgData(array4 || [])).length,
        members: cumulativeMembers,
      };
    });
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

  const load = useCallback(() => {
    setLineData(getMonthly(dates, filteredEvents, filteredPrograms, filterdOrgs, filteredMembers));
  }, [dates, filteredEvents, filteredPrograms, filterdOrgs, filteredMembers]);
  
  const reload = useCallback(() => {
    setLineData(getMonthly(dates, events, programs, orgs, userList));
  }, [dates, events, programs, orgs, userList]);
  
  const getByDate = useCallback((dates) => {
    setLineData(getMonthly(dates, filteredEvents, filteredPrograms, filterdOrgs, userList));
  }, [filteredEvents, filteredPrograms, filterdOrgs, userList]);


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
    
    // Add safety check for events, programs, and orgs
    const safeEvents = events || [];
    const safePrograms = programs || [];
    const safeOrgs = orgs || [];
    
    setLineData(getMonthly(dates, safeEvents, safePrograms, safeOrgs, userList));
    setprogramApplicationList(handleTotal(handleProgramData(safePrograms)));
    setEventRsvpList(handleTotal(handleEventData(safeEvents)));
  }, [events, programs, orgs, userList])

  // Update filtered states when props change
  useEffect(() => {
    setFilteredEvents(events || []);
    setFilteredPrograms(programs || []);
    setFilterdOrgs(orgs || []);
    setFilteredMembers(userList || []);
  }, [events, programs, orgs, userList]);

  // Trigger load when filtered data changes
  useEffect(() => {
    if (dates.length > 0) {
      load();
    }
  }, [load, filteredMembers]);

  useEffect(() => {
    dispatch(getUserList({ userToken }));
    
  }, []);

  console.log('BxdpReportsView Debug:', {
    events: events?.length || 0,
    programs: programs?.length || 0,
    orgs: orgs?.length || 0,
    userList: userList?.length || 0,
    filteredEvents: filteredEvents?.length || 0,
    filteredPrograms: filteredPrograms?.length || 0,
    filterdOrgs: filterdOrgs?.length || 0,
    filteredMembers: filteredMembers?.length || 0,
    currentLineData: currentLineData?.length || 0,
    dates: dates?.length || 0,
    eventRsvpList,
    programApplicationList,
    currentCategoryChoice
  });

  const platformTools = [
    { name: "All" },
    {
      name: "Members",
      total: userList ? userList.length : "N/A",
    },
    {
      name: "Organizations",
      total: orgs ? orgs.length : "N/A",
    },
    {
      name: "Events",
      total: events ? events.length : "N/A",
    },
    {
      name: "Programs",
      total: programs ? programs.length : "N/A",
    },
    {
      name: "Event RSVPs",
      total: eventRsvpList ? eventRsvpList.length : 0,
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
        {/* Members Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Members</span>
            <span className="text-3xl font-bold">{userList ? userList.length : 0}</span>
          </div>
        </div>

        {/* Organizations Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Organizations</span>
            <span className="text-3xl font-bold">{orgs ? orgs.length : 0}</span>
          </div>
        </div>

        {/* Events Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Events</span>
            <span className="text-3xl font-bold">{events ? events.length : 0}</span>
          </div>
        </div>

        {/* Programs Card */}
        <div className="bg-tkh-grayscale-10  rounded-[24px] p-6 text-white">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-300 mb-2">Programs</span>
            <span className="text-3xl font-bold">{programs ? programs.length : 0}</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
        {/* Chart Header */}
        <div className="flex justify-between items-center mb-6 p-6">
          {/* Chart Title */}
          <FilterButtons
          platformTools={platformTools}
          setCategoryChoice={setCategoryChoice}
          currentOrgChoice={currentOrgChoice}
          setOrgChoice={setOrgChoice}
          currentProgramChoice={currentProgramChoice}
          setProgramChoice={setProgramChoice}
          currentEventChoice={currentEventChoice}
          setEventChoice={setEventChoice}
          setActive={setActive}
          setEvents={setFilteredEvents}
          orgList={orgList}
          setOrgs={setFilterdOrgs}
          events={events}
          programs={programs}
          setPrograms={setFilteredPrograms}
          userList={userList}
          setMembers={setFilteredMembers}
          load={load}
          dates={dates}
          setDates={setDates}
          reload={reload}
          getByDate={getByDate}
          getDateBy={getDateBy}
          setGetDateBy={setGetDateBy}
        />
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
