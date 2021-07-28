import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import SecurityForm from "./SecurityForm";
import { Redirect } from "react-router-dom";

const ProfileIcon = () => {
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

const AccountSettings = () => {
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
                    "hover:text-gray-800 hover:bg-gray-200 transition-colors duration-500 flex items-center p-2 my-6 focus:outline-none dark:hover:text-white dark:hover:bg-gray-600 rounded-lg min-w-full " +
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

export default AccountSettings;
