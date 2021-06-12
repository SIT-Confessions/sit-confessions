import setAuthToken from "../utils/setAuthToken";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/types";
import * as api from "../api";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await api.getUser();

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.login(formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // errors.forEach((error) => console.error(error.msg));
      return errors;
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
  return [];
};

// Logout User
export const logout = () => async (dispatch) => dispatch({ type: LOGOUT });
