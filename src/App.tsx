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
import SideBar from './components/SideBar';
import CampaignCard from './components/Card/CampaignCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Element } from 'react-scroll';

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
    <div className="w-full min-h-screen flex flex-col items-center py-10">
      <AnimatePresence>
        {client?.activePage === 'create-campaign' && (
          <motion.div
            className='fixed min-h-screen w-full items-center justify-center'
            initial={{scale:0.5}}
            animate={{scale:1}}
            exit={{opacity:0, scale:0.5}}
            transition={{duration: 0.5, type: 'spring'}}
          >
            <CreateCampaign/>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar/>
      <SideBar/>

      <Element name='Home' className='min-h-screen'>
        <motion.div>
          
        </motion.div>
      </Element>
      
      <Element name='Campaigns' className='min-h-screen'>

      </Element>

      <Element name='' className='min-h-screen'>

      </Element>

    </div>
  );
}

export default App;
