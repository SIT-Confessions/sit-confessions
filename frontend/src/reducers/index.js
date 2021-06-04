import { combineReducers } from "redux";
import auth from "./auth";
import approvedConfessionsReducer from "./approvedConfessions";

const baseReducer = combineReducers({
  approvedConfessions: approvedConfessionsReducer,
  auth,
});

export default baseReducer;
