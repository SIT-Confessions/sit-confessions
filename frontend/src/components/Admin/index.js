import React from "react";
import SummaryCard from "./SummaryCard.js";

const index = () => {
  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-5">
        Welcome to the dashboard, Admin!
      </h1>
      <SummaryCard />
    </div>
  );
};

export default index;
