import API from "axios";

API.defaults.baseURL = "http://localhost:5000/api";

export const GetApprovedConfessions = async () => {
  let res = await API.get("/confessions/approved")
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};

export const GetAllConfessions = async () => {
  //let resultData;
  let res = await API.get("/confessions")
    .then((res) => res)
    .catch((err) => err)
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

export const getUser = () => {
  return API.get("/auth");
};
