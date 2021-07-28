import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../../../api";
import { addNotification } from "../../../actions";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Please enter an email address"),
});

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    //Submit to records.
    const result = await updateUserProfile(data);
    dispatch(
      addNotification({
        id: uuidv4(),
        title: "It's a success!",
        message: result.data.msg,
        type: "success",
      })
    );
  };

  return user !== null ? (
    <div className="md:col-span-9 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto rounded-xl shadow-lg">
      <div className="border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-6 py-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                Profile Information
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                View and edit your profile
              </p>
            </div>
            <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
            <div className="px-6 py-6 space-y-6 sm:p-6">
              <div>
                <label
                  htmlFor="joinDate"
                  className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                >
                  Joined Date
                </label>
                <div className="mt-1">
                  <p className="text-sm transition-colors duration-500 text-gray-500 dark:text-gray-400">
                    {dayjs(user.date).format("D MMMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-2 sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={user.name}
                      type="text"
                      name="name"
                      id="name"
                      className="transition-colors duration-500 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                      placeholder="Karen"
                      {...register("name")}
                    />
                  </div>
                  {errors.name ? (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Your name may appear when you access the Dashboard and to
                      identify you when you perform an action on a confession.
                    </p>
                  )}
                </div>
              </div>

              <div>
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
                    placeholder="karen@example.com"
                    defaultValue={user.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm transition-colors duration-500 text-red-500 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 transition-colors duration-500 bg-gray-100 dark:bg-dark-gray-lighter text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="md:col-span-9 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto sm:rounded-xl shadow-lg">
      <div className="border-gray-200 animate-pulse">
        <div className="sm:rounded-md sm:overflow-hidden">
          <div className="px-4 sm:p-6">
            <div className="w-2/5 h-10 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
          <div className="px-4 py-5 space-y-6 sm:p-6">
            <div>
              <div className="w-1/12 h-4 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="mt-1">
                <div className="w-2/12 h-9 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-2 sm:col-span-4">
                <div className="w-1/12 h-4 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="mt-1">
                  <div className="w-12/12 h-9 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="mt-2 w-7/12 h-4 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            <div>
              <div className="w-1/12 h-4 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="mt-1">
                <div className="w-12/12 h-9 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 transition-colors duration-500 text-right sm:px-6">
            <div className="w-24 h-8 transition-colors duration-500 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
