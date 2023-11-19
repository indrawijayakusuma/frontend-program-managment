import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCustomerByRedeemCode = async (redeemCode: string) => {
  return await axios.get(`${apiUrl}/customers/${redeemCode}`);
};
