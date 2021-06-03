import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/`,
});

const ConfessionForm = () => {

  const [userInput, setUserInput] = useState({
    enteredConfession: "",
  });

  const clearInputs = () => {
    setUserInput(() => {
      return { enteredConfession: "" };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = userInput.enteredConfession;
    let confessionJSON = { text: data };
    let res = await api.post('/confessions', confessionJSON)
    console.log("sent confession to API")
    console.log(res)
    clearInputs();
  };

  // const createConfession = async () => {
  //   let res = await api.post("/confessions", { text: "Test" });
  //   console.log("sent confession to API");
  // };

  const confessionChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredConfession: event.target.value };
    });
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <article className="prose dark:prose-dark">
                <h2>Compose New Confession</h2>
                <p>
                  Have an interesting story to share? Write it all down here!
                  Your post will be anonymous.
                </p>
                <h4>Some important notes:</h4>
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
                    All submissions will be moderated before they are publicly
                    viewable.
                  </li>
                </ul>
              </article>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-gray-50 dark:bg-dark-gray-light space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="Confession"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Write Your Confession
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="confession"
                        name="confession"
                        rows={10}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-dark-gray-darkest dark:text-gray-100 rounded-md"
                        placeholder="Your wonderful story goes in here."
                        value={userInput.enteredConfession}
                        onChange={confessionChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <p className="text-gray-500 dark:text-gray-100">
                        I have read the important notes and agree to post
                        content that will not be offensive, hurtful and
                        insensitive.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-100 dark:bg-dark-gray-lighter text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfessionForm;
