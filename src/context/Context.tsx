import { createContext } from "react";
import { Users } from '../utils/interfaces';

interface ClientContextType {
  isLoggedIn: boolean,
  isLoading: boolean,
  user: Users | null,
  setUser: Function,
  setIsLoggedIn: Function,
  setIsLoading: Function,
}


export const ClientContext = createContext<ClientContextType | null>(null);