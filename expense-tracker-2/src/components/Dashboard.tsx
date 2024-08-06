//Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

//AG grid components
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef } from "ag-grid-community";
import { useExpenseData } from "../api/formOperations";

import { useNavigate } from "react-router-dom";

// Define the type for row data
interface RowData {
  description: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

// Define the type for aggregated category data
interface CategoryData {
  [key: string]: number;
}

export const Dashboard = () => {
  const { data: rowData = [], isLoading, error } = useExpenseData();

  const navigate = useNavigate();

  const goToExpenseForm = () => {
    navigate("/add_new");
  };

  const goToAnalyticsPage = () => {
    const categoryData = aggregateCategoryData(rowData);
    const categoryCounts = countCategoryOccurences(rowData);
    navigate("/analytics", { state: { categoryData, categoryCounts } });
  };

  const columnDefs: ColDef<RowData>[] = [
    {
      headerName: "Description",
      field: "description",
      cellStyle: { textAlign: "left" },
    },
    { headerName: "Amount", field: "amount", cellStyle: { textAlign: "left" } },
    { headerName: "Date", field: "date", cellStyle: { textAlign: "left" } },
    {
      headerName: "Category",
      field: "category",
      cellStyle: { textAlign: "left" },
    },
    { headerName: "Notes", field: "notes", cellStyle: { textAlign: "left" } },
    { headerName: "Actions", field: "notes", cellStyle: { textAlign: "left" } },
  ];

  // Total amount
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    if (rowData.length > 0) {
      const total = rowData.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalAmount(total);
    }
  }, [rowData]);

  //Total count
  const countCategoryOccurences = (data: RowData[]): CategoryData => {
    return data.reduce((acc: CategoryData, curr: RowData) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
  };

  // Graph
  const aggregateCategoryData = (data: RowData[]): CategoryData => {
    return data.reduce((acc: CategoryData, curr: RowData) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
  };

  return (
    <>
      <div className="m-8">
        <h2 className="text-5xl text-blue-400 mt-2">Dashboard</h2>

        <button
          onClick={goToExpenseForm}
          className="w-[14vw] h-[4vh] mt-[5vh] mb-[5vh] text-[#f5f5f5] bg-[#7CD9F5] rounded-[4px]"
        >
          Add new Expense
        </button>
        <div className="flex flex-col items-center justify-start min-h-screen h-[90vh]">
          <div className="ag-theme-quartz w-[64vw] h-[40vh]">
            <AgGridReact rowData={rowData} columnDefs={columnDefs} />
          </div>
          <h2 className="total text-2xl"> Total Amount: {totalAmount}</h2>
          <button
            onClick={goToAnalyticsPage}
            className="w-[14vw] h-[5vh] mt-[2vh] mb-[2vh] text-[#f5f5f5] bg-[#7CD9F5] rounded-[4px]"
          >
            Detailed Analytics
          </button>
        </div>
      </div>
    </>
  );
};
