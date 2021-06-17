import { combineReducers } from "redux";
import auth from "./auth";
import { approvedConfessionsReducer, allConfessionsReducer } from "./confessions";
import { allUsersReducer } from "./users";
import notifications from "./notifications";
import darkPreferred from "./dark";
import { LOGOUT } from "../constants/types";

const appReducer = combineReducers({
  approvedConfessions: approvedConfessionsReducer,
  allConfessions: allConfessionsReducer,
  allUsers: allUsersReducer,
  auth,
  notifications,
  darkPreferred,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
