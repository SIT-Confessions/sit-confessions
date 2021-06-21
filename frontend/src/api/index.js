import API from "axios";
import setAuthToken from "../utils/setAuthToken";

API.defaults.baseURL = "http://localhost:5000/api";

export const GetApprovedConfessions = async () => {
  let res = await API.get("/confessions/approved")
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};

export const GetAllConfessions = async (callback) => {
  //let resultData;
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  API.get("/confessions")
    .then((res) => { callback(res) })
    .catch((err) => { 
      if (err.response)
        callback(err.response); 
    });

};

export const ApproveConfession = async (id) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  // const res = await API.put("/confessions/approve/" + id)
  //   .then((res) => res)
  //   .catch((err) => err);
  // return res.msg;
  const result = await API.put("/confessions/approve/" + id);
  return result;
};

export const RejectConfession = async (id) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const result = await API.put("/confessions/reject/" + id);
  return result;
};

export const ChangePassword = async (data) => {
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
  };

  const body = JSON.stringify(formData);
  return API.post("/auth", body, config);
};

export const getUser = () => {
  return API.get("/auth");
};

export const GetAllUsers = async () => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  let res = await API.get("/auth/users")
    .then((res) => res)
    .catch((err) => console.log("from api All Users call", err));
  return res.data;
};
