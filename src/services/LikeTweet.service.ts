import { axiosInstance } from "../api/AxiosInstance";

export const likeTweet = async (
  username: string,
  tweetId: string,
  like: number
) => {
  const result = await axiosInstance.put(
    `/${username}/like/${tweetId}?like=${like}`
  );
  return result;
};
