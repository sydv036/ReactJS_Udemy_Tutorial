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
const updateUserAPI = (id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  let data;
  if (avatar === undefined) {
    data = {
      _id: id,
      fullName: fullName,
      phone: phone,
    };
  } else {
    data = {
      _id: id,
      fullName: fullName,
      phone: phone,
      avatar: avatar,
    };
  }

  return axios.put(URL_BACKEND, data);
};

const deleteUserAPI = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

const fetchAllUsers = (current, pageSize) => {
  const URI_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URI_BACKEND);
};

const uploadFileAPI = (file, folder) => {
  const config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const URL_BACKEND = `/api/v1/file/upload`;
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};
const registerAPI = (dataUserObject) => {
  const URL_BACKEND = "/api/v1/user/register";
  return axios.post(URL_BACKEND, dataUserObject);
};

const loginAPI = (username, password, delay) => {
  const URL_BACKEND = "/api/v1/auth/login";
  return axios.post(URL_BACKEND, {
    username: username,
    password: password,
    delay: delay,
  });
};

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUsers,
  deleteUserAPI,
  uploadFileAPI,
  registerAPI,
  loginAPI,
};
