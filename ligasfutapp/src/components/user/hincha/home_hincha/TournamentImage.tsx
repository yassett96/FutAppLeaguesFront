import React from 'react';
import Image from 'next/image';

interface TournamentImageProps {
  teamName: string;
  badgeUrl: string;
}

const TournamentImage: React.FC<TournamentImageProps> = ({ teamName }) => {
  return (
    <div className="select-box flex flex-col items-center justify-center text-center text-xl sm750:text-2xl opacity-60">
      <h2>{teamName}</h2>
      {/* <Image src={badgeUrl} alt="Team Badge" className='h-40 w-40 mt-5' width={100} height={100} /> */}
    </div>
  );
};

export default TournamentImage;