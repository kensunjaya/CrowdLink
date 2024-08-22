import { useContext, useEffect, useState } from 'react';
import './App.css';
import { idlFactory, canisterId } from './declarations/backend';
import { Actor, HttpAgent } from '@dfinity/agent';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import {
  getAllCampaigns,
  getUserByEmail,
  readAllUser,
  updateCampaign,
} from './utils/methods';
import { ClientContext } from './context/Context';
import CreateCampaign from './components/CreateCampaign';
import Navbar from './components/Navbar';
import CampaignCard from './components/Card/CampaignCard';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';
import { CampaignInterface, Users } from './utils/interfaces';

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
      alert('User not found');
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
        <div className="flex justify-center mt-[18vh] mx-[40vh] text-lg text-black">
          <p>Welcome to CrowdLink where transparency meets innovation in crowdfunding. Powered by 
            blockchain technology, CrowdLink ensures every transaction is secure, transparent, and immutable. 
            Whether you're a project creator or a backer, our platform provides the trust and accountability you 
            need to confidently engage in the world of crowdfunding. Join us and experience the future of 
            fundraising with CrowdLink.</p>
        </div>
      {client?.activePage === "create-campaign" && (<CreateCampaign />)}
      {client?.activePage === "register" && (<Register />)}
      {client?.activePage === "login" && (<Login />)}
      {client?.activePage === 'campaign-details' && client.selectedCampaign && (
        <CampaignDetails
          campaignId={client.selectedCampaignId}
          author={client.selectedCampaign.author}
          title={client.selectedCampaign.title}
          description={client.selectedCampaign.description}
          targetFund={client.selectedCampaign.targetFund}
          currentFund={client.selectedCampaign.currentFund}
          totalParticipant={client.selectedCampaign.totalParticipant}
          dueDate={client.selectedCampaign.dueDate}
        />
      )}
      <div className="mt-[5vh] w-[60%]">
        <div className="flex flex-col space-y-5">
          <Navbar />
        </div>
        <div className='flex justify-center items-center text-xl font-bold'>
          ALL CAMPAIGN
        </div>
        <div className="flex space-x-3 mt-10 mb-10">
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
            );
          })}
        </div>
        <div className='bg-gray-300 rounded-lg p-5 m-5'>
          <div className='flex justify-center items-center text-2xl font-bold mb-5'>
          Get the newest campaigns in your inbox
          </div>
        <div className='flex justify-center items-center mb-2'>
          <input
          className='border border-black rounded-lg p-2 w-[40%] mx-2'
          type='textfield'
          placeholder='Enter your email address'
          />
          <button className='bg-black text-white p-2 rounded-lg'>Sign Me Up</button>
        </div>
        <div className='flex justify-center items-center mb-5'>
          <h6>By clicking “Sign me up” I have read and agree to CrowdLink's Terms of Use and Privacy Policy .</h6>
        </div>
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
          <div className="flex flex-col space-y-3 mb-5">
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
