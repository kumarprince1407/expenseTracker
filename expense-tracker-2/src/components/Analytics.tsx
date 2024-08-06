//Analytics.tsx
import { DetailedAnalytics } from "./DetailedAnalytics";
import { DetailedAnalyticsBar } from "./DetailedAnalyticaBar";
import { useNavigate } from "react-router-dom";

export const Analytics = () => {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <>
      <p className="analytics_text text-2xl text-blue-400 mt-2">
        Detailed Analytics
      </p>
      <div className="graph_container ">
        <div className="graphs flex flex-row justify-evenly">
          <DetailedAnalytics />
          <DetailedAnalyticsBar />
        </div>
        <button
          onClick={goToDashboard}
          style={{
            width: "14vw",
            height: "4vh",
            color: "whitesmoke",
            backgroundColor: "#7CD9F5",
            borderRadius: "4px",
            marginBottom: "5%",
          }}
        >
          Go To Dashboard
        </button>
      </div>
    </>
  );
};
