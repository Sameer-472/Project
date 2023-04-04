import axios from "../Util/axios";

export const getEthRate = async () => {
  try {
    let { data } = await axios.get("eth-rate");

    // notification(data.message);
    return data;
  } catch (error) {
    alert(error.response.data.message, "error");
    // notification(error.response.data.message, "error");
    console.log(error);
  }
};
