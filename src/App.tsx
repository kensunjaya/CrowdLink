import { useEffect, useState } from 'react';
import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { idlFactory, canisterId } from './declarations/backend'
import { Actor, HttpAgent } from '@dfinity/agent';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';

interface Users {
  email: string;
  username: string;
}

function App() {
  const [greeting, setGreeting] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<Users[]>([]);

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

  async function readAllUser() {
    const users = await canister.readAll() as Users[];
    console.log(users);
    setUsers(users);
  }

  async function createUser() {
    await canister.createUser({ username: username, email: email });
  }

  useEffect(() => {
    // idlFactory.readAll().then((greeting: any) => {
    //   console.log(greeting);
    //   setGreeting(greeting);
    // });
    readUser(0);
  }, []);

  // const { data: count, call: refetchCount } = useQueryCall({
  //   functionName: 'get',
  // });

  // const { call: increment, loading } = useUpdateCall({
  //   functionName: 'inc',
  //   onSuccess: () => {
  //     refetchCount();
  //   },
  // });

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col space-y-2">
        <input placeholder="username" className="py-1 px-3 border border-black rounded-md" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="password" className="py-1 px-3 border border-black rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => createUser()}>Submit</button>
        <button className="bg-black text-white w-fit p-2 rounded-lg" onClick={() => readAllUser()}>Refetch users</button>
      </div>
      <div className="card">
        {/* <button onClick={increment} disabled={loading}>
          count is {count?.toString() ?? 'loading...'}
        </button> */}
        {users.map((value: any, index: number) => {
          return (
            <div key={index}>
              {value[1].username}, {value[1].email}
            </div>
          );
        })}
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Motoko logos to learn more
      </p>
    </div>
  );
}

export default App;
