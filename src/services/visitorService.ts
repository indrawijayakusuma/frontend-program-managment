import axios from "axios";

// export const postVisitor  = (data, callback) => {
//     axios.post('http://localhost:3000/visitors', data)
// }

export const postVisitor = async (data: object) => {
  return await axios.post("http://localhost:3000/visitors", data);
};
