import { combineReducers } from "redux";
import auth from "./auth";
import { approvedConfessionsReducer, allConfessionsReducer } from "./confessions";
import notifications from "./notifications";
import darkPreferred from "./dark";

const baseReducer = combineReducers({
  approvedConfessions: approvedConfessionsReducer,
  allConfessions: allConfessionsReducer,
  auth,
  notifications,
  darkPreferred,
});

export default baseReducer;
