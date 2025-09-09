// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllPrograms } from "../../redux/programs/fetchAllProgramsSlice";
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

// export const MonthlyProgramSignUpGraph = ({ currentPogramChoice }) => {
//   const dispatch = useDispatch();
//   const userToken = sessionStorage.getItem("userToken");
//   const [programs, setPrograms] = useState([]);
//   const programsList = useSelector(
//     (state) => state?.getAllPrograms
//   );

//   // const [showLineData, hideLineData] = useState([
//   //   {
//   //     hideTotalCount: false,
//   //     hideApprovedCount: false,
//   //     hideUnapprovedCount: false,
//   //   },
//   // ]);

//   // useEffect(() => {
//   //   if (currentOrgChoice == "Approved") {
//   //     hideLineData({
//   //       ...showLineData,
//   //       hideTotalCount: true,
//   //       hideApprovedCount: false,
//   //       hideUnapprovedCount: true,
//   //     });
//   //   } else if (currentOrgChoice == "Unapproved") {
//   //     hideLineData({
//   //       ...showLineData,
//   //       hideTotalCount: true,
//   //       hideApprovedCount: true,
//   //       hideUnapprovedCount: false,
//   //     });
//   //   } else {
//   //     hideLineData({
//   //       ...showLineData,
//   //       hideTotalCount: false,
//   //       hideApprovedCount: false,
//   //       hideUnapprovedCount: false,
//   //     });
//   //   }
//   // }, [currentOrgChoice]);

//   useEffect(() => {
//     dispatch(getAllPrograms());
//   }, []);
//   useEffect(() => {
//     if (programsList?.status == "success") {
//       setPrograms(programsList?.programs);
//     }
//   }, [programsList]);

//   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//   const handleProgramData = array => {
//     return array.map( x => ( { month: moment(x.createdAt).format("MMMM"),count:x.applicants.length } ));
//   }
//   const handleSum = (month,data) => {
//     return data.filter( x=> month == x.month ).map( y => y.count ).reduce( (acc, score) => acc + score, 0);
//   }

//   const getMonthly = (array,array2,handle ) => {
//      return array.map( month => ( { month:month , count:handleSum( month, handle(array2) )} ))
//   }
//   const data = getMonthly(months,programs,handleProgramData)

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
