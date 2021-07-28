import React, { useEffect, useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import CountUp from "react-countup";

const SummaryCard = (props) => {
  const colour = props.options.colour;
  const data = props.data;
  const [colourBG, setColourBG] = useState("");
  const [textColour, setTextColour] = useState("");

  const backgroundColourSettings = () => {
    switch (colour) {
      case "yellow":
        setColourBG(" bg-yellow-400 dark:bg-yellow-500");
        setTextColour(" text-yellow-700 dark:text-yellow-800");
        break;
      case "green":
        setColourBG(" bg-green-400 dark:bg-green-500");
        setTextColour(" text-green-700 dark:text-green-800");
        break;
      case "red":
        setColourBG(" bg-red-400 dark:bg-red-500");
        setTextColour(" text-red-700 dark:text-red-800");
        break;
      case "blue":
        setColourBG(" bg-blue-400 dark:bg-blue-500");
        setTextColour(" text-blue-700 dark:text-blue-800");
        break;
      case "pink":
        setColourBG(" bg-pink-400 dark:bg-pink-500");
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
      className="flex-shrink-0 items-center transition-colors duration-500 justify-center max-w-none w-full md:w-49percent lg:w-24percent min-w-min py-4 bg-gray-50 dark:bg-dark-gray"
    >
      <div class="flex transition-colors duration-500 shadow-lg items-center rounded-md px-4 py-2 relative overflow-hidden bg-white dark:bg-dark-gray-lighter">
        <span class={"flex-none rounded-full h-3 w-3 mr-4" + colourBG}></span>
        <div className="flex-grow sm:min-w-0">
          <p class="transition-colors duration-500 text-sm font-semibold text-gray-700 dark:text-gray-100">
            {data.title}
          </p>
          <p class="transition-colors duration-500 text-base text-gray-700 dark:text-gray-100">
            {data.value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
