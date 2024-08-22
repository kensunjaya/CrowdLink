import React, { useEffect, useState, ReactNode } from "react";
import { Users } from "../utils/interfaces";
import { ClientContext } from "../context/Context";

// Define the props interface, including children
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [allUsers, setAllUsers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState<boolean>(false);

  return <ClientContext.Provider value={{
    allUsers,
    user,
    isLoading,
    isLoggedIn,
    showCreateCampaign,
    setUser,
    setAllUsers,
    setIsLoading,
    setIsLoggedIn,
    setShowCreateCampaign
  }}>{children}</ClientContext.Provider>;
};