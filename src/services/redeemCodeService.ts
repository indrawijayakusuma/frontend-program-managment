import axios from "axios";
import axiosJwt from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getRedeemCode = async (ktp: string) => {
  return await axios.get(`${apiUrl}/redeem-code/${ktp}`);
};

export const getAllRedeemCode = async (param: string) => {
  return await axiosJwt.get(`${apiUrl}/redeem-code`, {
    params: { search: param },
  });
};
