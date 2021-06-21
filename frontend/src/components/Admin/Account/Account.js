import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import SecurityForm from "./SecurityForm";
import { Redirect } from "react-router-dom";

const ProfileIcon = () => {
  return (
    // <svg
    //   width="20"
    //   height="20"
    //   fill="currentColor"
    //   class="m-auto"
    //   viewBox="0 0 2048 1792"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
    // </svg>
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
        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
      />
    </svg>
  );
};

const KeyIcon = () => {
  return (
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
  );
};

const Account = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settingsBtnHandler = (index) => {
    setActiveIndex(() => {
      return index;
    });
  };

  const menuItems = [
    {
      key: 1,
      title: "Profile Information",
      icon: <ProfileIcon />,
    },
    {
      key: 1,
      title: "Security & Password",
      icon: <KeyIcon />,
    },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 px-4 md:px-0">
      <div class="relative transition-colors duration-500 md:col-span-3 md:mr-6 bg-gray-50 rounded-xl dark:bg-dark-gray h-auto">
        <div class="flex flex-col sm:flex-row sm:justify-around">
          <div class="">
            <div class="flex items-center justify-start mx-6 mt-10">
              <span class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                Account Settings
              </span>
            </div>
            <nav class="mt-10 px-6 ">
              {menuItems.map((item, itemIndex) => (
                <button
                  class={
                    "hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-6 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600 rounded-lg min-w-full " +
                    (itemIndex === activeIndex
                      ? "text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-600"
                      : "text-gray-600 dark:text-gray-400")
                  }
                  href="#"
                  onClick={() => settingsBtnHandler(itemIndex)}
                >
                  {item.icon}
                  <span class="mx-4 text-lg font-normal">{item.title}</span>
                  <span class="flex-grow text-right"></span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {activeIndex === 0 ? (
        <ProfileForm></ProfileForm>
      ) : activeIndex === 1 ? (
        <SecurityForm></SecurityForm>
      ) : null}
    </div>
  );
};

export default Account;
