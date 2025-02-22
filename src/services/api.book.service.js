import axios from "./axios.customize";

const fetchBookWithPage = (currentPage, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${currentPage}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const createBookAPI = (bookData) => {
  const URL_BACKEND = "/api/v1/book";
  return axios.post(URL_BACKEND, bookData);
};

const updateBookAPI = (bookData) => {
  const URL_BACKEND = "/api/v1/book";
  return axios.put(URL_BACKEND, bookData);
};
const deleteBookAPI = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
};

export { fetchBookWithPage, createBookAPI, updateBookAPI, deleteBookAPI };
