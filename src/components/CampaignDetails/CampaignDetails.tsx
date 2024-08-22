import { useContext, useState } from 'react';
import { CampaignInterface } from '../../utils/interfaces';
import { ClientContext } from '../../context/Context';
import DefaultImage from '../../assets/morning_forest.jpg';

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
  const client = useContext(ClientContext);
  const changeDatetime = () => {
    const date = new Date();
    const currentDate = Math.floor(date.getTime() / 1000);
    const formattedDueDate = Math.floor(new Date(dueDate).getTime() / 1000);
    const result = Math.floor((formattedDueDate - currentDate) / 86400);
    return result;
  };
  const [time, setTime] = useState(changeDatetime());

  return (
    <button
      className="flex fixed bg-black bg-opacity-50 w-screen h-screen backdrop-blur-sm items-center justify-center"
      onClick={() => client?.setActivePage('')}
    >
      <div
        className="min-w-[25rem] max-w-[50rem] min-h-[20vh] flex flex-row bg-white shadow-lg rounded-md"
        onClick={handleCardClick} // Stop propagation here
      >
        <img
          src={DefaultImage}
          alt="campaign"
          className="w-[40%] h-auto bg-cover rounded-l-md"
        />
        <div className="p-5 text-start items-center">
          <div className="text-3xl font-bold mb-3">{title}</div>
          <div className="text-xl font-semibold text-green-800">
            US$ {currentFund.toLocaleString()}
          </div>
          <div className="text-sm font-semibold text-grays mb-3">
            pledged of US$ {targetFund.toLocaleString()} goal
          </div>
          <div className="text-xl font-semibold text-grays mb-3">
            {totalParticipant}
          </div>
          <div className="text-sm font-semibold text-grays">backers</div>
          <div className="text-xl font-semibold text-grays">{time}</div>
          <div className="text-sm font-semibold text-grays mb-3">
            days to go
          </div>
          <button className="bg-green-600 rounded-md px-10 py-1 items-center justify-center font-semibold text-white w-full">
            Back this project
          </button>
        </div>
      </div>
    </button>
  );
};

export default CampaignDetails;
