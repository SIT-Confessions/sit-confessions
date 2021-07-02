import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const SummaryCard = (props) => {
  const colour = props.options.colour;
  const data = props.data;
  const [colourBG, setColourBG] = useState("");
  const [textColour, setTextColour] = useState("");

  const backgroundColourSettings = () => {
    switch (colour) {
      case "yellow":
        setColourBG(" bg-yellow-300 dark:bg-yellow-400");
        setTextColour(" text-yellow-700 dark:text-yellow-800");
        break;
      case "green":
        setColourBG(" bg-green-300 dark:bg-green-400");
        setTextColour(" text-green-700 dark:text-green-800");
        break;
      case "red":
        setColourBG(" bg-red-300 dark:bg-red-400");
        setTextColour(" text-red-700 dark:text-red-800");
        break;
      case "blue":
        setColourBG(" bg-blue-300 dark:bg-blue-400");
        setTextColour(" text-blue-700 dark:text-blue-800");
        break;
      case "pink":
        setColourBG(" bg-pink-300 dark:bg-pink-400");
        setTextColour(" text-pink-700 dark:text-pink-800");
        break;
      default:
        setColourBG(" bg-white dark:bg-dark-gray-lighter");
        setTextColour(" text-gray-700 dark:text-gray-100");
    }
  };

  useEffect(() => {
    backgroundColourSettings();
  }, []);

  return (
    <div
      key={props.options.key}
      className="flex-shrink-0 items-center transition-colors duration-500 justify-center max-w-none md:w-44 lg:w-auto xl:w-72 sm:w-full min-w-min py-4 bg-gray-50 dark:bg-dark-gray"
    >
      <div
        class={
          "flow-root transition-colors duration-500 text-center shadow-lg rounded-md p-4 relative overflow-hidden" +
          colourBG
        }
      >
        <div className="sm:min-w-0">
          <p class={"transition-colors duration-500 text-base font-medium mb-2" + textColour}>
            {data.title}
          </p>
          {/* <p class="text-5xl transition-colors duration-500 text-gray-600 dark:text-gray-200">
            <CountUp end={data.count} />
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
