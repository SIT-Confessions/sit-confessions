import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { getThemePreference, setThemePreference } from "../../actions";
import { motion } from "framer-motion"; 
// import { style } from "../../../craco.config";

const navigation = [
  "Dashboard",
  "Team",
  "Projects",
  "Calendar",
  "Reports",
  "Post Confession",
];
const profile = ["Your Profile", "Settings", "Sign out"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const svgVariants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
};

const pathVariants = {
  initial: {
    opacity: 1,
    pathLength: 0,
    pathOffset: 1,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Navbar = ({ isDark, auth: { isAuthenticated }, logout }) => {
  const [isShown, setIsShown] = useState("hidden");
  const dispatch = useDispatch();

  const toggleHamburger = () => {
    let nextState = "";
    setIsShown((prevState) => {
      if (prevState !== "hidden") nextState = "hidden";
      return nextState;
    });
  };

  const toggleDarkMode = () => {
    if (!isDark) {
      localStorage.setItem("darkPreferred", 1);
    } else {
      localStorage.setItem("darkPreferred", 0);
    }
    dispatch(setThemePreference(!isDark));
  };

  const styles = {
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
    activeStyle:
      "bg-gray-900 hover:bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium",
  };

  const authLinks = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/dashboard",
      name: "Dashboard",
    },
    {
      className: styles.className,
      to: "#",
      name: "Logout",
      onClick: logout,
    },
  ];

  const guestLinks = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/",
      name: "Home",
    },

    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/post",
      name: "Post Confession",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/login",
      name: "Login",
    },
  ];

  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {links.map((link, linkIdx) => (
                        <NavLink
                          key={linkIdx}
                          exact
                          className={link.className}
                          activeClassName={link.activeStyle}
                          to={link.to}
                          onClick={link.onClick}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="ml-10 flex items-baseline space-x-4">
                    <button
                      onClick={toggleDarkMode}
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                    >
                      <span className="sr-only">Dark Mode Toggle</span>
                      {isDark === false ? (
                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                        // <motion.svg
                        //   xmlns="http://www.w3.org/2000/svg"
                        //   initial="initial"
                        //   animate="visible"
                        //   class="h-6 w-6"
                        //   fill="none"
                        //   viewBox="0 0 24 24"
                        //   stroke="currentColor"
                        // >
                        //   <motion.path
                        //     variants={pathVariants}
                        //     stroke-linecap="round"
                        //     stroke-linejoin="round"
                        //     stroke-width="2"
                        //     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        //   />
                        // </motion.svg>
                      ) : (
                        <MoonIconSolid className="h-6 w-6" aria-hidden="true" />
                      //   <motion.svg variants={svgVariants} initial="initial" animate="visible" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      //   <motion.path variants={pathVariants} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      // </motion.svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {links.map((link, linkIdx) => (
                  <NavLink
                    exact
                    className={link.className}
                    activeClassName={link.activeStyle}
                    to={link.to}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              {/* <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div> */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
