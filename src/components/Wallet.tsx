import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../context/Context';
import { motion } from 'framer-motion';

const Wallet: React.FC = () => {
    const client = useContext(ClientContext);
    const [amount, setAmount] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);

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

      const handleCardDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(formatCardDate(e.target.value));
      };

    const onSubmit = () => {
        if (!amount || !cardNumber || !expirationDate || !cvv) {
        alert('Please fill in all fields');
        return;
        }

        // Basic validation
        if (cardNumber.length !== 16) {
        setError('Invalid card number');
        return;
        }
        if (cvv.length !== 3) {
        setError('Invalid CVV');
        return;
        }

        handleTopUp();
    };

    const handleTopUp = async () => {
        try {
            // setBalance(balance + amount);
            alert('Top-up successful!');
            // setAmount(');
            setCardNumber('');
            setExpirationDate('');
            setCvv('');
            client?.setActivePage(''); // Close the modal
        } catch (error) {
            alert('Top-up failed!');
        }
    };

    const formatCardNumberWithSpaces = (number: string) => {
        return number.replace(/\D/g, "").replace(/(.{4})(?=.)/g, "$1 ");
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, "");
        if (input.length <= 19) {
          setCardNumber(formatCardNumberWithSpaces(input));
        }
    };

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent the click event from propagating to the background
    };

    return (
        <div
        className="flex fixed bg-black bg-opacity-50 w-screen h-screen backdrop-blur-sm items-center justify-center"
        onClick={() => client?.setActivePage('')}
        >
        <motion.div
            className="min-w-[25rem] min-h-[20vh] p-10 flex flex-col bg-white shadow-lg z-10"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring' }}
            onClick={handleCardClick}
        >
            <div className="mb-5 text-xl text-center">Wallet</div>
            <div className="mb-5 text-md text-center">
            Current Balance: ${balance}
            </div>
            <div className="mb-1 text-xs">Amount to Top Up</div>
            <input
            className="py-1 px-3 border border-black rounded-md mb-1"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <div className="mb-1 text-xs">Card Number</div>
            <input
            className={`py-1 px-3 border ${
                error ? 'border-red-500' : 'border-black'
            } rounded-md mb-1`}
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            />
            <div className="mb-1 text-xs">Expiration Date</div>
            <input
            className="py-1 px-3 border border-black rounded-md mb-1"
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={handleCardDateChange}
            />
            <div className="mb-1 text-xs">CVV</div>
            <input
            className={`py-1 px-3 border ${
                error ? 'border-red-500' : 'border-black'
            } rounded-md mb-1`}
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
            />
            {error && (
            <div className="text-red-500 text-xs mb-1">{error}</div>
            )}
            <button
            className="mt-2 bg-black text-white p-2 rounded-lg"
            onClick={onSubmit}
            >
            Top Up
            </button>
        </motion.div>
        </div>
    );
};

export default Wallet;
