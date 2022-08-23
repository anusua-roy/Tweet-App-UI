import { axiosInstance } from "../api/AxiosInstance";

export const getAllTweetsByUser = async (username: string) => {
  const result = await axiosInstance.get(username);
  return result.data;
};
