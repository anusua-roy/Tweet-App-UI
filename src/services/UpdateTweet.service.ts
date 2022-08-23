import { axiosInstance } from "../api/AxiosInstance";

export const updateTweet = async (
  username: string,
  tweetId: string,
  data: object
) => {
  const result = await axiosInstance.put(
    `/${username}/update/${tweetId}`,
    data
  );
  return result;
};
