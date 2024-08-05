import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";

export const DetailedAnalytics = () => {
  const location = useLocation();
  const categoryData = location.state?.categoryData;
  const navigate = useNavigate();

  if (!categoryData) {
    return <p>No data available</p>; // Handle cases where data might not be available
  }

  const data = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  const colors = [
    "#5A9BD4",
    "#ED7D31",
    "#A5A5A5",
    "#FFC000",
    "#4472C4",
    "#70AD47",
  ];

  const options = {
    autoSize: true,
    data: data,
    title: {
      text: "Expenses by Category",
      fontSize: 18,
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        labelKey: "category",
        fills: colors,
        strokes: colors,
      } as any, //Quick fix for type copatibility
    ],
  };

  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <p>Detailed Analytics</p>
        <div
          className="mainContainer flex items-center justify-center min-h-screen"
          style={{ height: "70%" }}
        >
          <div
            className="analyticsContainer rounded border border-black"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "70vw",
              height: "70vh",
            }}
          >
            <AgCharts options={options} />
            <div
              className="legendContainer"
              style={{ marginTop: "2rem", textAlign: "center" }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    marginRight: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: colors[index % colors.length],
                      marginRight: "0.5rem",
                    }}
                  ></span>
                  <span>{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={goToDashboard}
          style={{
            width: "14vw",
            height: "5vh",
            marginTop: "5vh",
            color: "whitesmoke",
            backgroundColor: "#7CD9F5",
            borderRadius: "4px",
            marginBottom: "10%",
          }}
        >
          Go To Dashboard
        </button>
      </div>
    </>
  );
};
