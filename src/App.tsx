import { useEffect, useState } from 'react';
import './App.css';
import { idlFactory, canisterId } from './declarations/backend'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Actor, HttpAgent } from '@dfinity/agent';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';

interface Users {
  email: string;
  username: string;
  password: string;
}

function App() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<Users[]>([]);
  const [password, setPassword] = useState<string>('');
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const agent = new HttpAgent({ host: 'http://localhost:4943' });
  agent.fetchRootKey(); // Remove this in production

  const canister = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  async function readUser(userId: any) {
    const user = await canister.read(userId);
    console.log('User data:', user);
  }

  async function getUserByEmail(email: string) {
    const user = await canister.read(email) as any;
    console.log(user);
    return user[0];
  }

  const handleSignIn = async (email: string, password: string) => {
    const user = await getUserByEmail(email) as Users;
    if (user.password === password) {
      alert('Login success');
      localStorage.setItem('auth', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      alert('Wrong password');
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  }

  async function readAllUser() {
    const users = await canister.readAll() as Users[];
    console.log(users);
    setUsers(users);
  }

  async function createUser() {
    await canister.createUser({ username: username, email: email, password: password });
    setEmail("");
    setUsername("");
    setPassword("");
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
    <div className="w-full min-h-screen bg-white">
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
              <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => createUser()}>Sign Up</button>
            </>
          )}
          <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => readAllUser()}>Refetch users</button>
          {/* <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => getUserByEmail(email)}>Test button</button> */}
        </div>
      )}

      <div className="card">
        {users.map((value: any, index: number) => {
          return (
            <div key={index}>
              {value[1].username}, {value[1].email}, {value[1].password}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
