import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGift = async (type: string) => {
  return await axios.get(`${apiUrl}/gifts/${type}`);
};
