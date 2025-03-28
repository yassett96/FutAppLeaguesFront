import React from 'react';
import Image from 'next/image';

interface TeamBadgeProps {
  teamName: string;
  badgeUrl: string;
}

const TeamBadge: React.FC<TeamBadgeProps> = ({ teamName, badgeUrl }) => {
  return (
    <div className="select-box flex flex-col items-center justify-center mt-10 text-4xl">
      {/* <h2 className='text-center font-semibold'>{teamName}</h2> */}
      <Image width={100} height={100} src={badgeUrl} alt="Team Badge" className='h-40 w-40 mt-5'/>
    </div>
  );
};

export default TeamBadge;