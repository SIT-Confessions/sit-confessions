const initialState = {
  posts: [],
  post: null,
  error: {},
};

const approvedConfessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETAPPROVEDCONFESSIONS":
      return { ...state };
    case "SETAPPROVEDCONFESSIONS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default approvedConfessionsReducer;
