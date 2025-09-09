// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
// import { getAllApprovedOrgs } from "../../redux/org/fetchAllApprovedOrgsSlice";
// import { getAllUnapprovedOrgs } from "../../redux/org/fetchAllUnapprovedOrgsSlice";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// export const MonthlyOrgSignUpGraph = ({ currentOrgChoice }) => {
//   const dispatch = useDispatch();
//   const userToken = sessionStorage.getItem("userToken");
//   const allOrgs = useSelector((state) => state?.getAllOrgs?.orgs?.allOrgs);
//   const allApprovedOrgs = useSelector(
//     (state) => state?.getAllApprovedOrgs?.orgs?.allApprovedOrgs
//   );
//   const allUnapprovedOrgs = useSelector(
//     (state) => state?.getAllUnapprovedOrgs?.orgs?.allUnapprovedOrgs
//   );

//   const [showLineData, hideLineData] = useState([
//     {
//       hideTotalCount: false,
//       hideApprovedCount: false,
//       hideUnapprovedCount: false,
//     },
//   ]);

//   useEffect(() => {
//     if (currentOrgChoice == "Approved") {
//       hideLineData({
//         ...showLineData,
//         hideTotalCount: true,
//         hideApprovedCount: false,
//         hideUnapprovedCount: true,
//       });
//     } else if (currentOrgChoice == "Unapproved") {
//       hideLineData({
//         ...showLineData,
//         hideTotalCount: true,
//         hideApprovedCount: true,
//         hideUnapprovedCount: false,
//       });
//     } else {
//       hideLineData({
//         ...showLineData,
//         hideTotalCount: false,
//         hideApprovedCount: false,
//         hideUnapprovedCount: false,
//       });
//     }
//   }, [currentOrgChoice]);

//   useEffect(() => {
//     dispatch(getAllOrgs());
//     dispatch(getAllApprovedOrgs(userToken));
//     dispatch(getAllUnapprovedOrgs(userToken));
//   }, []);

//   const monthlyOrgSignUpTotal = [
//     { name: "Jan", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Feb", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Mar", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Apr", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Jun", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Jul", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Aug", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Sep", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Oct", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Nov", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//     { name: "Dec", totalCount: 0, approvedCount: 0, unapprovedCount: 0 },
//   ];

//   if (allOrgs) {
//     allOrgs.forEach((org) => {
//       const convertedMonth = new Date(org.createdAt)
//         .toLocaleString("default", { month: "long" })
//         .slice(0, 3);

//       monthlyOrgSignUpTotal.forEach((month) => {
//         if (convertedMonth == month.name) {
//           month.totalCount += 1;
//         }
//       });
//     });
//   }

//   if (allApprovedOrgs) {
//     allApprovedOrgs.forEach((org) => {
//       const convertedMonth = new Date(org.createdAt)
//         .toLocaleString("default", { month: "long" })
//         .slice(0, 3);

//       monthlyOrgSignUpTotal.forEach((month) => {
//         if (convertedMonth == month.name) {
//           month.approvedCount += 1;
//         }
//       });
//     });
//   }

//   if (allUnapprovedOrgs) {
//     allUnapprovedOrgs.forEach((org) => {
//       const convertedMonth = new Date(org.createdAt)
//         .toLocaleString("default", { month: "long" })
//         .slice(0, 3);

//       monthlyOrgSignUpTotal.forEach((month) => {
//         if (convertedMonth == month.name) {
//           month.unapprovedCount += 1;
//         }
//       });
//     });
//   }

//   return (
//     <ResponsiveContainer width="95%" height="90%">
//       <LineChart width={100} height={250} data={monthlyOrgSignUpTotal}>
//         <CartesianGrid stroke="#ccc" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Line
//           type="monotone"
//           dataKey="totalCount"
//           stroke="#3a86ff"
//           isAnimationActive={false}
//           activeDot={{ r: 8 }}
//           hide={showLineData.hideTotalCount}
//         />
//         <Line
//           type="monotone"
//           dataKey="approvedCount"
//           stroke="#8ac926"
//           isAnimationActive={false}
//           activeDot={{ r: 8 }}
//           hide={showLineData.hideApprovedCount}
//         />
//         <Line
//           type="monotone"
//           dataKey="unapprovedCount"
//           stroke="#BF211E"
//           isAnimationActive={false}
//           activeDot={{ r: 8 }}
//           hide={showLineData.hideUnapprovedCount}
//         />
//         <Tooltip />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };
