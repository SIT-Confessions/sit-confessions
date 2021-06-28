import React from "react";

const SingleConfession = () => {
  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light overflow-auto rounded-xl shadow-lg md:w-1/2">
        <div className="border-gray-200">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-6 py-6">
              <h2 className="transition-colors duration-500 text-2xl font-bold text-gray-800 dark:text-gray-50">
                Confession #56
              </h2>
              <p className="transition-colors duration-500 text-sm text-gray-500 dark:text-gray-400">
                Posted 21 Jun 2021, 10.34 PM
              </p>
            </div>
            <hr className="mx-6 transition-colors duration-500 dark:border-gray-700"></hr>
            <div className="px-4 py-5 space-y-6 sm:p-6">
              <p className="transition-colors duration-500 text-gray-600 dark:text-gray-200 text-md whitespace-pre-line font-medium">
                As someone who has degrees in CS and Engineering, let me compare
                the 2 for those deciding which degree to pursue: Why CS is better than
                Engineering: - Better prep (training, internships, networking)
                for software jobs, which are typically much better paid and more
                comfortable than traditional engineering jobs. This disparity is
                only going to widen. - More prestigious (recently anyway). Also,
                you get to surround yourself with smarter people, which, over 4
                years, makes a difference in your development. - Easier and more
                interesting curriculum (Sit in a chem eng year 4 lecture and
                you'll know what I mean) - More fun. I know this one is
                subjective but many CS students actually code for pleasure,
                often applying techniques they picked up in class. How many chem
                engineers calculate turbulent flow in their free time? COPY
                PASTA
              </p>
            </div>
            <div className="px-4 py-3 transition-colors duration-500 bg-gray-50 dark:bg-dark-gray-light text-center sm:px-6 mb-3">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 w-full"
              >
                View on Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleConfession;
