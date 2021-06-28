import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../../actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Redirect } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
});

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    password2: "",
  });

  const nameChangeHandler = (event) => {
    setRegisterFormData((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setRegisterFormData((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const roleChangeHandler = (event) => {
    setRegisterFormData((prevState) => {
      return { ...prevState, role: event.target.value };
    });
  };

  const passwordChangeHandler = (event) => {
    setRegisterFormData((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const confirmPasswordChangeHandler = (event) => {
    setRegisterFormData((prevState) => {
      return { ...prevState, password2: event.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let data = registerFormData;
    let res = await api.post("/users", data);
    clearInputs();
    ShowNotification({
      id: uuidv4(),
      title: "Successfully Submitted!",
      message: data.name + " has been successfully registered!",
      type: "success",
    });
  };

  const clearInputs = () => {
    setRegisterFormData(() => {
      return {
        name: "",
        email: "",
        role: "",
        password: "",
        password2: "",
      };
    });
  };

  const ShowNotification = (data) => {
    dispatch(addNotification(data));
  };

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto rounded-xl shadow-lg md:w-1/2">
        <div className="border-gray-200">
          <form onSubmit={handleRegister}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-6 py-6">
                <h2 className="transition-colors duration-500 text-2xl font-bold text-gray-800 dark:text-gray-50">
                  Register User
                </h2>
                <p className="transition-colors duration-500 text-sm text-gray-600 dark:text-gray-300">
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
                      className="transition-colors duration-500 focus:ring-violet-500 focus:border-violet-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      placeholder="Karen"
                      value={registerFormData.name}
                      onChange={nameChangeHandler}
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
                      className="transition-colors duration-500 focus:ring-violet-500 focus:border-violet-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      placeholder="karen@wheresyourbadge.com"
                      value={registerFormData.email}
                      onChange={emailChangeHandler}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="transition-colors duration-500 focus:ring-violet-500 focus:border-violet-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      value={registerFormData.password}
                      onChange={passwordChangeHandler}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="transition-colors duration-500 focus:ring-violet-500 focus:border-violet-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      value={registerFormData.password2}
                      onChange={confirmPasswordChangeHandler}
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
                    className="transition-colors duration-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                    value={registerFormData.role}
                    onChange={roleChangeHandler}
                  >
                    <option value="" disabled selected>
                      Select Role
                    </option>
                    <option value="master">Master</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="px-4 py-3 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light text-center sm:px-6 mb-3">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 w-full"
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
