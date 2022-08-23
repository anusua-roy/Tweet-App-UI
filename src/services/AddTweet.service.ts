import { axiosInstance } from "../api/AxiosInstance";

export const AddTweet = async (username: string, data: object) => {
  const result = await axiosInstance.post(`/${username}/add`, data);
  return result;
};
