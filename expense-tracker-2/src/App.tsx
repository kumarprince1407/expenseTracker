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
        <div className="App">
          <h1 className="text-4xl font-bold text-blue-500">Expense Manager</h1>
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
