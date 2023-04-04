import axios from "../Util/axios";
import {
  buildFormData,
  notification,
  removeAccessToken,
  setAccessToken,
} from "../Util/helpers";

export const login = async (formData) => {
  try {
    let { data } = await axios.post("auth/user/login", formData);

    // notification(data.message);
    setAccessToken(data.token);
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};

export const register = async (formData) => {
  try {
    const fd = new FormData();
    buildFormData(fd, formData);
    let { data } = await axios.post("auth/user/register", fd);
    console.log(26, data);

    // notification(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};

export const logout = async () => {
  try {
    // let { data } = await axios.post("auth/user/logout", formData);

    removeAccessToken();
    // notification("logout successfully");
    setTimeout(() => window.location.reload(), 2000);
    // return data;
  } catch (error) {
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};

// export const getUser = async () => {
//   let { data } = await axios.get("account");
//   return data;
// };
