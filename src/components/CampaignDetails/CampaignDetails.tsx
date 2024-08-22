import { useContext, useState } from 'react';
import { CampaignInterface } from '../../utils/interfaces';
import { ClientContext } from '../../context/Context';
import DefaultImage from '../../assets/morning_forest.jpg';
import { motion } from 'framer-motion';

const CampaignDetails: React.FC<CampaignInterface> = ({
  author,
  title,
  description,
  targetFund,
  currentFund,
  totalParticipant,
  dueDate,
}) => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the background
    e.stopPropagation();
  };
  const [amount, setAmount] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pattern = /^\d*\.?\d*$/;

    if (pattern.test(value)) {
      setAmount(value);
    }
  };

  const client = useContext(ClientContext);
  const changeDatetime = () => {
    const date = new Date();
    const currentDate = Math.floor(date.getTime() / 1000);
    const formattedDate = Math.floor(Number(dueDate) / 1000000000);
    console.log(currentDate);
    console.log(formattedDate);
    const result = Math.floor((formattedDate - currentDate) / 86400);
    return result;
  };
  const [time, setTime] = useState(changeDatetime());

  return (
    <div
      className="flex fixed bg-black bg-opacity-50 w-screen h-screen backdrop-blur-sm items-center justify-center"
      onClick={() => client?.setActivePage('')}
    >
      <motion.div
        className="min-w-[25rem] max-w-[50rem] min-h-[20vh] flex flex-row bg-white shadow-lg rounded-md"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: 'spring' }}
        onClick={handleCardClick} // Stop propagation here
      >
        <img
          src={DefaultImage}
          alt="campaign"
          className="w-[40%] h-auto bg-auto rounded-l-md"
        />
        <div className="p-5 text-start items-center">
          <div className="text-3xl font-bold mb-3">{title}</div>
          <div className="text-xl font-semibold text-green-800">
            ICP {currentFund.toLocaleString()}
          </div>
          <div className="text-sm font-semibold text-grays mb-3">
            pledged of ICP {targetFund.toLocaleString()} goal
          </div>
          <div className="text-xl font-semibold text-grays">
            {totalParticipant}
          </div>
          <div className="text-sm font-semibold text-grays mb-3">backers</div>
          <div className="text-xl font-semibold text-grays">{time}</div>
          <div className="text-sm font-semibold text-grays mb-3">
            days to go
          </div>
          <div className="flex flex-row">
            <input type="text" placeholder='Enter amount in ICP..' value={amount} onChange={handleAmountChange} className="py-1 px-3 border border-black rounded-md" />
            {amount && (
              <button className="bg-black rounded-md ml-3 px-3 py-1 items-center justify-center font-semibold text-white w-fit">
                {"Donate"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignDetails;
