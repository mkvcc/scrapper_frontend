import axios from "./axios";

export default {
  login(payload) {
    return axios.post("/auth/login" , payload);
  },
};