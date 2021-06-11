import React, { useState, useEffect } from "react";
import ConfessionCardFeed from "./Confessions/ConfessionCardFeed";
import { GetApprovedConfessions } from "../api";
import { viewApprovedConfessions, setApprovedConfessions } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

const svgVariants = {
  initial: {},
  visible: {},
};

const pathVariants = {
  initial: {
    opacity: 1,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Home = () => {
  const confessions = useSelector((state) => state.approvedConfessions);
  const dispatch = useDispatch();

  useEffect(() => {
    let getData = async () => {
      let resultData = await GetApprovedConfessions();
      dispatch(setApprovedConfessions(resultData));
    };
    getData();
  }, []);

  return (
    <motion.div
      className="px-4 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-5">
        Latest Confessions
      </h1>
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      <ConfessionCardFeed confessions={confessions} />
    </motion.div>
  );
};

export default Home;
