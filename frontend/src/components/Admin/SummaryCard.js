import React from "react";
import CountUp from "react-countup";

const SummaryCard = () => {
  return (
    <div className="flex-shrink-0 items-center justify-center bg-gray-50 max-w-xs sm:w-full min-w-min py-4 dark:bg-dark-gray">
      <div class="flow-root text-center shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden dark:bg-dark-gray-lighter">
        <div className="sm:min-w-0">
          <p class="text-gray-800 dark:text-gray-50 text-lg font-medium mb-2">
            Confessions To Be Approved
          </p>
          <p class="text-5xl text-gray-600 dark:text-gray-200">
            <CountUp end={100} />
          </p>
          <div className="flex mt-4 justify-center">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
