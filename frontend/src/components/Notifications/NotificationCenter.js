import React from "react";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
import { deleteNotification } from "../../actions";
import { AnimatePresence } from "framer-motion";

const NotificationCenter = (props) => {
  let notifications = props.data;
  let dispatch = useDispatch();

  const delNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className="flex flex-col max-h-max fixed z-50 px-2 md:px-0 md:top-30 md:right-10">
      <AnimatePresence>
        {notifications.length > 0 &&
          notifications.map((item) => (
            <Toast
              key={item.id}
              data={item}
              onDelNotification={delNotification}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
