// import axios from "axios";
import axios from "../components/setup/axios";
const registryService = (email, phone, username, password) => {
  return axios.post("/register", {
    email,
    phone,
    username,
    password,
  });
};
const loginService = (valueLogin, password) => {
  return axios.post("/login", {
    valueLogin,
    password,
  });
};
const fetchAllUser = (page, limit) => {
  return axios.get(`/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = (user) => {
  return axios.delete("/user/delete", {
    data: { id: user.id },
  });
};
const fetchGroup = () => {
  return axios.get("/group/read");
};
const createUser = (email, phone, username, password, address, sex, group) => {
  return axios.post("/user/create", {
    email,
    phone,
    username,
    password,
    address,
    sex,
    group,
  });
};
const updateUser = (data) => {
  return axios.put("/user/update", data);
};
const fetchUserToken = () => {
  return axios.get("/usertoken");
};
export {
  registryService,
  loginService,
  fetchAllUser,
  deleteUser,
  fetchGroup,
  createUser,
  updateUser,
  fetchUserToken,
};
