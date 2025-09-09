// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllEvents } from "../../redux/events/fetchAllEventsSlice";
// import moment from "moment";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// export const MonthlyEventSignUpGraph = ({ currentEventChoice }) => {
//   const dispatch = useDispatch();
//   const userToken = sessionStorage.getItem("userToken");
//   const [events, setEvents] = useState([]);
//   const eventsList = useSelector(
//     (state) => state?.getAllEvents
//   );

//   useEffect(() => {
//     dispatch(getAllEvents());
//   }, []);

//   useEffect(() => {
//     if (eventsList?.status == "success") {
//       setEvents(eventsList?.events);
//     }
//   }, [eventsList]);

//   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//   const handleEventData = array => {
//     return array.map( x => ( { month: moment(x.createdAt).format("MMMM"),count:x.rsvps.length } ));
//   }
//   const handleSum = (month,data) => {
//     return data.filter( x=> month == x.month ).map( y => y.count ).reduce( (acc, score) => acc + score, 0);
//   }

//   const getMonthly = (array,array2,handle ) => {
//      return array.map( month => ( { month:month , count:handleSum( month, handle(array2) )} ))
//   }
//   const data = getMonthly(months,events,handleEventData)

//   console.log(events)
//   return (
//     <ResponsiveContainer width="95%" height="90%">
//       <LineChart width={100} height={250} data={data}>
//         <CartesianGrid stroke="#ccc" />
//         <XAxis dataKey="month"/>
//         <YAxis />
//         <Line type="monotone" dataKey="count" stroke="#82ca9d" />
//          <Tooltip />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };
