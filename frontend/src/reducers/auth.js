import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
