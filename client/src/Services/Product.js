import axios from "../Util/axios";

export const getAllProducts = async () => {
  try {
    let { data } = await axios.get("products");

    // notification(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};

export const getProduct = async (id) => {
  try {
    let { data } = await axios.get(`products/${id}`);

    // notification(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};
