import axios from "axios";

export const getCustomerByRedeemCode = async (redeemCode: string) => {
  return await axios.get(`http://localhost:3000/customers/${redeemCode}`);
};
