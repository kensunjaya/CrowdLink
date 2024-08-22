import { useContext, useEffect, useState } from 'react';
import './App.css';
import { idlFactory, canisterId } from './declarations/backend';
import { Actor, HttpAgent } from '@dfinity/agent';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { getAllCampaigns, getUserByEmail, readAllUser, updateCampaign } from './utils/methods';
import { ClientContext } from './context/Context';
import CreateCampaign from './components/CreateCampaign';
import Navbar from './components/Navbar';
import CampaignCard from './components/Card/CampaignCard';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';
import { CampaignInterface, Users } from './utils/interfaces';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const client = useContext(ClientContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<Users[] | []>([]);
  const [password, setPassword] = useState<string>('');
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showCreateCampaign, setShowCreatecampaign] = useState<boolean>(false);

  const agent = new HttpAgent({ host: 'http://localhost:4943' });
  agent.fetchRootKey(); // Remove this in production

  const canister = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  const handleSignIn = async (email: string, password: string) => {
    const user = (await getUserByEmail(email)) as Users;
    if (!user) {
      alert("User not found");
      return;
    }
    if (user.password === password) {
      alert('Login success');
      localStorage.setItem('auth', JSON.stringify(user));
      client?.setUser(user);
      setIsLoggedIn(true);
    } else {
      alert('Wrong password');
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  const handleSignUp = async () => {
    const success = await canister.createUser({
      username: username,
      email: email,
      password: password,
      balance: 0,
    });
    if (success) {
      setIsLoginPage(true);
      setEmail('');
      setUsername('');
      setPassword('');
    }
  };

  const handleGetCampaigns = async () => {
    const data = await getAllCampaigns() as [number, CampaignInterface][];
    data?.forEach(async (element) => {
      await updateCampaign(element[0], Number(element[1].dueDate) - Date.now() * 1000000);
    });
    const allCampaigns = await getAllCampaigns() as [number, CampaignInterface][];
    console.log(allCampaigns);
    client?.setAllCampaigns(allCampaigns);
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('auth') as string) as Users;
      client?.setUser(user);
      setEmail(user.email);
      // setPassword(user.password);
      setUsername(user.username);
    }
    handleGetCampaigns();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      {client?.activePage === 'campaign-details' && client.selectedCampaign && (
        <CampaignDetails
          author={client.selectedCampaign.author}
          title={client.selectedCampaign.title}
          description={client.selectedCampaign.description}
          targetFund={client.selectedCampaign.targetFund}
          currentFund={client.selectedCampaign.currentFund}
          totalParticipant={client.selectedCampaign.totalParticipant}
          dueDate={client.selectedCampaign.dueDate}
        />
      )}
      {client?.activePage === 'create-campaign' && <CreateCampaign />}
      <div className="w-[60%] h-full bg-white">
        <div className="flex flex-col space-y-5">
          <Navbar />
        </div>
        {isLoggedIn && (
          <div className="flex flex-col space-y-5 mt-[8rem]">
            <div className="text-3xl">Welcome {username}</div>
            <button
              className="bg-black text-white w-fit p-2 rounded-lg"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex flex-col space-y-3">
            {isLoginPage && (
              <>
                <input
                  placeholder="email"
                  className="py-1 px-3 border border-black rounded-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="password"
                  className="py-1 px-3 border border-black rounded-md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-black text-white w-fit p-2 rounded-lg"
                  onClick={() => handleSignIn(email, password)}
                >
                  Sign In
                </button>
              </>
            )}
            {!isLoginPage && (
              <>
                <input
                  placeholder="username"
                  className="py-1 px-3 border border-black rounded-md"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="email"
                  className="py-1 px-3 border border-black rounded-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="password"
                  className="py-1 px-3 border border-black rounded-md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-black text-white w-fit p-2 rounded-lg"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </>
            )}
            <button
              className="bg-black text-white w-fit p-2 rounded-lg"
              onClick={async () => {
                const value = await readAllUser();
                console.log('user: ', client);
                client?.setAllUsers(value);
                setUsers((value as Users[]) ?? []);
                console.log(client?.allUsers);
              }}
            >
              Refetch users
            </button>
          </div>
        )}
        {/* <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={handleGetCampaigns}>Test</button> */}
        <div className="flex space-x-3 mt-10">
          {client?.allCampaigns.map((value) => {
            return (
              <CampaignCard
                key={value[0]}
                author={value[1].author}
                title={value[1].title}
                description={value[1].description}
                targetFund={value[1].targetFund}
                currentFund={value[1].currentFund}
                totalParticipant={value[1].totalParticipant}
                dueDate={value[1].dueDate.toString()}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
