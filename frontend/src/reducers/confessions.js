const initialState = {
  posts: [],
  post: null,
  error: {},
  set: false,
};

export const approvedConfessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETAPPROVEDCONFESSIONS":
      return { ...state };
    case "SETAPPROVEDCONFESSIONS":
      return { ...state, posts: action.payload, set: true };
    default:
      return state;
  }
};

export const allConfessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETALLCONFESSIONS":
      return { ...state };
    case "SETALLCONFESSIONS":
      return { ...state, posts: action.payload, set: true };
    default:
      return state;
  }
};
