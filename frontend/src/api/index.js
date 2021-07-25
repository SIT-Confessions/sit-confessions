import API from "axios";
import setAuthToken from "../utils/setAuthToken";

API.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT_URL;

export const getApprovedConfessions = (pageNumber) => {
  return API.get("/confessions/approved/" + pageNumber);
}

export const getAllConfessions = () => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  return API.get("/confessions");
};

export const getApprovedConfession = (id) => {
  return API.get("confessions/" + id);
};

export const approveConfession = async (id) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const result = await API.put("/confessions/approve/" + id);
  return result;
};

export const rejectConfession = async (id, reasons) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const result = await API.put("/confessions/reject/" + id, reasons);
  return result;
};

export const changePassword = async (data) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const result = await API.put("/users/password", data);
  return result;
};

export const login = (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify(formData);
  return API.post("/auth", body, config);
};

export const logout = () => {
  const config = {
    withCredentials: true,
  };

  return API.post("/auth/logout", config);
};

export const getUser = () => {
  return API.get("/auth");
};

export const retrieveAllUsers = async () => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  let res = await API.get("/auth/users")
    .then((res) => res)
    .catch((err) => console.log("from api All Users call", err));
  return res.data;
};

export const updateUserProfile = (data) => {
  return API.put("/users", data);
}