import React, { useState, useEffect } from "react";
import ConfessionsFeed from "./Confessions/ConfessionsFeed";
import { GetApprovedConfessions } from "../api";
import { viewApprovedConfessions, setApprovedConfessions } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

const svgVariants = {
  initial: { opacity: 0},
  visible: { opacity: 1},
};

const pathVariants = {
  initial: {
    opacity: 1,
    pathLength: 0,
    pathOffset: 1,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 2,
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

  const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" }

  return (
    <motion.div
      className="px-4 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold transition-colors duration-500 text-gray-800 dark:text-gray-100 mb-5">
        Latest Confessions
      </h1>
      <ConfessionsFeed confessions={confessions} />
    </motion.div>
  );
};

export default Home;
