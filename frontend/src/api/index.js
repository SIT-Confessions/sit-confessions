import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const GetApprovedConfessions = async () => {
  let res = await API.get("/confessions/approved")
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  return res.data;
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
