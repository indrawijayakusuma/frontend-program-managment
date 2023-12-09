import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGiftByType = async (type: string) => {
  return await axiosJwt.get(`${apiUrl}/gifts/${type}`);
};

export const getAllGift = async () => {
  return await axiosJwt.get(`${apiUrl}/gifts`);
};

export const postGift = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/gifts`, data);
};
