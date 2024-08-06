//DetailedAnalyticsBar.tsx -Bar Graph
import React from "react";
import { useLocation } from "react-router-dom";
import { AgCharts } from "ag-charts-react";

export const DetailedAnalyticsBar = () => {
  const location = useLocation();
  const categoryCounts = location.state?.categoryCounts;

  console.log("Category Counts:", categoryCounts);

  if (!categoryCounts) {
    return <p>No data available</p>; // Handle cases where data might not be available
  }

  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  console.log("Chart Data:", data);

  const options = {
    autoSize: true,
    data: data,
    title: {
      text: "Expenses Count by Category",
      fontSize: 18,
    },
    series: [
      {
        type: "bar",
        xKey: "category",
        yKey: "count",
        fill: "#5A9BD4",
        stroke: "#5A9BD4",
      } as any, //Quick fix for type copatibility
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Category" }, //Added axis title for clarity(optional)
      },
      {
        type: "number",
        position: "left",
        title: { text: "Count" }, //Added axis title for clarity(optional)
      },
    ],
  };
  //change
  return (
    <>
      <div>
        <div
          // className="mainContainer flex items-center justify-center min-h-screen"
          className="flex items-center justify-center"
        >
          <div
            // className="analyticsContainer rounded border border-black"
            className="flex flex-col justify-evenly w-[44vw] h-[44vh]"
          >
            <AgCharts options={options} />
          </div>
        </div>
      </div>
    </>
  );
};
