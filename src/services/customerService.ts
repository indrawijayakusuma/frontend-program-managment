import axios from "axios";

export const getCustomerByRedeemCode = async (redeemCode: string) => {
  return await axios.get(`http://localhost:5000/customers/${redeemCode}`);
};
