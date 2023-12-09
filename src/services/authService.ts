import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (data: object) => {
  return await axios.post(`${apiUrl}/authentications`, data);
};

export const deleteRefreshToken = async (data: object) => {
  return await axios.delete(`${apiUrl}/authentications`, { data });
};

export const putRefreshToken = async (data: object) => {
  return await axios.put(`${apiUrl}/authentications`, { ...data });
};
