import { useContext, useEffect, useState } from 'react';
import './App.css';
import { idlFactory, canisterId } from './declarations/backend'
import { Actor, HttpAgent } from '@dfinity/agent';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { Users } from './utils/interfaces';
import { getAllCampaigns, getUserByEmail, readAllUser } from './utils/methods';
import { ClientContext } from './context/Context'
import CreateCampaign from './components/CreateCampaign';
import Navbar from './components/Navbar';
import CampaignCard from './components/Card/CampaignCard';

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
    if (user.password === password) {
      alert('Login success');
      localStorage.setItem('auth', JSON.stringify(user));
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
    const success = await canister.createUser({ username: username, email: email, password: password, balance: 0 });
    if (success) {
      setIsLoginPage(true);
      setEmail("");
      setUsername("");
      setPassword("");
    }
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('auth') as string) as Users;
      setEmail(user.email);
      // setPassword(user.password);
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center py-10">
      {client?.activePage === "create-campaign" && (<CreateCampaign />)}
      <div className="w-[60%] h-full bg-white">
        <div className="flex flex-col space-y-5">
          <Navbar />
        </div>
        <button className="bg-black text-white w-fit p-2 rounded-lg mb-5" onClick={() => setIsLoginPage(!isLoginPage)}>Switch mode</button>
        {isLoggedIn && (
          <div className="flex flex-col space-y-5">
            <div className="text-3xl">Welcome {username}</div>
            <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => handleLogOut()}>Logout</button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex flex-col space-y-3">
            {isLoginPage && (
              <>
                <input placeholder="email" className="py-1 px-3 border border-black rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="password" className="py-1 px-3 border border-black rounded-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => handleSignIn(email, password)}>Sign In</button>
              </>
            )}
            {!isLoginPage && (
              <>
                <input placeholder="username" className="py-1 px-3 border border-black rounded-md" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="email" className="py-1 px-3 border border-black rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="password" className="py-1 px-3 border border-black rounded-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={handleSignUp}>Sign Up</button>
              </>
            )}
            <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={async () => {
              const value = await readAllUser();
              console.log('user: ', client);
              client?.setAllUsers(value);
              setUsers(value as Users[] ?? []);
              console.log(client?.allUsers);
            }}>
              Refetch users
            </button>
          </div>
        )}

        <div className="card">
          {client?.allUsers?.map((value: any, index: number) => {
            return (
              <div key={index}>
                {value[1].username}, {value[1].email}, {value[1].password}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    //     <CampaignCard
    //       author={'Sherly'}
    //       title={'Main Heading'}
    //       description={
    //         'Lorem Ipsum aosdkasodkasodkasodaksdoa kasodkasodkasodas dasodasdoadk'
    //       }
    //       targetFund={1000000}
    //       currentFund={500000}
    //       totalParticipant={50}
    //       dueDate={'2024-8-24'}
    //     />
  );
}

export default App;
