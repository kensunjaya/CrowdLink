import { createContext } from "react";
import { Users } from '../utils/interfaces';

interface ClientContextType {
  isLoggedIn: boolean,
  isLoading: boolean,
  user: Users | null,
  allUsers: any | [],
  setAllUsers: Function,
  setUser: Function,
  setIsLoggedIn: Function,
  setIsLoading: Function,

  activePage: string,
  setActivePage: Function,
}


export const ClientContext = createContext<ClientContextType | null>(null);