import axios from "axios";
import { connection_string } from "./connection_strings";
import { getAccessToken } from "./helpers";
window.axios = axios;
axios.defaults.baseURL = connection_string;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
if (getAccessToken())
  axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken()}`;

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// Adds a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      localStorage.removeItem("user_token");
      // history.replace();
      // router.push({name : 'auth.login'});
    }
    return Promise.reject(error);
  }
);

export default axios;
