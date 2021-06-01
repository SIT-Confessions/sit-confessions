import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const CallApprovedConfessions = async () => {
  let res = await API.get("/api/confessions/approved")
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};

export const GetApprovedConfessions = () => {
    return CallApprovedConfessions();
};