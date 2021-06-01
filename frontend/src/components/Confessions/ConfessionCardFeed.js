import React, { Fragment } from "react";

const ConfessionCard = (props) => {
    let itemData = props.data;

  return (
    <div className="flex-shrink-0 items-center justify-center bg-gray-50 max-w-2xl sm:w-full min-w-min py-4">
      <div class="flow-root shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden">
        <div className="sm:min-w-0">
          <p class="text-gray-800 text-lg font-medium mb-2">#3195</p>
          <p class="text-gray-600 text-sm">{itemData.text}</p>
          <div className="flex mt-4 justify-between">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              View on Facebook
            </a>
            <div className="text-gray-400 text-sm">14 May 2021, 7:44 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfessionCardFeed = (props) => {
  let confessionsData = props.confessions;
  console.log(confessionsData);

  return (
    <>
      {confessionsData.map((item, itemIDx) => (
        <Fragment key={itemIDx}>
          <ConfessionCard data={item} />
        </Fragment>
      ))}
    </>
  );
};

export default ConfessionCardFeed;
