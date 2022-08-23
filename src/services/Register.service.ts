import { axiosInstance } from "../api/AxiosInstance";

export const RegisterUser = async (data: object) => {
  const result = await axiosInstance.post("/users/register", data);
  return result;
};
