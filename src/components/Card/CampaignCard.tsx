import { useContext, useEffect, useState } from 'react';
import { CampaignInterface } from '../../utils/interfaces';
import DefaultImage from '../../assets/morning_forest.jpg';
import { RiShakeHandsFill } from 'react-icons/ri';
import { TbClockHour4 } from 'react-icons/tb';
import { BsDot } from 'react-icons/bs';
import { ClientContext } from '../../context/Context';
import { motion } from 'framer-motion';

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

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaignId,
  author,
  title,
  description,
  targetFund,
  currentFund,
  totalParticipant,
  dueDate,
}) => {
  const getFundPercentage = () => {
    return (currentFund / targetFund) * 100;
  };
  const fundPercentage = getFundPercentage();
  const changeDatetime = () => {
    const date = new Date();
    const currentDate = Math.floor(date.getTime() / 1000);
    const formattedDate = Math.floor(Number(dueDate) / 1000000000);
    const result = Math.floor((formattedDate - currentDate) / 86400);
    return result;
  };
  const [time, setTime] = useState(changeDatetime());
  const [descriptions, setDescriptions] = useState<string>(description);
  const client = useContext(ClientContext);
  const [showCard, setShowCard] = useState<boolean>(true);
  // const [campaignId, setCampaignId] = useState<number>(0);

  const handleClick = () => {
    if (!client?.isLoggedIn) {
      !client?.setActivePage('login');
      return;
    }
    client?.setActivePage('campaign-details');
    client?.setSelectedCampaignId(campaignId);
    client?.setSelectedCampaign({
      author,
      title,
      description,
      targetFund,
      currentFund,
      totalParticipant,
      dueDate,
    });
  };

  useEffect(() => {
    if (time < 0) {
      setShowCard(false);
    }
  }, []);
  return (
    <>
      {showCard ? (
        <motion.div
          className="bg-secondary m-2 hover:cursor-pointer w-[18rem] h-[20rem] shadow-md hover:shadow-lg transition hover:shadow-gray-500 shadow-gray-400 rounded-lg flex flex-col text-sm"
          // initial={{ scale: 0.5 }}
          // animate={{ scale: 1 }}
          // exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring' }}
          onClick={handleClick}
        >
          <div className="aspect-w-16 aspect-h-10">
            <img
              src={DefaultImage}
              alt="campaign"
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
          <div className="justify-between flex flex-col p-2 text-start">
            <div className="justify-between flex flex-row items-center">
              <div className="text-xl font-semibold">{title}</div>
              <div className="flex flex-row text-md items-center justify-center">
                <RiShakeHandsFill />
                <div className="ml-2 font-semibold">{totalParticipant}</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-grays">{author}</div>
            <div className="flex flex-row items-center">
              <TbClockHour4 className=" mt-1" />
              {time > 1 ? (
                <div className="text-sm mx-1 font-semibold ">
                  {time} days left
                </div>
              ) : (
                <div className="text-sm mx-1 font-semibold ">
                  {'Less than 24 hours left'}
                </div>
              )}
              <BsDot className="mt-1" />
              <div className="text-sm mx-1 font-semibold ">
                {Math.round(fundPercentage)}% funded
              </div>
            </div>
            <p className="text-sm mt-2 font-normal justify-between">
              {descriptions.length > 100
                ? descriptions.substring(0, 100) + '...'
                : descriptions}
            </p>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default CampaignCard;
