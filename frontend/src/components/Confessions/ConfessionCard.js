import React from "react";
import * as dayjs from "dayjs";
import he from "he";
import { Link } from "react-router-dom";

let RelativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(RelativeTime);

const ConfessionCard = (props) => {
  let itemData = props.data;
  let relativeTimeStamp = dayjs(itemData.postedToFBAt).fromNow();

  return (
    <div className="flex-shrink-0 items-center justify-center transition-colors duration-500 bg-gray-50 max-w-full sm:w-full min-w-min dark:bg-dark-gray">
      <div class="flow-root shadow-lg rounded-xl p-4 transition-colors duration-500 bg-white relative overflow-hidden dark:bg-dark-gray-lighter">
        <div className="sm:min-w-0">
          <Link
            key={itemData._id}
            to={"/confession/" + itemData._id}
            class="transition-colors duration-500 text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-500 text-xl font-medium"
          >
            #{itemData._id}
          </Link>
          <p class="transition-colors duration-500 text-gray-600 dark:text-gray-200 text-md whitespace-pre-line font-medium mt-4">
            {he.decode(itemData.text)}
          </p>
          <div className="flex mt-6 justify-between">
            <a
              href={itemData.fbURL}
              target="_blank"
              className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-500"
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
