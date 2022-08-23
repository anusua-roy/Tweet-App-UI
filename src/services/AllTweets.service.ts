import { axiosInstance } from "../api/AxiosInstance";

export const getAllTweets = async () => {
  const result = await axiosInstance.get("/all");
  return result.data;
};
