const initialState = {
    users: [],
    post: null,
    error: {},
    set: false,
  };
  
  export const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GETALLUSERS":
        return { ...state };
      case "SETALLUSERS":
        return { ...state, users: action.payload, set: true };
      default:
        return state;
    }
  };
