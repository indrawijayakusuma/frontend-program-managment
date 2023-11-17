import axios from "axios";

export const postWinner = async (data: object) => {
  return await axios.post("http://localhost:5000/winners", data);
};

export const getWinner = async () => {
  return await axios.get("http://localhost:5000/winners");
};
