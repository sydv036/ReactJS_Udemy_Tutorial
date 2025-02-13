import axios from "./axios.customize";
const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const updateUserAPI = () => {};

const fetchAllUsers = () => {
  const URI_BACKEND = "/api/v1/user";
  return axios.get(URI_BACKEND);
};

export { createUserAPI, updateUserAPI, fetchAllUsers };
