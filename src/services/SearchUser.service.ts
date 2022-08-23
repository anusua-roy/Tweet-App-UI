import { axiosInstance } from "../api/AxiosInstance";

export const searchUsers = async (text: string) => {
  const result = await axiosInstance.get(`/user/search/${text}`);
  return result.data;
};
