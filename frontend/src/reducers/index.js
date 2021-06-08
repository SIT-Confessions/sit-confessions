import { combineReducers } from "redux";
import auth from "./auth";
import { approvedConfessionsReducer, allConfessionsReducer } from "./confessions";
import notifications from "./notifications";

const baseReducer = combineReducers({
  approvedConfessions: approvedConfessionsReducer,
  allConfessions: allConfessionsReducer,
  auth,
  notifications,
});

export default baseReducer;
