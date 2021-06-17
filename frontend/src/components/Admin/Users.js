import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsers } from "../../api";
import { getAllUsers, setAllUsers } from "../../actions";
import * as dayjs from "dayjs";
import { UserAddIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

  let getData = async () => {
    let resultData = await GetAllUsers();
    dispatch(setAllUsers(resultData));
  };

  useEffect(() => {
    if (authenticated) getData();
  }, [authenticated]);

  return (
    <div>
      <div className="flex flex-row-reverse">
        <Link to="/register-user" exact>
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          
        >
          Add New User
          <span className="left-0 inset-y-0 flex items-center pl-2">
            <UserAddIcon className="h-5 w-5 text-white-500" />
          </span>
        </button>
        </Link>
      </div>
      <div className="flex flex-col mt-5">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 dark:border-dark-gray-darkest sm:rounded-lg dark:bg-dark-gray-light">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-dark-gray-lighter">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Joined Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3 max-w-max">
                      <span className="sr-only">View more</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-dark-gray-dark">
                  {allUsers?.users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                          {user.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                        {dayjs(user.date).format("D MMM YYYY, h:HH:ss A")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          if (user.role === "master") {
                            return (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800 dark:bg-red-300 dark:text-red-900">
                                Master
                              </span>
                            );
                          } else if (user.role === "admin")
                            return (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-300 dark:text-purple-900">
                                Admin
                              </span>
                            );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400"
                        >
                          View more
                        </a>
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
  );
};

export default Users;
