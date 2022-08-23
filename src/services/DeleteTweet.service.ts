import { axiosInstance } from "../api/AxiosInstance";

export const deleteTweet = async (username: string, tweetId: string) => {
  const result = await axiosInstance.delete(`/${username}/delete/${tweetId}`);
  return result;
};
