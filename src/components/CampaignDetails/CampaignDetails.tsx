import { useContext } from 'react';
import { CampaignInterface } from '../../utils/interfaces';
import { ClientContext } from '../../context/Context';

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

  return (
    <button
      className="flex fixed bg-transparent w-full h-full items-center justify-center"
      onClick={() => client?.setActivePage('')}
    >
      <div
        className="min-w-[25rem] min-h-[20vh] p-10 flex flex-col bg-white shadow-lg opacity-90 z-10"
        onClick={handleCardClick} // Stop propagation here
      >
        <div className="mb-5 text-xl text-center">{author}</div>
      </div>
    </button>
  );
};

export default CampaignDetails;
