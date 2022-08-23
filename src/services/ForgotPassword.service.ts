import { axiosInstance } from "../api/AxiosInstance";

export const ForgotPassword = async (username: string, password: string) => {
  const result = await axiosInstance.get(
    `/${username}/forgot?password=${password}`
  );
  return result;
};
