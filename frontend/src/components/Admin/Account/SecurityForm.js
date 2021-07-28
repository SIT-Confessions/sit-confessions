import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { changePassword } from "../../../api";
import { addNotification } from "../../../actions";
import { v4 as uuidv4 } from "uuid";

const SecurityForm = () => {
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    newpassword2: "",
  });

  const toggleOldPwdVisibility = () => {
    setShowOldPassword((prevState) => {
      return !prevState;
    });
  };

  const toggleNewPwdVisibility = () => {
    setShowNewPassword((prevState) => {
      return !prevState;
    });
  };

  const oldPasswordHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, oldpassword: event.target.value };
    });
  };

  const newPasswordHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, newpassword: event.target.value };
    });
  };

  const confirmNewPasswordHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, newpassword2: event.target.value };
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    console.log(formData);
    const result = await changePassword(formData);
    dispatch(
      addNotification({
        id: uuidv4(),
        title: "It's a success!",
        message: result.data.msg,
        type: "success",
      })
    );
  };

  return (
    <div className="md:col-span-9 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto rounded-xl shadow-lg">
      <div className="border-gray-200">
        <form onSubmit={handleSave}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-6 py-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                Security & Password
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage and change security settings like your password
              </p>
            </div>
            <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
            <div className="px-6 py-6 space-y-6 sm:p-6">
              <div className="lg:w-1/2">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                >
                  Old Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="currentPassword"
                    id="currentPassword"
                    className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                    value={formData.oldpassword}
                    onChange={oldPasswordHandler}
                  />
                  <button
                    type="button"
                    className="z-10 absolute inset-y-0 right-0 flex items-center mx-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                    onClick={toggleOldPwdVisibility}
                  >
                    {showOldPassword ? (
                      <EyeOffIcon className="h-5 w-5"></EyeOffIcon>
                    ) : (
                      <EyeIcon className="h-5 w-5"></EyeIcon>
                    )}
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                    value={formData.newpassword}
                    onChange={newPasswordHandler}
                  />
                  <button
                    type="button"
                    className="z-10 absolute inset-y-0 right-0 flex items-center mx-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                    onClick={toggleNewPwdVisibility}
                  >
                    {showNewPassword ? (
                      <EyeOffIcon className="h-5 w-5"></EyeOffIcon>
                    ) : (
                      <EyeIcon className="h-5 w-5"></EyeIcon>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2">
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                >
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                    value={formData.newpassword2}
                    onChange={confirmNewPasswordHandler}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 transition-colors duration-500 bg-gray-100 dark:bg-dark-gray-lighter text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityForm;
