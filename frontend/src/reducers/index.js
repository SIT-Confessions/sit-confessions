import { combineReducers } from "redux";
import auth from "./auth";
import approvedConfessionsReducer from "./approvedConfessions";
import notifications from "./notifications";

const baseReducer = combineReducers({
  approvedConfessions: approvedConfessionsReducer,
  auth,
  notifications,
});

export default baseReducer;
