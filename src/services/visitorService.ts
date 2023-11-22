import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const getAllVisitor = async (param: string, page: object) => {
  return await axios.get(`${apiUrl}/visitors`, {
    params: { search: param, ...page },
  });
};

export const postVisitor = async (data: object) => {
  return await axios.post(`${apiUrl}/visitors`, data);
};
