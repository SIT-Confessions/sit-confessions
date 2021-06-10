let initialState = false;

const darkPreferred = localStorage.getItem('darkPreferred');

if (!(darkPreferred === null || darkPreferred === undefined || darkPreferred.length === 0)) {
    //Initial Dark mode setting for existing users.
    if (parseInt(darkPreferred) === 1) {
        initialState = true;
    }
}


const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETTHEMEPREFERENCE":
      return state;
    case "SETTHEMEPREFERENCE":
      return action.payload;
    default:
      return state;
  }
};

export default darkModeReducer;
