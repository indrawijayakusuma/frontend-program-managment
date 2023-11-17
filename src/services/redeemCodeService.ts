import axios from "axios";

export const getRedeemCode = async (ktp: string) => {
  return await axios.get(`http://localhost:5000/redeem-code/${ktp}`);
};

export const getAllRedeemCode = async () => {
  return await axios.get("http://localhost:5000/redeem-code");
};
