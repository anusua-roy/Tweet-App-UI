import axios from "axios";
import { BASE_URL } from "../constants/Static.constants";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
