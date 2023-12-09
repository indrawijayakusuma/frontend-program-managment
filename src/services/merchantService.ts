import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllMerchant = async (param: string, page: object) => {
  return await axiosJwt.get(`${apiUrl}/merchants`, {
    params: { search: param, ...page },
  });
};

export const postMerchant = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/merchants`, data);
};
