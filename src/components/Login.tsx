import React from 'react';
import { useContext, useState } from 'react';
import { ClientContext } from '../context/Context';
import { getUserByEmail } from '../utils/methods';
import { Users } from '../utils/interfaces';
import { InfinitySpin } from 'react-loader-spinner';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const client = useContext(ClientContext);

  const onSubmit = () => {
    let valid = true;
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Clear previous errors
    setEmailError(null);
    setPasswordError(null);

    // email pattern validation
    let pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!pattern.test(email)) {
      setEmailError('Invalid email');
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    }

    if (valid && email && password) {
      handleSignIn(email, password);
      // Optionally reset form fields
      setEmail('');
      setPassword('');
      client?.setActivePage(''); // Close the modal
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the background
    e.stopPropagation();
  };

  const handleSignIn = async (email: string, password: string) => {
    client?.setIsLoading(true);
    const user = (await getUserByEmail(email)) as Users;
    client?.setIsLoading(false);
    if (!user) {
      alert('User not found');
      return;
    }
    if (user.password === password) {
      alert('Login success');
      localStorage.setItem('auth', JSON.stringify(user));
      client?.setUser(user);
      client?.setIsLoggedIn(true);
    } else {
      alert('Wrong password');
    }
  };

  return (
    <div
      className="flex fixed bg-transparent w-screen h-screen items-center justify-center z-10"
      onClick={() => client?.setActivePage('')}
    >
      {client?.isLoading && (
          <div className="absolute z-20 bg-black bg-opacity-20 w-full h-full items-center justify-center flex">
              <InfinitySpin color='#808080'/>
          </div>
      )};
      <div
        className="min-w-[25rem] min-h-[20vh] p-10 flex flex-col bg-white shadow-lg z-10"
        onClick={handleCardClick}
      >
        <div className="mb-5 text-xl text-center">LOGIN</div>
        <div className="mb-1 text-xs">Email</div>
        <input
          className={`py-1 px-3 border ${emailError ? 'border-red-500' : 'border-black'
            } rounded-md mb-1`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {emailError && (
          <div className="text-red-500 text-xs mb-1">{emailError}</div>
        )}
        <div className="mb-1 text-xs">Password</div>
        <input
          className={`py-1 px-3 border ${passwordError ? 'border-red-500' : 'border-black'
            } rounded-md mb-1`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <div className="text-red-500 text-xs mb-1">{passwordError}</div>
        )}
        <div className="flex pt-2 pb-2 justify-end">
          <div className="pr-2 text-sm">Don't have an account?</div>
          <button
            type="button"
            onClick={() => client?.setActivePage('register')}
            className="text-black text-sm underline hover:cursor-pointer"
          >
            Register here
          </button>
        </div>
        <button
          className="mt-2 bg-black text-white p-2 rounded-lg"
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
