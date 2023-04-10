import { toast } from "react-toastify";

export const setAccessToken = (token) => {
  localStorage.setItem("user_token", token);
};
export const getAccessToken = () => localStorage.getItem("user_token");
export const removeAccessToken = () => localStorage.removeItem("user_token");

export const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
};

export const notification = (message, type = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });
};
