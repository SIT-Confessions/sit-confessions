import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getApprovedConfession } from "../../api";
import * as dayjs from "dayjs";
import he from "he";
import { Helmet } from "react-helmet";

const SingleConfession = () => {
  const { id } = useParams();
  const [confessionData, setConfessionData] = useState({});
  const [informationIsSet, setInformationIsSet] = useState(0);

  const retrieveData = async () => {
    try {
      let result = await getApprovedConfession(id);
      if (result.status === 200) {
        setConfessionData(() => {
          return result.data;
        });
        setInformationIsSet(() => {
          return 1;
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setInformationIsSet(() => {
            return 2;
          });
        }
      }
      //return <Redirect push to="/post" />;
    }
  };

  const btnClick = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return informationIsSet === 1 ? (
    <div className="flex justify-center px-4 md:px-0">
      <div className="transition-colors duration-500 bg-white dark:bg-dark-gray-light overflow-auto rounded-xl shadow-md w-full md:w-2/3">
        <div>
          <div className="sm:rounded-md sm:overflow-hidden">
            <div className="px-6 py-6">
              <h2 className="transition-colors duration-500 text-2xl font-bold text-gray-800 dark:text-gray-50">
                Confession #{id}
              </h2>
              <p className="transition-colors duration-500 text-sm text-gray-500 dark:text-gray-400">
                Posted{" "}
                {dayjs(confessionData.postedToFBAt).format(
                  "D MMM YYYY, h:mm A"
                )}
              </p>
            </div>
            <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
            <div className="px-6 py-7 space-y-6">
              <p className="transition-colors duration-500 text-gray-700 dark:text-gray-200 text-md whitespace-pre-line font-medium">
                {he.decode(confessionData.text)}
              </p>
            </div>
            <div className="px-4 py-3 transition-colors duration-500 bg-white dark:bg-dark-gray-light text-center sm:px-6 mb-3">
              <button
                type="button"
                onClick={() => {
                  btnClick(confessionData.fbURL);
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 w-full"
              >
                View on Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : informationIsSet === 0 ? (
    <div className="flex justify-center px-4 md:px-0">
      <div className="transition-colors duration-500 bg-white dark:bg-dark-gray-light overflow-auto rounded-xl shadow-md w-full md:w-2/3">
        <div className="animate-pulse sm:rounded-md">
          <div className="px-6 py-6">
            <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded-md w-2/5 transition-colors duration-500"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-1/4 transition-colors duration-500 mt-2"></div>
          </div>
          <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
          <div className="px-6 py-7 space-y-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-full transition-colors duration-500"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-3/5 transition-colors duration-500"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-4/6 transition-colors duration-500"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-10/12 transition-colors duration-500"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-md w-1/2 transition-colors duration-500"></div>
          </div>
          <div className="px-4 py-3 transition-colors duration-500 bg-white dark:bg-dark-gray-light text-center sm:px-6 mb-3">
            <div className="h-9 bg-gray-300 dark:bg-gray-600 rounded-md w-full transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // <div className="min-h-full mt-20 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
    //   <p className="font-semibold text-3xl text-gray-700 dark:text-gray-200 transition-colors duration-500">
    //     Confession Not Found
    //   </p>
    // </div>

    <div className="flex justify-center px-4 md:px-0">
      <div className="h-80 transition-colors duration-500 bg-white dark:bg-dark-gray-light overflow-auto rounded-xl shadow-md w-full md:w-2/3">
        <div className="min-h-full flex justify-center items-center sm:rounded-md">
          <p className="font-semibold text-2xl text-gray-400 dark:text-gray-500 transition-colors duration-500">
            Confession Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleConfession;
