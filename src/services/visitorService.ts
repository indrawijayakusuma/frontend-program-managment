import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const getAllVisitor = async () => {
  return await axios.get(`${apiUrl}/visitors`);
};

export const postVisitor = async (data: object) => {
  return await axios.post(`${apiUrl}/visitors`, data);
};
