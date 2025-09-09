import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrgs } from "../../redux/org/fetchAllOrgsSlice";
import { getAllApprovedOrgs } from "../../redux/org/fetchAllApprovedOrgsSlice";
import { getAllUnapprovedOrgs } from "../../redux/org/fetchAllUnapprovedOrgsSlice";
import moment from "moment";
import { LineChart } from '@mui/x-charts/LineChart';
import { current } from "@reduxjs/toolkit";

export const LineGraph = ({
  currentCategoryChoice,
  currentLineData,
}) => {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(1000);

  // Update chart width when container size changes
  useEffect(() => {
    const updateChartWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        
        // Calculate responsive width with minimum size
        const width = Math.max(400, containerWidth - 40); // 40px for padding
        
        setChartWidth(width);
      }
    };

    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    
    // Use ResizeObserver for more accurate container size detection
    const resizeObserver = new ResizeObserver(updateChartWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateChartWidth);
      resizeObserver.disconnect();
    };
  }, []);

  const dataSets = [
    { name: "Events", data: "events", lineColor: "#A78BFA" },
    { name: "Programs", data: "programs", lineColor: "#A78BFA" },
    { name: "Event RSVPs", data: "rsvps", lineColor: "#A78BFA" },
    { name: "Program Applications", data: "applicants", lineColor: "#A78BFA" },
  ];

  // Transform data for MUI X Charts
  const transformDataForMUI = () => {
    if (!currentLineData || currentLineData.length === 0) {
      return { xAxis: [], series: [] };
    }

    // Filter out any items with undefined or null name
    const validData = currentLineData.filter(item => item && item.name);
    
    if (validData.length === 0) {
      return { xAxis: [], series: [] };
    }

    const xAxis = validData.map(item => item.name);
    
    if (currentCategoryChoice === "All") {
      const series = dataSets.map(set => ({
        data: validData.map(item => {
          const value = item[set.data];
          return typeof value === 'number' ? value : 0;
        }),
        label: set.name,
        color: set.lineColor,
        curve: "linear",
      }));
      return { xAxis, series };
    } else {
      const selectedSet = dataSets.find(set => set.name === currentCategoryChoice);
      if (selectedSet) {
        const series = [{
          data: validData.map(item => {
            const value = item[selectedSet.data];
            return typeof value === 'number' ? value : 0;
          }),
          label: selectedSet.name,
          color: selectedSet.lineColor,
          curve: "linear",
        }];
        return { xAxis, series };
      }
    }
    
    return { xAxis: [], series: [] };
  };

  const { xAxis, series } = transformDataForMUI();

  if (xAxis.length === 0 || series.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full p-0">
      <LineChart
        width={chartWidth}
        height={350}
        series={series}
        xAxis={[{ 
          scaleType: 'point', 
          data: xAxis,
          tickLabelStyle: {
            fontSize: 12,
            fill: '#6B7280',
          },
          disableLine: true,
          disablePoints: true,
          disableTicks: true,
          disableGridLines: true,
        }]}
        yAxis={[{
          tickLabelStyle: {
            fontSize: 12,
            fill: '#6B7280',
          },
          disableLine: true,
          disablePoints: true,
          disableTicks: true,
          disableGridLines: true,
        }]}
        sx={{
          '.MuiLineElement-root': {
            strokeWidth: 2,
            stroke: '#A78BFA', // Light purple color
          },
          '.MuiMarkElement-root': {
            strokeWidth: 2,
            stroke: '#000000', // Black outline
            fill: '#FFFFFF', // White fill for hollow circles
            r: 4,
          },
          '.MuiChartsAxis-line': {
            stroke: 'transparent', // Hide axis lines
          },
          '.MuiChartsAxis-tick': {
            stroke: 'transparent', // Hide tick marks
          },
          '.MuiChartsAxis-tickLabel': {
            fill: '#6B7280',
            fontSize: 12,
          },
          '.MuiChartsLegend-root': {
            fontSize: 12,
          },
          '.MuiChartsGrid-root': {
            stroke: '#E5E7EB',
            strokeWidth: 1,
          },
        }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'top', horizontal: 'right' },
            padding: 0,
          },
        }}
        margin={{
          left: 60,
          right: 60,
          top: 40,
          bottom: 40,
        }}
      />
    </div>
  );
};
