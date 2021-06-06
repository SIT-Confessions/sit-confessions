import React from "react";

const Toast = (props) => {

    
  return (
    <div className="flex-shrink-0 items-center bg-gray-50 items-start sm:w-full max-w-max dark:bg-dark-gray fixed">
      <div class="flow-root shadow-lg border border-opacity-50 rounded-xl p-4 dark:border-gray-600 bg-white relative overflow-hidden dark:bg-dark-gray-lightest flex-row grid grid-flow-col">
        <div className="max-w-min mr-2 flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="sm:min-w-0 max-w-full flex-grow flex-wrap">
          <div className="flex">
            <p class="text-gray-800 dark:text-gray-50 text-sm font-medium mb-2">
              Successfully Submitted!
            </p>
          </div>

          <p class="text-gray-600 dark:text-gray-200 text-sm">
            Your confession has been submitted for approval!
          </p>
        </div>
        <div className="flex-none max-w-min">
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
