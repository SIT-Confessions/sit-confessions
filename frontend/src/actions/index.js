export const viewApprovedConfessions = () => {
  return {
    type: "GETAPPROVEDCONFESSIONS",
  };
};

export const setApprovedConfessions = (data) => {
  return {
    type: "SETAPPROVEDCONFESSIONS",
    payload: data,
  };
};

export const getAllConfessions = () => {
  return {
    type: "GETALLCONFESSIONS",
  };
};

export const setAllConfessions = (data) => {
  return {
    type: "SETALLCONFESSIONS",
    payload: data,
  };
};

export const getNotifications = () => {
  return {
    type: "GETNOTIFICATIONS",
  };
};

export const addNotification = (data) => {
  return {
    type: "ADDNOTIFICATION",
    payload: data,
  };
};

export const deleteNotification = (data) => {
  return {
    type: "DELETENOTIFICATION",
    payload: data,
  };
};

export const getThemePreference = () => {
  return {
    type: "GETTHEMEPREFERENCE",
  };
};

export const setThemePreference = (data) => {
  return {
    type: "SETTHEMEPREFERENCE",
    payload: data,
  };
};

export const getAllUsers = () => {
  return {
    type: "GETALLUSERS",
  };
};

export const setAllUsers = (data) => {
  return {
    type: "SETALLUSERS",
    payload: data,
  };
};
