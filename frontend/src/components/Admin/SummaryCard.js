import React from "react";
import CountUp from "react-countup";

const SummaryCard = (props) => {
  const colour = props.colour;
  const data = props.data;

  const backgroundColourSettings = () => {
    if (colour === "yellow") {
      return " bg-yellow-50 dark:bg-yellow-600";
    } else {
      return " bg-gray-50 dark:bg-dark-gray";
    }
  }

  return (
    <div key={props.options.key} className="flex-shrink-0 items-center justify-center max-w-none md:w-44 lg:w-auto xl:w-72 sm:w-full min-w-min py-4 bg-gray-50 dark:bg-dark-gray">
      <div class="flow-root text-center shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden dark:bg-dark-gray-lighter">
        <div className="sm:min-w-0">
          <p class="text-gray-800 dark:text-gray-50 text-lg font-medium mb-2">
            {data.title}
          </p>
          <p class="text-5xl text-gray-600 dark:text-gray-200">
            <CountUp end={data.count} />
          </p>
          <div className="flex mt-4 justify-center">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Filter
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SummaryCard;
