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
  UserCircleIcon,
  StatusOnlineIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { MoonIcon as MoonIconSolid } from "@heroicons/react/solid";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { getThemePreference, setThemePreference } from "../../actions";
import { motion } from "framer-motion";
// import { style } from "../../../craco.config";

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

const Navbar = ({ isDark, auth: { isAuthenticated, user }, logout }) => {
  const [isShown, setIsShown] = useState("hidden");
  const [mobileMenuState, setMobileMenuState] = useState(false);
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
      "text-gray-200 hover:bg-purple-500 dark:hover:bg-violet-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex",
    activeStyle:
      "transition-colors duration-100 bg-purple-900 hover:bg-purple-900 dark:bg-violet-900 dark:hover:bg-violet-900 text-white px-3 py-2 rounded-md text-sm font-medium flex",
  };

  const adminLinks = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/",
      icon: <StatusOnlineIcon className="h-6 w-6" />,
      name: "Latest Confessions",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/post",
      icon: <PencilAltIcon className="h-6 w-6" />,
      name: "Post Confession",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/dashboard",
      icon: false,
      name: "Dashboard",
    },
    {
      className: styles.className,
      to: "#",
      icon: false,
      name: "Logout",
      onClick: logout,
    },
  ];

  const profile = [
    {
      to: "/account",
      name: "My Account",
    },
    {
      to: "/users",
      name: "Manage Users",
    },
  ];

  const guestLinks = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/",
      icon: <StatusOnlineIcon className="h-6 w-6" />,
      name: "Latest Confessions",
    },

    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/post",
      icon: <PencilAltIcon className="h-6 w-6" />,
      name: "Post Confession",
    },
  ];

  const authLinks = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/login",
      icon: false,
      name: "Login",
    }
  ];

  const links = isAuthenticated ? adminLinks : guestLinks;
  const authLink = isAuthenticated ? authLinks[1] : authLinks[0];
  let userLinks = [];
  if (isAuthenticated) {
    userLinks = user?.role === "master" ? profile : Array(1).fill(profile[0]);
  }

  return (
    <div>
      <Disclosure
        as="nav"
        className="transition-colors duration-500 bg-purple-700 dark:bg-violet-800"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link key="home" exact to="/">
                      <img
                        className="h-12 w-12"
                        src="/SITC-Minimalist-White.png"
                        alt="SIT Confessions"
                      />
                    </Link>
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
                          {link.icon && (
                            <span className="relative right-0 inset-y-0 pl-2">
                              {link.icon}
                            </span>
                          )}
                        </NavLink>
                      ))}
                      {/* <NavLink
                        key="authLink"
                        exact
                        className={authLink.className}
                        activeClassName={authLink.activeStyle}
                        to={authLink.to}
                        onClick={authLink.onClick}
                      >
                        {authLink.name}
                      </NavLink> */}
                    </div>
                  </div>
                  <div className="ml-0 md:ml-10 flex items-baseline space-x-4">
                    <button
                      onClick={toggleDarkMode}
                      className="transition-colors duration-500 bg-purple-700 dark:bg-violet-800 p-1 rounded-full text-gray-300 hover:text-white focus:outline-none"
                    >
                      <span className="sr-only">Dark Mode Toggle</span>
                      {isDark === false ? (
                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
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
                        <SunIcon className="h-6 w-6" aria-hidden="true" />
                        //   <motion.svg variants={svgVariants} initial="initial" animate="visible" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //   <motion.path variants={pathVariants} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        // </motion.svg>
                      )}
                    </button>
                  </div>
                  {/* Profile dropdown */}
                  {isAuthenticated && (
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs transition-colors duration-500 bg-purple-700 dark:bg-violet-800 text-gray-300 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <UserCircleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-dark-gray-lighter ring-0 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {userLinks.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link key={item.name} exact to={item.to}>
                                      <a
                                        href={item.to}
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 dark:bg-dark-gray"
                                            : "",
                                          "block px-4 py-2 text-sm text-gray-700 dark:bg-dark-gray-lighter dark:text-gray-200"
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  )}
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Link
                    key="compose-confession"
                    exact
                    to="/post"
                    className="transition-colors duration-500 bg-purple-700 dark:bg-violet-800 inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
                  >
                    <span className="sr-only">Compose Confession</span>
                    <PencilAltIcon className="h-6 w-6" />
                  </Link>
                  <Disclosure.Button
                    onBlur={(e) => {
                      //When mobile hamburger button loses focus
                    }}
                    className="transition-colors duration-500 bg-purple-700 dark:bg-violet-800 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-purple-700 dark:hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
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
                    {link.icon && (
                      <span className="relative right-0 inset-y-0 pl-2">
                        {link.icon}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
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
