import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addNotification } from "../../actions";
import { v4 as uuidv4 } from "uuid";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_URL,
});

const ConfessionForm = () => {
  const [textIsValid, setTextIsValid] = useState(true);
  const [checkboxValid, setCheckboxValid] = useState(true);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);

  const [userInput, setUserInput] = useState({
    enteredConfession: "",
    checkboxIsChecked: false,
  });

  const checkForm = () => {
    if (
      userInput.enteredConfession === "" ||
      userInput.checkboxIsChecked === false
    ) {
      if (userInput.enteredConfession === "") {
        setTextIsValid(() => {
          return false;
        });
      }
      if (userInput.checkboxIsChecked === false) {
        setCheckboxValid(() => {
          return false;
        });
      }
      return false;
    }
    return true;
  };

  const clearInputs = () => {
    setUserInput(() => {
      return { enteredConfession: "", checkboxIsChecked: false };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkForm()) {
      // Passed validation
      let data = userInput.enteredConfession;
      let confessionJSON = { text: data };
      let res = await api.post("/confessions", confessionJSON);
      clearInputs();
      ShowNotification({
        id: uuidv4(),
        title: "Successfully Submitted!",
        message: "Your confession has been submitted for approval!",
        type: "success",
      });
    }
  };

  const ShowNotification = (data) => {
    dispatch(addNotification(data));
  };

  const confessionChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredConfession: event.target.value };
    });
  };

  const checkBoxChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, checkboxIsChecked: event.target.checked };
    });
    setCheckboxValid(() => {
      return event.target.checked;
    });
  };

  useEffect(() => {
    if (userInput.enteredConfession !== "") {
      setTextIsValid(() => {
        return true;
      });
    }

    textAreaRef.current.style.height = "300px";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = scrollHeight + "px";
  }, [textAreaRef, userInput]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="md:grid md:grid-cols-3 md:gap-6 px-4 sm:px-0">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h1 className="text-4xl font-bold transition-colors duration-500 text-gray-800 dark:text-gray-100 mb-5">
                Post Confession
              </h1>
              <article className="prose transition-colors duration-500 dark:prose-dark">
                <p>
                  Welcome to SIT Confessions! Do you have an interesting story
                  to share? We'd love to hear about it! Your post will remain
                  anonymous.
                </p>
                <h4 className="duration-500">Some important notes:</h4>
                <ul>
                  <li>
                    We are not affiliated with the Singapore Institute of
                    Technology in any way.
                  </li>
                  <li>
                    Please be socially responsible and do not post any sensitive
                    or hurtful content. No racist, vulgar, sexual or other
                    inappropriate content is allowed.
                  </li>
                  <li>
                    All submissions are subjected to moderation before they are
                    publicly viewable.
                  </li>
                </ul>
                <h4 className="duration-500">Helpful Links</h4>
              </article>
              <a
                className="transition-colors duration-500 text-violet-600 dark:text-violet-500 hover:text-violet-500 dark:hover:text-violet-400"
                href="https://www.singaporetech.edu.sg/life-at-sit/student-wellness#counselling"
              >
                SIT Counselling Service
              </a>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 rounded-3xl">
            <form onSubmit={handleSubmit}>
              <div className="shadow rounded-xl sm:overflow-hidden">
                <div className="px-4 py-5 rounded-t-xl transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="Confession"
                      className="block text-sm font-medium transition-colors duration-500 text-gray-700 dark:text-gray-300"
                    >
                      Write Your Confession
                    </label>
                    <div className="mt-1">
                      <textarea
                        ref={textAreaRef}
                        id="confession"
                        name="confession"
                        rows={15}
                        className="shadow-sm focus:ring-violet-500 focus:border-violet-500 mt-1 block w-full sm:text-sm transition-colors duration-500 border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100 rounded-md"
                        placeholder="Your wonderful story goes in here."
                        value={userInput.enteredConfession}
                        onChange={confessionChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="flex items-start pt-5 md:pt-0">
                    <div className="flex items-center h-5">
                      <label>
                        <input
                          id="agree"
                          name="agree"
                          type="checkbox"
                          className="focus:outline-none focus:ring-0 h-4 w-4 text-purple-600 border-gray-300 rounded"
                          checked={userInput.checkboxIsChecked}
                          onChange={checkBoxChangeHandler}
                        />
                        <span className="ml-3 text-sm transition-colors duration-500 text-gray-500 dark:text-gray-100">
                          I have read the important notes and agree to post
                          content that will not be offensive, hurtful and
                          insensitive.
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4 md:pt-0">
                    <ul>
                      {textIsValid ? null : (
                        <li class="flex items-center py-1">
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
                            You cannot submit an empty confession!
                          </span>
                        </li>
                      )}
                      {checkboxValid ? null : (
                        <li class="flex items-center py-1">
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
                            You need to agree that you will not post hurtful or
                            offensive content.
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-3 rounded-b-xl transition-colors duration-500 bg-gray-100 dark:bg-dark-gray-lighter text-center md:text-right sm:px-6">
                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ConfessionForm;
