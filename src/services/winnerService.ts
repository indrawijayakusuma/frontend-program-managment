import axios from "axios";
import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const postWinner = async (data: FormData) => {
  let percentCompleted;
  await axiosJwt.post(`${apiUrl}/winners`, data, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== undefined) {
        percentCompleted = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
      }
    },
  });

  return percentCompleted;
};

export const getWinner = async (param: string, page: object) => {
  return await axiosJwt.get(`${apiUrl}/winners`, {
    params: { search: param, ...page },
  });
};

export const getWinnerByKtp = async (ktp: string) => {
  return await axios.get(`${apiUrl}/winners/ktp/${ktp}`);
};
