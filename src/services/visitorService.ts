import axios from "axios";

export const getAllVisitor = async () => {
  return await axios.get("http://localhost:5000/visitors");
};

export const postVisitor = async (data: object) => {
  return await axios.post("http://localhost:5000/visitors", data);
};
