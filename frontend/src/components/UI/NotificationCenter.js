import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";
import { deleteNotification } from "../../actions";
import { motion, AnimatePresence } from "framer-motion";

const NotificationCenter = (props) => {
  let notifications = props.data;
  let dispatch = useDispatch();
  let test = useSelector((state) => state.notifications);
  console.log(test)

  const delNotification = (id) => {
    //const index = notifications.findIndex((e) => e.id === id);
    dispatch(deleteNotification(id));
  };

  return (
    // <>
    //   {notifications.length > 0 && (
    <div className="flex flex-col max-h-max fixed z-50 top-30 right-10">
      <AnimatePresence>
        {notifications.length > 0 &&
          notifications.map((item) => (
            <Toast key={item.id} data={item} onDelNotification={delNotification} />
          ))}
      </AnimatePresence>
    </div>
    //   )}
    // </>
  );
};

export default NotificationCenter;
