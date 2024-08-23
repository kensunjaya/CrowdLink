// import { useContext, useEffect, useRef, useState } from 'react';
// import { CampaignInterface } from '../../utils/interfaces';
// import { getAllCampaigns, updateCampaign } from '../../utils/methods';
// import { ClientContext } from '../../context/Context';
// import { FaAngleLeft } from 'react-icons/fa';
// import { FaAngleRight } from 'react-icons/fa';
// import CampaignCard from '../Card/CampaignCard';

// const Carousel = () => {
//   const client = useContext(ClientContext);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const handleGetCampaigns = async () => {
//       const data = (await getAllCampaigns()) as [number, CampaignInterface][];
//       data?.forEach(async (element) => {
//         await updateCampaign(
//           element[0],
//           Number(element[1].dueDate) - Date.now() * 1000000,
//         );
//       });
//       const allCampaigns = (await getAllCampaigns()) as [
//         number,
//         CampaignInterface,
//       ][];
//       client?.setAllCampaigns(allCampaigns);
//     };
//     handleGetCampaigns();
//   }, [client]);

//   const handleScrollLeft = () => {
//     if (client?.allCampaigns && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleScrollRight = () => {
//     if (client?.allCampaigns && currentIndex < client.allCampaigns.length - 3) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };
//   return (
//     <>
//       {client?.allCampaigns && client.allCampaigns.length > 0 && (
//         <div className="relative w-screen max-w-full mx-auto">
//           <div
//             className="carousel flex space-x-4 p-5 overflow-x-hidden z-0"
//             ref={carouselRef}
//           >
//             {client.allCampaigns
//               .slice(currentIndex, currentIndex + 3)
//               .map((value) => {
//                 return (
//                   <CampaignCard
//                     key={value[0]}
//                     campaignId={value[0]}
//                     author={value[1].author}
//                     title={value[1].title}
//                     description={value[1].description}
//                     targetFund={value[1].targetFund}
//                     currentFund={value[1].currentFund}
//                     totalParticipant={value[1].totalParticipant}
//                     dueDate={value[1].dueDate.toString()}
//                   />
//                 );
//               })}
//           </div>
//           {client?.allCampaigns && client.allCampaigns.length > 3 ? (
//             <>
//               <button
//                 className="absolute left-0 top-[50%] transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg z-10"
//                 onClick={handleScrollLeft}
//               >
//                 <FaAngleLeft />
//               </button>
//               <button
//                 className="absolute right-0 top-[50%] transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg z-10"
//                 onClick={handleScrollRight}
//               >
//                 <FaAngleRight />
//               </button>
//             </>
//           ) : null}
//         </div>
//       )}
//     </>
//   );
// };

// export default Carousel;
