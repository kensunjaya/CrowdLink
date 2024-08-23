import React from 'react';
import { useContext, useState } from 'react';
import { ClientContext } from '../context/Context';
import { motion } from 'framer-motion';
import { canister } from '../utils/canister';
import { InfinitySpin } from 'react-loader-spinner';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmpassword, setConfirmpassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const client = useContext(ClientContext);

  const onSubmit = () => {
    let valid = true;
    if (!username || !email || !password || !confirmpassword) {
      alert('Please fill in all fields');
      return;
    }

    // Clear previous errors
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

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

    if (password !== confirmpassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid && username && email && password && confirmpassword) {
      handleSignUp();
      alert('Registration successful!');
      // Optionally reset form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmpassword('');
      client?.setActivePage('login'); // Close the modal
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the background
    e.stopPropagation();
  };

  const handleSignUp = async () => {
    try {
      client?.setIsLoading(true);
      const success = await canister.createUser({
        username: username,
        email: email,
        password: password,
        balance: 0,
      });
      if (success) {
        setEmail('');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      client?.setIsLoading(false)
    }
  };

  return (
    <div
      className="flex fixed bg-black bg-opacity-50 w-screen h-screen backdrop-blur-sm items-center justify-center z-10"
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
        <div className="mb-5 text-xl text-center">REGISTER</div>
        <div className="mb-1 text-xs">Username</div>
        <input
          className="py-1 px-3 border border-black rounded-md mb-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
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
        <div className="mb-1 text-xs">Confirm Password</div>
        <input
          className={`py-1 px-3 border ${confirmPasswordError ? 'border-red-500' : 'border-black'
            } rounded-md mb-1`}
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        {confirmPasswordError && (
          <div className="text-red-500 text-xs mb-1">
            {confirmPasswordError}
          </div>
        )}
        <div className="flex pt-2 pb-2 justify-end">
          <div className="pr-2 text-sm">Already have an account?</div>
          <button
            type="button"
            onClick={() => client?.setActivePage('login')}
            className="text-black text-sm underline hover:cursor-pointer"
          >
            Login here
          </button>
        </div>
        <button
          className="mt-2 bg-black text-white p-2 rounded-lg"
          onClick={onSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
