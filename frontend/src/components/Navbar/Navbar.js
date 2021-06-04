import React, { useState, useEffect, Fragment } from "react";
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

const Navbar = ({
  toggleDarkMode,
  isDark,
  auth: { isAuthenticated },
  logout,
}) => {
  const [isShown, setIsShown] = useState("hidden");
  const toggleHamburger = () => {
    let nextState = "";
    setIsShown((prevState) => {
      if (prevState !== "hidden") nextState = "hidden";
      return nextState;
    });
  };

  const styles = {
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
    activeStyle:
      "bg-gray-900 hover:bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium",
  };

  const links = [
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/",
      name: "Home",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/dashboard",
      name: "Dashboard",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/post-confession",
      name: "Post Confession",
    },
    {
      className: styles.className,
      activeStyle: styles.activeStyle,
      to: "/login",
      name: "Login",
    },
  ];

  useEffect(() => {
    console.log("Work In Progress Moon Icon");
  });

  if (isAuthenticated) {
    links.filter((link) => link.name !== "Login");
  }
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
                          exact
                          className={link.className}
                          activeClassName={link.activeStyle}
                          to={link.to}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                      {isAuthenticated && (
                        <a
                          className={styles.className}
                          href="#"
                          onClick={logout}
                        >
                          Logout
                        </a>
                      )}
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
                      ) : (
                        <MoonIconSolid className="h-6 w-6" aria-hidden="true" />
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
  props: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
