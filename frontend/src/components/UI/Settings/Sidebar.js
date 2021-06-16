import React from "react";

const Sidebar = () => {
  return (
    <div class="relative md:col-span-3 md:mr-6 bg-gray-100 rounded-xl dark:bg-dark-gray-light">
      <div class="flex flex-col sm:flex-row sm:justify-around">
        <div class="w-72 h-screen">
          <div class="flex items-center justify-start mx-6 mt-10">
            <span class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
              Account Settings
            </span>
          </div>
          <nav class="mt-10 px-6 ">
            <a
              class="hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
              href="#"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
              </svg>
              <span class="mx-4 text-lg font-normal">Profile</span>
              <span class="flex-grow text-right"></span>
            </a>
            <a
              class="hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-200 dark:bg-gray-600"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <span class="mx-4 text-lg font-normal">Security & Password</span>
              <span class="flex-grow text-right"></span>
            </a>
            <a
              class="hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
              href="#"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"></path>
              </svg>
              <span class="mx-4 text-lg font-normal">Commerce</span>
              <span class="flex-grow text-right">
                <button
                  type="button"
                  class="w-6 h-6 text-xs  rounded-full text-white bg-red-500"
                >
                  <span class="p-1">7</span>
                </button>
              </span>
            </a>
            <a
              class="hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
              href="#"
            >
              <svg
                width="20"
                height="20"
                class="m-auto"
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
              </svg>
              <span class="mx-4 text-lg font-normal">Navigation</span>
              <span class="flex-grow text-right"></span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
