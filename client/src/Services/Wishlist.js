import axios from "../Util/axios";

export const getWishlists = async () => {
  try {
    let { data } = await axios.get("/wishlist");
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // return error.response.data.message;
  }
};

export const updateWishlist = async (productId) => {
  try {
    let { data } = await axios.get(`/wishlist/update/${productId}`);
    return data;
  } catch (error) {
    if (error.response) {
      alert(error?.response?.data.message, "error");
      throw new Error(error?.response?.data.message);
    }
  }
};

export const truncateWishList = async () => {
  try {
    let { data } = await axios.delete(`/wishlist/clear`);
    return data;
  } catch ({ response }) {
    if (response) {
      alert(response?.data?.message, "error");
      throw new Error(response?.data?.message);
    }
  }
};
