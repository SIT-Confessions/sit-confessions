import React, { useState, useEffect } from "react";
import { MenuIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const [isShown, setIsShown] = useState("hidden");
  const toggleHamburger = () => {
    let nextState = "";
    setIsShown((prevState) => {
      if (prevState !== "hidden") nextState = "hidden";
      return nextState;
    });
  };

  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a
            class="text-white no-underline hover:text-white hover:no-underline"
            href="#"
          >
            <span class="text-2xl pl-2">
              <i class="em em-grinning"></i> SIT Confessions
            </span>
          </a>
        </div>

        <div class="block lg:hidden">
          <button
            id="nav-toggle"
            class="flex items-center rounded hover:text-white hover:border-white"
            onClick={toggleHamburger}
          >
              <span className="inset-y-0 text-white-500 flex items-center pl-3">
                  <MenuIcon className="h-8 w-6 text-white"/>
                </span>
          </button>
        </div>

        <div
          //   class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
          className={
            "w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0 " +
            isShown
          }
          id="nav-content"
        >
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <li class="mr-3">
              <a
                class="inline-block py-2 px-4 text-white no-underline"
                href="#"
              >
                Active
              </a>
            </li>
            <li class="mr-3">
              <a
                class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="#"
              >
                link
              </a>
            </li>
            <li class="mr-3">
              <a
                class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="#"
              >
                link
              </a>
            </li>
            <li class="mr-3">
              <a
                class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="#"
              >
                link
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
