import React from "react";
import * as dayjs from "dayjs";
import he from "he";

let RelativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(RelativeTime);

const ConfessionCard = (props) => {
  let itemData = props.data;
  let relativeTimeStamp = dayjs(itemData.postedToFBAt).fromNow();

  return (
    <div className="flex-shrink-0 items-center justify-center transition-colors duration-500 bg-gray-50 max-w-full sm:w-full min-w-min py-4 dark:bg-dark-gray">
      <div class="flow-root shadow-lg rounded-2xl p-4 transition-colors duration-500 bg-white relative overflow-hidden dark:bg-dark-gray-lighter">
        <div className="sm:min-w-0">
          <p class="transition-colors duration-500 text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">
            #{itemData._id}
          </p>
          <p class="transition-colors duration-500 text-gray-600 dark:text-gray-200 text-md whitespace-pre-line font-medium">
            {he.decode(itemData.text)}
          </p>
          <div className="flex mt-6 justify-between">
            <a
              href={itemData.fbURL}
              target="_blank"
              className="text-sm text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              View on Facebook
            </a>
            <div className="transition-colors duration-500 text-gray-400 dark:text-gray-400 text-sm">
              {relativeTimeStamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionCard;