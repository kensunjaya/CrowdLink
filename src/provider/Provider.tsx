import React, { useEffect, useState, ReactNode } from 'react';
import { CampaignInterface, Users } from '../utils/interfaces';
import { ClientContext } from '../context/Context';

// Define the props interface, including children
interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [allUsers, setAllUsers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignInterface>({
    author: '',
    title: '',
    description: '',
    targetFund: 0,
    currentFund: 0,
    totalParticipant: 0,
    dueDate: '',
  });

  return (
    <ClientContext.Provider
      value={{
        allUsers,
        user,
        isLoading,
        isLoggedIn,
        activePage,
        setUser,
        setAllUsers,
        setIsLoading,
        setIsLoggedIn,
        setActivePage,
        selectedCampaign,
        setSelectedCampaign,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
