import React from 'react';
import Image from 'next/image';

interface TournamentImageProps {
  tournamentName: string;
  badgeUrl: string;
}

const TournamentImage: React.FC<TournamentImageProps> = ({ tournamentName, badgeUrl }) => {
  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 text-2xl sm620:text-4xl">
      <h2 className='font-semibold w-[95%] text-center text-sm sm750:text-xl'>{tournamentName}</h2>
      <Image width={100} height={100} src={badgeUrl} alt="Team Badge" className='h-40 w-40 mt-5'/>
    </div>
  );
};

export default TournamentImage;