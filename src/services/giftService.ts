import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGiftByType = async (type: string) => {
  return await axios.get(`${apiUrl}/gifts/${type}`);
};

export const getAllGift = async () => {
  return await axios.get(`${apiUrl}/gifts`);
};

export const postGift = async (data: object) => {
  return await axios.post(`${apiUrl}/gifts`, data);
};
