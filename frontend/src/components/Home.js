import React from "react";
import ConfessionsFeed from "./Confessions/ConfessionsFeed";
import { motion } from "framer-motion";

const svgVariants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
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
  return (
    <motion.div
      className="px-4 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold transition-colors duration-500 text-gray-800 dark:text-gray-100 mb-5">
        Latest Confessions
      </h1>
      <ConfessionsFeed />
    </motion.div>
  );
};

export default Home;
