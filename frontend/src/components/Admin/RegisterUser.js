import React, { useState, useEffect } from "react";

const RegisterUser = () => {
    const [registerFormData, setRegisterFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
    })


  const handleRegister = (e) => {
    e.preventDefault();
    alert("To Do")
  };

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto rounded-xl shadow-lg md:w-1/2">
        {/* <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-800">
            Profile Information
          </h3>
        </div> */}
        <div className="border-gray-200">
          <form onSubmit={handleRegister}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-6 py-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                  Register User
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create an account for a new user
                </p>
              </div>
              <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div className="w-full lg:w-3/4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      placeholder="Karen"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    autoComplete="role"
                    className="transition-colors duration-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                  >
                    <option value="" disabled selected>Select Role</option>
                    <option value="master">Master</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover photo
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="px-4 py-3 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light text-center sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
