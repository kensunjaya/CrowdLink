import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../context/Context';
import { motion } from 'framer-motion';
import seedrandom from 'seedrandom';
import { topUp } from '../utils/methods';
import { InfinitySpin } from 'react-loader-spinner';

const Wallet: React.FC = () => {
    const client = useContext(ClientContext);
    const [amount, setAmount] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string>('');

    const formatCardDate = (value: string) => {
        const cleanValue = value.replace(/\D/g, "");
        const formattedValue =
            cleanValue.length > 2
                ? `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`
                : cleanValue;
        return formattedValue.length > 5
            ? formattedValue.slice(0, 5)
            : formattedValue;
    };

    const onSubmit = () => {
        if (!amount) {
            alert('Amount cannot be empty!');
            return;
        }
        handleTopUp();
    };

    const handleTopUp = async () => {
        try {
            // setBalance(balance + amount);

            // setAmount(');
            client?.setIsLoading(true);
            setCardNumber('');
            setExpirationDate('');
            setCvv('');
            if (client?.user?.email) {
                await topUp(client?.user?.email, parseFloat(amount))
                alert('Top-up successful!');
                const newBalance = client?.user?.balance + parseFloat(amount)
                const user = {
                    email: client?.user?.email,
                    username: client?.user?.username,
                    password: client?.user?.password,
                    balance: newBalance,
                }
                client?.setUser(user)
                localStorage.setItem('auth', JSON.stringify(user));
            }
            else {
                alert('Top-up failed!');
            }
            client?.setActivePage(''); // Close the modal
        } catch (error) {
            console.log(error);
        } finally {
            client?.setIsLoading(false);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setAmount(value);
        }
    };

    const generateAddress = (seed: any) => {
        const rng = seedrandom(seed); // Create a seeded random number generator
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let address = '0x';

        for (let i = 0; i < 30; i++) {
            const randomIndex = Math.floor(rng() * characters.length);
            address += characters[randomIndex];
        }

        setAddress(address);
    };


    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent the click event from propagating to the background
    };

    useEffect(() => {
        generateAddress(client?.user?.email);
    }, [])

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
            <motion.div
                className="min-w-[25rem] min-h-[20vh] p-10 flex flex-col bg-white shadow-lg z-10"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring' }}
                onClick={handleCardClick}
            >
                <div className="mb-5 text-xl text-center">Digital Wallet</div>
                <div className="mb-5 text-md text-center">
                    Current Balance: {client?.user?.balance} ICP
                </div>
                <div className="mb-1 text-xs">Amount to Top Up (ICP)</div>
                <input
                    className="py-1 px-3 border border-black rounded-md mb-1"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <div className="mb-1 mt-5 text-xs">{`Paste this id to your digital wallet app`}</div>
                <input className="py-1 px-3 border border-black rounded-md mb-5" value={address} disabled />
                {error && (
                    <div className="text-red-500 text-xs mb-1">{error}</div>
                )}
                <button
                    className="mt-2 bg-black text-white p-2 rounded-lg"
                    onClick={onSubmit}
                >
                    Done
                </button>
            </motion.div>
        </div>
    );
};

export default Wallet;
