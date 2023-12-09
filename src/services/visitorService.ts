import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllVisitor = async (param: string, page: object) => {
  return await axiosJwt.get(`${apiUrl}/visitors`, {
    params: { search: param, ...page },
  });
};

export const postVisitor = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/visitors`, data);
};
