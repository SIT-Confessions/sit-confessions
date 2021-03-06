import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const Login = ({ login, isAuthenticated }) => {
  const [serverMessages, setServerMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLoginFunc = async () => {
    const result = await login(formData);
    setServerMessages(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginFunc();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-dark-gray">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-24"
            src="/SITC-Rounded.png"
            alt="SIT Confessions"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold transition-colors duration-500 text-gray-900 dark:text-gray-100">
            Welcome to SIT Confessions
          </h2>
          <div className="mt-4">
            {serverMessages?.map((message) => (
              <div className="flex items-center py-1">
                <div className="bg-red-200 text-red-700 rounded-full p-1 fill-current">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm ml-3 text-red-500 dark:text-red-400">
                  {message.msg}
                </span>
              </div>
            ))}
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none transition-colors duration-500 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                placeholder="Email address"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none transition-colors duration-500 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              <button
                type="button"
                className="z-10 absolute inset-y-0 right-0 flex items-center mx-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5"></EyeOffIcon>
                ) : (
                  <EyeIcon className="h-5 w-5"></EyeIcon>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm transition-colors duration-500 text-gray-900 dark:text-gray-100"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-500 dark:hover:text-violet-400"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
