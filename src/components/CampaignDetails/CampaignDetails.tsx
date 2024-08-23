import { useContext, useState } from 'react';
import { CampaignInterface } from '../../utils/interfaces';
import { ClientContext } from '../../context/Context';
import DefaultImage from '../../assets/morning_forest.jpg';
import { motion } from 'framer-motion';
import { afterPayment } from '../../utils/methods';
import { InfinitySpin } from 'react-loader-spinner';
import { afterPayment, getAllCampaigns, updateCampaign } from '../../utils/methods';

interface CampaignCardProps {
  campaignId: number;
  author: string;
  title: string;
  description: string;
  targetFund: number;
  currentFund: number;
  totalParticipant: number;
  dueDate: string;
}

const CampaignDetails: React.FC<CampaignCardProps> = ({
  campaignId,
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

  const handleDonate = async () => {
    if (Number(amount) < 0.1) {
      alert('Minimum donation is 0.1 ICP');
      return;
    }
    if (client?.user?.balance! < Number(amount)) {
      alert('Insufficient balance');
      return;
    }
    else {
      try {
        client?.setIsLoading(true);
        await afterPayment(client?.user?.email!, campaignId, Number(amount));
        alert('Donation success');
        await handleGetCampaigns();
        client?.setActivePage('');
      }
      catch (error) {
        console.error("Error donating:", error);
        alert('Donation failed');
        return;
      } finally {
        client?.setIsLoading(false);
      }
    }
  }

  const changeDatetime = () => {
    const date = new Date();
    const currentDate = Math.floor(date.getTime() / 1000);
    const formattedDate = Math.floor(Number(dueDate) / 1000000000);
    console.log(currentDate);
    console.log(formattedDate);
    const result = Math.floor((formattedDate - currentDate) / 86400);
    return result;
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

  const [time, setTime] = useState(changeDatetime());

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
            Goal: {targetFund.toLocaleString()} ICP
          </div>
          <div className="text-sm font-semibold text-grays mb-3">
            Currently funded: {currentFund.toLocaleString()} ICP
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
              <button className="bg-black rounded-md ml-3 px-3 py-1 items-center justify-center font-semibold text-white w-fit" onClick={handleDonate}>
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
