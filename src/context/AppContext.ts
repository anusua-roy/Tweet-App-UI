import { createContext } from "react";
import { IUserModel } from "../interfaces/Common.interface";

interface IContextType {
  isUserActive: boolean;
  setIsUserActive: React.Dispatch<React.SetStateAction<boolean>> | null;
  user: IUserModel;
  setUser: React.Dispatch<React.SetStateAction<IUserModel>> | null;
}

export const AppContext = createContext<IContextType>({
  isUserActive: false,
  setIsUserActive: null,
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contact: "",
  },
  setUser: null,
});
