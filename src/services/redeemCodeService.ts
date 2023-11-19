import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getRedeemCode = async (ktp: string) => {
  return await axios.get(`${apiUrl}/redeem-code/${ktp}`);
};

export const getAllRedeemCode = async () => {
  return await axios.get(`${apiUrl}/redeem-code`);
};
