import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfessionDetailsModal from "./ConfessionDetailsModal";
import ConfessionStatusCounter from "./ConfessionStatusCounter";
import { getAllConfessions } from "../../api";
import { setAllConfessions } from "../../actions";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import he from "he";
import { Redirect } from "react-router-dom";

const Index = () => {
  dayjs.extend(utc);
  const [open, setOpen] = useState(false);
  const [confessionDetails, setConfessionDetails] = useState({});
  const confessions = useSelector((state) => state.allConfessions);
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => {
    if (state.auth.isAuthenticated) return state.auth.user;
    return {
      _id: "",
      name: "",
      email: "",
      role: "",
      date: "",
      __v: 0,
      lastLogin: "",
    };
  });
  const dispatch = useDispatch();

  let getData = async (authenticated) => {
    try {
      let result = await getAllConfessions();
      dispatch(setAllConfessions(result.data));
    } catch (error) {
      if (error.response) console.log(error.response);
      return <Redirect push to="/post" />;
    }
  };

  useEffect(() => {
    if (authenticated) {
      getData();
    } else {
      <Redirect push to="/login" />;
    }
  }, []);

  const SetDetailsOnModal = (data) => {
    setConfessionDetails((prevState) => {
      return data;
    });
    setOpen(true);
  };

  const closeDescriptionModal = () => {
    setOpen(false);
  };

  const stat = confessions?.posts?.postStats;
  return confessions.set ? (
    <div className="px-4 sm:px-0">
      <ConfessionDetailsModal
        isOpen={open}
        data={confessionDetails}
        closeModal={closeDescriptionModal}
      />
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Welcome back, {user.name}!
        </h1>
        <p className="text-md font-semibold text-gray-500 dark:text-gray-400">
          Last Login: {dayjs(Date(user.lastLogin)).format("D MMM YYYY, h:mm A")}
        </p>
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <ConfessionStatusCounter
          options={{ key: 1, colour: "yellow" }}
          data={{
            title: "Pending Action",
            value: stat?.pending ?? 0,
            count: 100,
          }}
        />
        <ConfessionStatusCounter
          options={{ key: 2, colour: "red" }}
          data={{
            title: "Confessions Rejected",
            value: stat?.rejected ?? 0,
            count: 69,
          }}
        />
        <ConfessionStatusCounter
          options={{ key: 3, colour: "pink" }}
          data={{
            title: "Confessions Queued",
            value: stat?.queued ?? 0,
            count: 45,
          }}
        />
        <ConfessionStatusCounter
          options={{ key: 4, colour: "blue" }}
          data={{
            title: "Confessions Posted",
            value: stat?.posted ?? 0,
            count: 100,
          }}
        />
      </div>
      <div className="mt-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="transition-colors duration-500 shadow overflow-hidden border-b border-red-200 dark:border-dark-gray-darkest sm:rounded-lg dark:bg-dark-gray-light">
                <table className="min-w-full divide-y transition-colors duration-500 divide-gray-200 dark:divide-gray-800">
                  <thead className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-lighter">
                    <tr className="">
                      <th
                        scope="col"
                        className="transition-colors duration-500 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Confession ID
                      </th>
                      <th
                        scope="col"
                        className="transition-colors duration-500 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Confession Preview
                      </th>
                      <th
                        scope="col"
                        className="transition-colors duration-500 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Submitted
                      </th>
                      <th
                        scope="col"
                        className="transition-colors duration-500 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3 max-w-max">
                        <span className="sr-only">View more</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="transition-colors duration-500 bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-dark-gray-dark">
                    {confessions?.posts.confessions.map((confession) => (
                      <tr key={confession._id}>
                        <td className="transition-colors duration-500 px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                          #{confession._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="transition-colors duration-500 text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                            {he.decode(confession.text)}
                          </p>
                        </td>
                        <td className="transition-colors duration-500 px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                          {dayjs(confession.createdAt).format(
                            "D MMM YYYY, h:mm:ss A"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            if (confession.status === "APPROVED") {
                              if (confession.isPostedToFB) {
                                return (
                                  <>
                                    <span className="transition-colors duration-500 px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                      Approved
                                    </span>
                                    <span className="transition-colors duration-500 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-300 dark:text-blue-900">
                                      Posted
                                    </span>
                                  </>
                                );
                              } else if (confession.isQueued) {
                                return (
                                  <>
                                    <span className="transition-colors duration-500 px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                      Approved
                                    </span>
                                    <span className="transition-colors duration-500 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800 dark:bg-pink-300 dark:text-pink-900">
                                      Queued
                                    </span>
                                  </>
                                );
                              } else {
                                return (
                                  <span className="transition-colors duration-500 px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                    Approved
                                  </span>
                                );
                              }
                            } else if (confession.status === "PENDING")
                              return (
                                <span className="transition-colors duration-500 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900">
                                  Pending Action
                                </span>
                              );
                            else if (confession.status === "REJECTED")
                              return (
                                <span className="transition-colors duration-500 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-300 dark:text-red-900">
                                  Rejected
                                </span>
                              );
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="transition-colors duration-500 text-violet-600 hover:text-violet-900 dark:text-violet-500 dark:hover:text-violet-400 font-medium focus:outline-none"
                            onClick={() => SetDetailsOnModal(confession)}
                          >
                            View more
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-max w-full text-center pb-4">
        <p className="transition-colors duration-500 font-bold text-xl text-gray-500 dark:text-gray-400">
          Loading Content...
        </p>
      </div>
      <div>
        <svg
          class="animate-spin -ml-1 mr-3 h-24 w-24 text-gray-800 dark:text-gray-100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Index;
