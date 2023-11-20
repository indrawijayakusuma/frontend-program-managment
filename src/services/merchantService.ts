import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const getAllMerchant = async () => {
  return await axios.get(`${apiUrl}/merchants`);
};

export const postMerchant = async (data: object) => {
  return await axios.post(`${apiUrl}/merchants`, data);
};
