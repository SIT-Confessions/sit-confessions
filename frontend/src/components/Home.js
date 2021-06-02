import React, { useState, useEffect } from "react";
import ConfessionCardFeed from "./Confessions/ConfessionCardFeed";
import { GetApprovedConfessions } from "../api";
import { viewApprovedConfessions, setApprovedConfessions } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Home = () => {
  const confessions = useSelector((state) => state.approvedConfessions);
  const dispatch = useDispatch();

  //   const fetchApprovedConfessions = async () => {
  //       const res = await axios
  //   }

  const api = axios.create({
    baseURL: `http://localhost:5000/api/`,
  });

  const fetchApprovedConfessions = async () => {
    let res = await api
      .get("/confessions/approved")
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
    dispatch(setApprovedConfessions(res.data));
  };

  //   dispatch(setApprovedConfessions(result));

  useEffect(() => {
    fetchApprovedConfessions();
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
