import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCustomerByRedeemCode = async (redeemCode: string) => {
  return await axiosJwt.get(`${apiUrl}/customers/${redeemCode}`);
};
