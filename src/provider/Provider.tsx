import React, { useEffect, useState, ReactNode } from "react";
import { Users } from "../utils/interfaces";
import { ClientContext } from "../context/Context";

// Define the props interface, including children
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <ClientContext.Provider value={{ user, isLoading, isLoggedIn, setUser, setIsLoading, setIsLoggedIn }}>{children}</ClientContext.Provider>;
};