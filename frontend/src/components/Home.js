import React, { useState, useEffect } from "react";
import ConfessionCardFeed from "./Confessions/ConfessionCardFeed";
import { GetApprovedConfessions } from "../api";
import { viewApprovedConfessions, setApprovedConfessions } from "../actions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const confessions = useSelector((state) => state.approvedConfessions);
  const dispatch = useDispatch();

  useEffect(() => {
    let getData = async () => {
        let resultData = await GetApprovedConfessions();
        dispatch(setApprovedConfessions(resultData))
    }
    getData();
  }, []);

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-5">
        Latest Confessions
      </h1>
      <ConfessionCardFeed confessions={confessions}/>
    </div>
  );
};

export default Home;
