//App.tsx
import React from "react";
import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DetailedAnalytics } from "./components/DetailedAnalytics";
import { DetailedAnalyticsBar } from "./components/DetailedAnalyticaBar";
import { Analytics } from "./components/Analytics";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* <div className="App rounded border-4 border-[#74B3F1] m-5"> */}
        <div className="App m-5">
          <h1 className="mainHeading text-6xl font-bold text-[#416FF1] text-left ml-2 mt-2">
            Expense <br />
            Manager
          </h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add_new" element={<ExpenseForm />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
