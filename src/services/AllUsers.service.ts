import { axiosInstance } from "../api/AxiosInstance";

export const getAllUsers = async () => {
  const result = await axiosInstance.get("/users/all");
  return result.data;
};
