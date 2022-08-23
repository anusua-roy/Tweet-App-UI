import { axiosInstance } from "../api/AxiosInstance";

export const addReply = async (
  username: string,
  tweetId: string,
  data: object
) => {
  const result = await axiosInstance.post(
    `/${username}/reply/${tweetId}`,
    data
  );
  return result;
};
