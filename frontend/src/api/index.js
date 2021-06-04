import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/types";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const GetApprovedConfessions = async () => {
  let res = await API.get("/confessions/approved")
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};

// Auth
// export const login = (formData) => API.post("/auth", formData);
export const login = (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  return API.post("/auth", body, config);
};
