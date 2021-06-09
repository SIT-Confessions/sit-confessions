import React, { Fragment } from "react";
import * as dayjs from "dayjs";

let RelativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(RelativeTime);

const ConfessionCard = (props) => {
  let itemData = props.data;
  let relativeTimeStamp = dayjs(itemData.createdAt).fromNow();

  return (
    <div className="flex-shrink-0 items-center justify-center bg-gray-50 max-w-2xl sm:w-full min-w-min py-4 dark:bg-dark-gray">
      <div class="flow-root shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden dark:bg-dark-gray-lighter">
        <div className="sm:min-w-0">
          <p class="text-gray-800 dark:text-gray-50 text-lg font-medium mb-2">
            #{itemData._id}
          </p>
          <p class="text-gray-600 dark:text-gray-200 text-sm whitespace-pre-line">
            {itemData.text}
          </p>
          <div className="flex mt-4 justify-between">
            <a
              href={itemData.fbURL}
              target="_blank"
              className="text-sm text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              View on Facebook
            </a>
            <div className="text-gray-400 dark:text-gray-400 text-sm">
              {relativeTimeStamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfessionCardFeed = (props) => {
  let confessionsData = props.confessions.posts;
  return (
    <>
      {confessionsData?.map((item, itemIDx) => (
        <Fragment key={itemIDx}>
          <ConfessionCard data={item} />
        </Fragment>
      ))}
    </>
  );
};

export default ConfessionCardFeed;
