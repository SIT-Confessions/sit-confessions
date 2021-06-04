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
      <motion.svg
        variants={svgVariants}
        initial="initial"
        animate="visible"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <motion.path
          variants={pathVariants}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>
      <ConfessionCardFeed confessions={confessions} />
    </motion.div>
  );
};

export default Home;
