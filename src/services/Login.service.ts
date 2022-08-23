import { axiosInstance } from "../api/AxiosInstance";

export const LoginUser = async (loginId: string, password: string) => {
  try {
    const result = await axiosInstance.get(
      `/users/login?loginId=${loginId}&auth=${password}`
    );
    return result;
  } catch {
    return false;
  }
};
