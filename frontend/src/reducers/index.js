import { combineReducers } from "redux";
import approvedConfessionsReducer from './approvedConfessions';

const baseReducer = combineReducers({
    approvedConfessions : approvedConfessionsReducer
})

export default baseReducer;
