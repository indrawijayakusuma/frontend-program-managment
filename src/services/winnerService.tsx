import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const postWinner = async (data: FormData) => {
  return await axios.post(`${apiUrl}/winners`, data, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total === null) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      }
    },
  });
};

export const getWinner = async () => {
  return await axios.get(`${apiUrl}/winners`);
};
