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
      <div className="flex flex-col items-center justify-start min-h-screen">
        <p className=" text-5xl text-blue-400 mt-5">Detailed Analytics</p>
        <div>
          <div className="graphs flex flex-row justify-start">
            <DetailedAnalytics />
            <DetailedAnalyticsBar />
          </div>
          <button
            onClick={goToDashboard}
            className="w-[14vw] h-[4vh] mt-[5vh] mb-[2vh] text-[#f5f5f5] bg-[#7CD9F5] rounded-[4px]"
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    </>
  );
};
