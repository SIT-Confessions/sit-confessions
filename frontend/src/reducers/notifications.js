const initialState = {
  notifications: [],
  post: null,
  error: {},
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETNOTIFICATIONS":
      return state;
    case "ADDNOTIFICATION":
      return { ...state, notifications: [ ...state.notifications, action.payload ] };
    case "DELETENOTIFICATION":
      return { ...state, notifications: [ ...state.notifications, action.payload ] };
    default:
      return state;
  }
};

export default notificationsReducer;
